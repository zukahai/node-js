import { Router } from 'express';
import RouteGroup from 'express-route-grouping';
import APIController from "../controller/APIController";

const root = new RouteGroup('/', Router());


const APIRouter = (app) => {

    root.group('/api', home => {
        home.get('/', APIController.allUser);
    });
    return app.use('/', root.export());
}

export default APIRouter;