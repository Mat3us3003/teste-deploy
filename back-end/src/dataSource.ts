import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "./entities/User";
import Room from "./entities/Room";
import Departament from "./entities/Departament";
import Schedule from "./entities/Schedule";
import Equipament from "./entities/Equipament";
import Authorizer from "./entities/Authorizer";
import Request from "./entities/Request";

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.HOST_DB, 
    port: 3306, 
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    synchronize: true, 
    logging: true,
    entities: [
        User,
        Room,
        Departament,
        Schedule,
        Equipament,
        Request,
        Authorizer
    ],
    subscribers: [],
    migrations: []
});

export default AppDataSource;