import express from 'express';
import HomeController from '../Controller/HomeController.js'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })
    router.get('/delete', HomeController.Delete)
    router.get('/detail/:id', HomeController.detail)
    return app.use('/', router)
}

export default initWebRoute;