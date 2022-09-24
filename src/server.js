import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import homeRouter from "./route/web.js";

require('dotenv').config();
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
homeRouter(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Start: http://localhost:${port}`)
})