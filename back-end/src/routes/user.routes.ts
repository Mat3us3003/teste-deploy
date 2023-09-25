import { Router } from "express";
import UserController from "../controllers/User.controller";
import authMiddleware from "../middlewares/authentication";
import hasPermission from "../middlewares/permission";

const routes = Router();

routes.get('/', authMiddleware, UserController.select);
routes.get('/data', authMiddleware, UserController.getDataById);
routes.get('/logged', UserController.logged);
routes.post('/login', UserController.login);
routes.post('/', UserController.insert);
routes.put('/',authMiddleware, UserController.update);
routes.put('/:id', UserController.updateById);
routes.delete('/:id', authMiddleware, (req, res, next) => hasPermission(req, res, next, ['Admin']), UserController.delete);

export default routes;