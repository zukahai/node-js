import express from "express";
const session = require('express-session');



const configViewEngine = (app) => {
    app.use(express.static('public'));
    app.use(session({secret: 'default'}));

    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;