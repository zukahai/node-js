import express from 'express';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', (req, res) => {
        res.render('index.ejs')
    })
    router.get('/admin', (req, res) => {
        res.render('admin/index.ejs')
    })
    return app.use('/', router)
}

export default initWebRoute;