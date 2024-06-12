const express = require('express');
const router = express.Router();
const veterinariaController = require('../controllers/veterinariaController');

router.post('/', veterinariaController.criarVeterinaria);
router.get('/', veterinariaController.listarVeterinarias);
router.get('/:id', veterinariaController.buscarVeterinariaPorId);

module.exports = router;
