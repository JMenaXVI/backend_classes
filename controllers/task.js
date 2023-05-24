const express = require('express');
const Task = require('../models/Task');

const listarTasks = async(req, res = express.response) => {
    const tasks = await Task.find().populate('user','name');

    try {
        res.status(200).json({
            ok: true,
            tasks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal error',
        })
    }
}

const crearTask = async(req, res = express.response) => {
    const task = new Task(req.body);

    try {
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok: true,
            task: saved,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal error',
        })
    }
}

const actualizarTask = async(req, res = express.response) => {
    console.log("task Actualizados!");
}

const eliminarTask = async(req, res = express.response) => {
    console.log("Task eliminado!");    
}

module.exports = {listarTasks, crearTask, actualizarTask, eliminarTask}