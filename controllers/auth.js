const express = require('express');

const crearUsuario = (req, res = express.request) => {
    const { name, email, password } = req.body
    res.status(200).json({
        ok: true,
        name: name, email: email, password: password
    })
}

const loginUsuario = (req, res = express.request) => {
    const { email, password } = req.body
    res.json({
        ok: true,
        email: email, password: password
    })
}

const revalidarToken = (req, res = express.request) => {
    const { userToken } = req.body
    res.json({
        ok: true,
        userToken: userToken
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}