import { NextFunction, Request, Response } from "express";
import Schedule from "../entities/Schedule";
import ScheduleModel from "../models/Schedule.model";

class ScheduleController {
    public static async insertSchedule(req: Request, res: Response, next: NextFunction): Promise<any> {
        const requestData: any = req.body;

        const schedule: Schedule = new Schedule();

        schedule.event_name = requestData.event_name;
        schedule.request_name = requestData.request_name;
        schedule.start_date = requestData.start_date;
        schedule.end_date = requestData.end_date;
        schedule.start_time = requestData.start_time;
        schedule.end_time = requestData.end_time;
        schedule.room = requestData.id_room;

        try {
            await ScheduleModel._insert(schedule)
                               .then(data => {
                                    return res.status(201).json(data);
                               }).catch(error => {
                                    return res.status(400).json(error);
                               });
        } catch (error) {
            next(error);
        }
    }
}

export default ScheduleController;