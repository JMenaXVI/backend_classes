const express = require('express');
const { dbConnection } = require('./database/config')
require('dotenv').config()

//Base de datos
dbConnection();

// Crear Express App
const app = express();
app.use(express.static('public'))
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))

// Escuchar en puerto 4000
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})