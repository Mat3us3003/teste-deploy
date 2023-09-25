import { Authorizer } from "./Authorizer";

export interface Departament{
    id_departament: number,
    name: string,
    type: string,
    email: string,
    phone: string,
    authorizer: Authorizer
}