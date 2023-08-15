import express, { Application } from 'express'
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string | undefined; 

    constructor() { 
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    routes() { 
        this.app.use(userRoutes) 
    }

    async dbConnection() { 
        try {

            await db.authenticate();
            console.log('deu bom')
            
        } catch (error) {
            throw new Error('DEU ERRO')
        }
    }

    middlewares() { 
        this.app.use(cors()) //configurando o cors da aplicação
        this.app.use(express.json()) //configurando que a aplicação aceitará JSON

        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidoreewe na porta: ' + this.port);
        });
    }
}

export default Server;