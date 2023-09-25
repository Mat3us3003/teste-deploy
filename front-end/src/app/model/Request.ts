import { Room } from "./Room";
import { User } from "./user";

export interface Request{
    id_request: number,
    event_name: string,
    description: string,
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string,
    equipaments: string,
    status: string,
    User: User,
    room: Room,
    room_name: string,
    user_name: string
}
