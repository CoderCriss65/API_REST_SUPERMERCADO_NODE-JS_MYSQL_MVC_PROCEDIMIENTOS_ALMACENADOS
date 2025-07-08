const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.post('/', categoriasController.createCategoria);
router.get('/', categoriasController.getAllCategorias);
router.get('/:id', categoriasController.getCategoriaById);
router.put('/:id', categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;