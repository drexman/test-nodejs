const express = require('express');
const multer = require('multer');
const router = express.Router();
const fileFilter = require('../helpers/fileFilter');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'upload/');
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage,  fileFilter: fileFilter.fileFilter});

//Controlador
const controller = require('../controllers/fileuser.controller');

//Upload
router.post('/upload', upload.array('files',10), controller.uploadfiles);
//Remover usuario atraves do identificador
router.delete('/:id', controller.delete);

module.exports = router;