import AppDataSource from "./dataSource";
import express from "express";
import routes from "./routes/index";
const cors = require('cors');

class App {
    public express;

    constructor() {
        this.express = express()

        try {
            this.dataBase();
            this.middleware();
            this.router();

        } catch(error) {
            console.log(error)
        }
    }

    public dataBase() {
        AppDataSource.initialize()
        .then(() => {
            console.log('Conexão com o banco de dados efetuada!');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    public middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    public router() {
        this.express.use(routes);
    }
}
 
export default new App().express;
