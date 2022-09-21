import express from 'express';
import HomeController from '../Controller/HomeController.js'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })
    router.get('/delete', HomeController.Delete)
    return app.use('/admin', router)
}

export default initWebRoute;