import express from "express";
import HomeController from '../Controller/HomeController';
import multer from 'multer';
import path from 'path';
let appRoot = require('app-root-path');
let router = express.Router();

const fooMiddleware = (req, res, next) => {
    console.log('foo');
    next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/public/images/");
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const barMiddleware = (req, res, next) => {
    console.log('bar');
    next();
}

const homeRouter = (app) => {

    router.get('/', HomeController.getHomePage)
    router.get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })
    router.get('/delete/:id', HomeController.Delete)
    router.get('/detail/:id', HomeController.detail)
    router.get('/edit/:id', HomeController.showEditPage)
    router.post('/edit/:id', HomeController.edit)
    router.get('/create', HomeController.showCreatePage)
    router.post('/create', HomeController.create)
    router.get('/upload', HomeController.showUploadPage)
    router.post('/upload', upload.single('fileTest'), HomeController.upload)
    return app.use('/', router)
}

export default homeRouter;