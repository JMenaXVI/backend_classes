const express = require('express');
require('dotenv').config()
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear Express App
const app = express();
app.use(express.static('public'))
app.use(express.json())

// CORS
app.use(cors());

// Base de datos
dbConnection();

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

// Escuchar en puerto 4000
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})