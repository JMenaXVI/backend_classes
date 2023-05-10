const express = require('express');
require('dotenv').config()
const { dbConnection } = require('../database/config')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.headers = {
            cors: {
                origin: 'http://127.0.0.1:5173',
                methods: ['GET','POST']
            }
        }

        // Crear express app.
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')(this.server, this.headers);

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        // Sockets
        this.sockets();
    }

    // Base de datos
    async connectToDB() {
        await dbConnection();
    }

    addMiddlewares() {
        // CORS
        this.app.use(cors(this.headers));

        // Lectura y parseo del body
        this.app.use(express.json());

        // public folder
        this.app.use(express.static('public'));
    }

    setRoutes() {
        // Rutas
        this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on(
            'connection',
            socket => socketController(socket, this.io)
        )
    }

    listen() {
        // Escuchar en puerto 4000
        this.server.listen(this.port , () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;