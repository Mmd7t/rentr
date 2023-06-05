import sendMail from '../services/emailService.js';
import generateOTP from '../utils/otp.js';
import UserModel from '../models/userModel.js';
import { hash, compare } from '../utils/password.js';
import { generate } from '../utils/token.js';
import responses from '../helpers/responses.js';

/*---- REGISTER USER ----*/
export const register = async (req, res) => {
    try {
        const { name, email, password, phone, latitude, longitude } = req.body;
        const passwordHash = hash(password);
        const otpGenerated = generateOTP();
        const data = {
            name,
            email,
            password: passwordHash,
            phone,
            latitude,
            longitude,
            otp: otpGenerated,
            image: ''
        };
        const isEmailExist = await UserModel.findOne({
            where: { email: email }
        });
        const isPhoneExist = await UserModel.findOne({
            where: { phone: phone }
        });
        if (isEmailExist) {
            return responses.badRequest(res, "Email Already Exists");
        } else {
            if (isPhoneExist) {
                return responses.badRequest(res, "Phone Number used before");
            } else {
                const user = await UserModel.create(data);

                if (user) {
                    console.log("user", JSON.stringify(user, null, 2));
                    await sendMail({
                        to: email,
                        OTP: otpGenerated,
                    });
                    return responses.created(res, "Registered Successfully", user);
                } else {
                    return responses.badRequest(res, "Details are not correct");
                }
            }
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- LOGIN USER ----*/
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: { email: email }
        });
        if (user) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
                const token = generate(user.id);
                return responses.success(res, 'Logged in successfully', { access_token: token });
            } else {
                return responses.badRequest(res, 'Email and Password does not match');
            }
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- SEND OTP ----*/
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otpGenerated = generateOTP();
        const user = await UserModel.findOne({
            where: { email: email }
        });
        if (user) {
            await UserModel.update({ otp: otpGenerated }, { where: { email: email } })
            await sendMail({
                to: email,
                OTP: otpGenerated,
            });
            return responses.success(res, 'OTP sent to your email');
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- VERIFY EMAIL ----*/
export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({
            where: { email: email }
        });
        if (user) {
            console.log(otp);
            console.log(user.otp);
            if (user.otp == otp) {
                return responses.success(res, 'Email verified Successfully');
            } else {
                return responses.badRequest(res, 'Invalid OTP code');
            }
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- RESET PASSWORD ----*/
export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHash = hash(password);
        const user = await UserModel.findOne({
            where: { email: email }
        });
        if (user) {
            await UserModel.update({ password: passwordHash }, { where: { email: email } })
            return responses.success(res, 'Password Changed Successfully');
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- CHANGE PASSWORD ----*/
export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const passwordHash = hash(password);
        const user = await UserModel.findOne({
            where: { id: req.userId }
        });
        if (user) {
            await UserModel.update({ password: passwordHash }, { where: { id: req.userId } })
            return responses.success(res, 'Password Reseted Successfully');
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- CHANGE USER DATA ----*/
export const changeUserData = async (req, res) => {
    try {
        const { name, phone, latitude, longitude } = req.body;
        console.log(req.userId);
        const user = await UserModel.findOne({
            where: { id: req.userId }
        });
        if (user) {
            const isPhoneExist = await UserModel.findOne({
                where: { phone: phone }
            });
            if (isPhoneExist) {
                return responses.badRequest(res, 'Phone number already exist');
            } else {
                await UserModel.update({ name: name, phone: phone, latitude: latitude, longitude: longitude }, { where: { id: req.userId } })
                return responses.success(res, 'User Data Changed Successfully');
            }
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- CHANGE PROFILE IMAGE ----*/
export const changeProfileImage = async (req, res) => {
    try {

        const image = 'http://127.0.0.1:3000/images/' + req.file.filename;
        const user = await UserModel.findOne({ where: { id: req.userId } });
        if (user) {
            const data = await UserModel.update({ image: image }, { where: { id: req.userId } })
            if (data) {
                const updatedUser = await UserModel.findOne({
                    where: { id: req.userId }
                });
                return responses.success(res, 'Profile Photo Changed Successfully', updatedUser);
            } else {
                return responses.badRequest(res, 'Error while uploading image');
            }

        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- GET USER DATA ----*/
export const getUserData = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: { id: req.userId }
        });
        if (user) {
            return responses.success(res, 'User Data', user);
        } else {
            return responses.badRequest(res, 'Email does not exist');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}