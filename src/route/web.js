import express from "express";
import UserController from '../controller/UserController';
import HomeController from '../controller/HomeController';
import multer from 'multer';
import path from 'path';
let appRoot = require('app-root-path');
let router = express.Router();
import { Router } from 'express';
import RouteGroup from 'express-route-grouping';

const root = new RouteGroup('/', Router());

const fooMiddleware = (req, res, next) => {
    console.log('foo');
    next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/public/images/uploads/");
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

    root.group('/', home => {
        home.get('/', HomeController.getHomePage)
        home.get('/test', (req, res) => {
            res.render('test/index.ejs');
        });
    });

    root.group('/admin', admin => {
        admin.get('/', (req, res) => {
            res.send("Home admin")
        });
        admin.group('/user', user => {
            user.get('/', UserController.getHomePage)
            user.get('/admin', (req, res) => {
                res.render('admin/index.ejs')
            })
            user.get('/delete/:id', UserController.Delete)
            user.get('/detail/:id', UserController.detail)
            user.get('/edit/:id', UserController.showEditPage)
            user.post('/edit/:id', UserController.edit)
            user.get('/create', UserController.showCreatePage)
            user.post('/create', UserController.create)
            user.get('/upload', UserController.showUploadPage)
            user.post('/upload', upload.single('fileTest'), UserController.upload)
        });
    });




    return app.use('/', root.export());
}

export default homeRouter;