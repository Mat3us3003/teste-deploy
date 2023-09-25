import { Room } from "./Room";

export interface Schedule{
    id_schedule: number,
    start_date: Date,
    end_date: Date,
    start_time: string,
    end_time: string,
    request_name: string,
    event_name: string,
    room: Room
}