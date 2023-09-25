import { Router } from "express";
import RequestController from "../controllers/Request.controller";
import hasPermission from "../middlewares/permission";

const routes = Router();

routes.get('/', RequestController.selectAll);
routes.get('/user', RequestController.selectByUser);
routes.get('/authorizer', (req, res, next) => hasPermission(req, res, next, ['Admin', 'Authorizer']), RequestController.selectByAuthorizer);
routes.put('/', RequestController.update);

//  authMiddleware, (req, res, next) => hasPermission(req, res, next,"Admin")
export default routes;