import { Router } from 'express';
import RouteGroup from 'express-route-grouping';
import APIController from "../controller/APIController";

const root = new RouteGroup('/', Router());


const APIRouter = (app) => {

    root.group('/api', api => {
        api.group('/user', user => {
            user.get('/', APIController.allUser);
            user.get('/:id', APIController.findUserAPI);
            user.post('/create', APIController.createUserAPI);
            user.post('/edit/:id', APIController.editUserAPI)
            user.get('/delete/:id', APIController.deleteAPI);
        });
        api.group('/pthh', user => {
            user.post('/', APIController.pthhAPI);
        });
    });

    return app.use('/', root.export());
}

export default APIRouter;