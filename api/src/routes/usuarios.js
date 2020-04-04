const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

router.post('', usuariosController.cadastrarUsuario);
router.post('/login', usuariosController.realizarLogin);
router.delete('/:idUsuario', usuariosController.deletarUsuario);

module.exports = router;
