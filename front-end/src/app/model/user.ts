import { Authorizer } from "./Authorizer";
import { Request } from "./Request";

export interface User {
    id_user: number,
    name: string,
    email: string,
    password: string,
    salt: string,
    cpf: string,
    type: string,
    phone: string,
    ocupation: string,
    organization: string,
    authorizer: Authorizer,
    request: Request
}
