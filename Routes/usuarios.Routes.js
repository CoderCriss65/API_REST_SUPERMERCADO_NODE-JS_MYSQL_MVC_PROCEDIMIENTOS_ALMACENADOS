const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/', usuariosController.createUsuario);
router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.get('/username/:username', usuariosController.getUsuarioByUsername);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;