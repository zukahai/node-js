import express from 'express';
import configViewEngine from './configs/viewEngine.js';
require('dotenv').config();

const app = express()
configViewEngine(app);

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    res.render('admin/index.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})