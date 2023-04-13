const express = require('express');

const crearUsuario = (req, res = express.request) => {
    const { name, email, password } = req.body
    res.status(200).json({
        ok: true,
        name: name, email: email, password: password
    })
}

const loginUsuario = (req, res = express.request) => {
    res.json({
        ok: true
    })
}

const revalidarToken = (req, res = express.request) => {
    res.json({
        ok: true
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}