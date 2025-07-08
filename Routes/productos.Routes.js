const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.post('/', productosController.createProducto);
router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);
router.get('/barcode/:codigo', productosController.getProductoByBarcode);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;