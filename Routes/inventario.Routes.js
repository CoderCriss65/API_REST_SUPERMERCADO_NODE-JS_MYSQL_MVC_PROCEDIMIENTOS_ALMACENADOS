const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

router.post('/', inventarioController.createInventario);
router.get('/', inventarioController.getAllInventario);
router.get('/:id', inventarioController.getInventarioById);
router.get('/producto/:productoId/sucursal/:sucursalId', inventarioController.getInventarioByProductoSucursal);
router.put('/:id', inventarioController.updateInventario);
router.put('/:id/stock', inventarioController.updateStock);
router.delete('/:id', inventarioController.deleteInventario);

module.exports = router;