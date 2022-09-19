import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import path from 'path';

const app = express()
configViewEngine(app);

const port = 8080

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    res.render('admin/index.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})