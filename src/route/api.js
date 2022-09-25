import { Router } from 'express';
import RouteGroup from 'express-route-grouping';
import APIController from "../controller/APIController";

const root = new RouteGroup('/', Router());


const APIRouter = (app) => {

    root.group('/api', api => {
        api.get('/', APIController.allUser);
        api.get('/:id', APIController.findUserAPI);
    });

    return app.use('/', root.export());
}

export default APIRouter;