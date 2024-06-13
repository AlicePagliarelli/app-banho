const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registrarUsuario);
router.post('/login', userController.autenticarUsuario);
router.get('/', userController.listarUsuarios);

module.exports = router;