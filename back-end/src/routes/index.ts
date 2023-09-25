import { Router } from "express";
import user from "./user.routes";
import request from "./request.routes";
import room from "./room.routes";
import schedule from "./schedule.routes";
import equipament from "./equipament.routes";
import authorizer from "./authorizer.routes";
import authMiddleware from "../middlewares/authentication";

const router = Router();

router.use('/user', user);
router.use('/request', authMiddleware, request);
router.use('/room', authMiddleware, room);
router.use('/schedule', authMiddleware, schedule);
router.use('equipament', authMiddleware, equipament);
router.use('authorizer', authMiddleware, authorizer);

export default router;