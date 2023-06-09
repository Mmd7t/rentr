const otpGenerator = require('otp-generator');

const generateOTP = () => {
    const OTP = otpGenerator.generate(5, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });
    return OTP;
};

module.exports = generateOTP;