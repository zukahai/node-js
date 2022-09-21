import express from "express";
import toastr from "express-toastr";
import cookieParser from 'cookieparser';
import session from 'express-session';



const configViewEngine = (app) => {
    app.use(express.static('public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;