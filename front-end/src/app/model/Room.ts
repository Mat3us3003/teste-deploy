import { Authorizer } from "./Authorizer";
import { Schedule } from "./schedule";

export interface Room{
    id_room: number,
    name: string,
    capacity: number,
    type: string,
    especificity: string,
    location: string,
    equipament_description: string,
    schedule: Schedule,
    authorizer: Authorizer,
    request: Request
}