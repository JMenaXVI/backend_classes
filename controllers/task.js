const express = require('express');
const Task = require('../models/Task');

const listarTasks = async(req, res = express.response) => {
    const tasks = await Task.find().populate('user','name');

    try {
        res.status(200).json({
            ok: true,
            msg: "List of tasks: ",
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
            msg: "Task sucessfully created",
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

const buscarTask = async(req, res = express.response) => {
    try {
        const task = await Task.findById(req.params['id']);
        res.status(200).json({
            ok: true,
            msg: 'Task found!',
            task
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Task have not been found.'
        })
    }
}

const actualizarTask = async(req, res = express.response) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params['id'], req.body);

        res.status(200).json({
            ok: true,
            msg: "Task sucessfully updated.",
            task
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Task failed to update.'
        })
    }
}

const eliminarTask = async(req, res = express.response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params['id']);

        res.status(200).json({
            ok: true,
            msg: "Task sucessfully deleted.",
            task
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Task failed to delete.'
        })
    } 
}

module.exports = {listarTasks, crearTask, buscarTask, actualizarTask, eliminarTask}