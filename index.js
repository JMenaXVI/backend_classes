const express = require('express');
require('dotenv').config()

// Crear Express App
const app = express();

//Rutas
app.use( express.static('public'))
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})

// Escuchar en puerto 4000
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})