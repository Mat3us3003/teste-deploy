import { Router } from "express";
import RoomController from "../controllers/Room.controller";
import hasPermission from "../middlewares/permission";

const routes = Router();

routes.get('/:type', RoomController.filterRoomsByType);
routes.get('/search/:search', RoomController.searchRooms);
routes.get('/info/:id', RoomController.selectRoom);
routes.post('/', (req, res, next) => hasPermission(req, res, next, ['Admin', 'Authorizer']), RoomController.insertRoom);

export default routes;