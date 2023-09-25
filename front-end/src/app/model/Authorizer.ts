import { Departament } from "./Departament";
import { Room } from "./Room";
import { User } from "./user";

export interface Authorizer{
    id_authorizer: number,
    user: User,
    room: Room,
    departament: Departament
}