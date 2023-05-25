const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token'); 
const { listarTasks, crearTask, buscarTask, actualizarTask, eliminarTask } = require('../controllers/task');

router.use(validarJWT);

router.get('/', listarTasks);
router.post('/', crearTask);
router.get('/:id', buscarTask);
router.put('/:id', actualizarTask);
router.delete('/:id', eliminarTask);

module.exports = router;