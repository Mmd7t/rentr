const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadSingle = multer({
    storage: storage,
    // limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|svg/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

        return cb(null, true)
        // if (mimeType && extname) {
        // } else {
        //     cb('Give proper files formate to upload')
        // }
    }
}).single('image')

const uploadMulti = multer({
    storage: storage,
    // limits: { fileSize: '1000000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        return cb(null, true)
        // if (mimeType && extname) {
        // }
        // cb('Give proper files formate to upload')
    }
}).array('images', 3);

module.exports = { uploadSingle, uploadMulti };