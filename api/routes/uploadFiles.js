const path = require('path')

var multer = require('multer')
var dest = 'client/productImages/'
var storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('imageUpload')

function checkFileType (file, cb) {
    // Allowed Ext
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        return cb('Error: Images only')
    }
}

module.exports = {
    upload
}
