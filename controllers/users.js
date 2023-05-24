const express = require('express');
const Usuario = require("../models/Usuario");

const listarUsuarios = async(req, res = express.response) => {
    const usuarios = await Usuario.find().populate('taras','title');

    try {
        res.status(200).json({
            ok: true,
            usuarios,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal error',
        })
    }
}