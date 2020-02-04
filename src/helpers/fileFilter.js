const fileFilter = (req, file, cb) => {
    //Somente arquivo csv
    if (!file.originalname.match(/\.(csv|CSV)$/)) {
        req.fileValidationError = 'Somente arquivo csv!';
        return cb(new Error('Somente arquivo csv!'), false);
    }
    cb(null, true);
};

exports.fileFilter = fileFilter;