const express = require('express');
const router = express.Router();

const empresasController = require('../controllers/empresas');

router.get('', empresasController.getTodasAsEmpresas);
router.get('/:idEmpresa', empresasController.getEmpresa);
router.post('', empresasController.cadastrarEmpresa);
router.patch('/:idEmpresa', empresasController.atualizarEmpresa);
router.delete('/:idEmpresa', empresasController.deletarEmpresa);

module.exports = router;