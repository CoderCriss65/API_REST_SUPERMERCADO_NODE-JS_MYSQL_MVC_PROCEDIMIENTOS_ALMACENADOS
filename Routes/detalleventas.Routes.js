const express = require('express');
const router = express.Router();
const detalleventasController = require('../controllers/detalleventasController');

router.post('/', detalleventasController.createDetalleVenta);
router.get('/venta/:ventaId', detalleventasController.getDetallesByVentaId);
router.put('/:id', detalleventasController.updateDetalleVenta);
router.delete('/:id', detalleventasController.deleteDetalleVenta);

module.exports = router;