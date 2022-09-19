import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from "./route/web.js";

require('dotenv').config();

const app = express()

configViewEngine(app);
initWebRoute(app);


const port = process.env.PORT;





app.listen(port, () => {
    console.log(`Start: http://localhost:${port}`)
})