import express from 'express';
import HomeController from '../Controller/HomeController.js'

let router = express.Router();

const homeRouter = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })
    router.get('/delete/:id', HomeController.Delete)
    router.get('/detail/:id', HomeController.detail)
    router.get('/create', HomeController.showCreatePage)
    router.post('/create', HomeController.create)
    return app.use('/', router)
}

export default homeRouter;