import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import HomeRouter from "./route/web.js";
import APIRouter from "./route/api.js";

require('dotenv').config();
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
HomeRouter(app);
APIRouter(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Start: http://localhost:${port}`)
})