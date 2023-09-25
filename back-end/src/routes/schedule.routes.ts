import { Router } from "express";
import ScheduleController from "../controllers/Schedule.controller";
import hasPermission from "../middlewares/permission";

const routes = Router();

routes.post('/', (req, res, next) => hasPermission(req, res, next, ['Admin', 'Authorizer']), ScheduleController.insertSchedule);
routes.put('/', (req, res, next) => hasPermission(req, res, next, ['Admin', 'Authorizer']), ScheduleController.insertSchedule)

export default routes;