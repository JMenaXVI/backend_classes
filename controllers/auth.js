const express = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = express.response) => {
    const { name, email, password } = req.body
    try{
        let usuario = await Usuario.findOne({ email: email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese correo ya existe',
            })
        }

        usuario = new Usuario( req.body );
        await usuario.save();

        return res.status(200).json({
            ok: true,
            name: name, email: email, password: password
        })
    }catch(error){
        console.log( error )
        return res.status(500).json({
            ok: false,
            error,
        })
    }
}

const loginUsuario = (req, res = express.response) => {
    const { email, password } = req.body
    res.json({
        ok: true,
        email: email, password: password
    })
}

const revalidarToken = (req, res = express.response) => {
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