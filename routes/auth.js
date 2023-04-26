const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', ).isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario);
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña tiene menos de 6 caracteres.').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario );
router.get(
    '/renew', 
    [
        check('userToken', 'Este token es invalido.').isLength({ min: 10 }),
        validarCampos
    ],
    revalidarToken);

module.exports = router;