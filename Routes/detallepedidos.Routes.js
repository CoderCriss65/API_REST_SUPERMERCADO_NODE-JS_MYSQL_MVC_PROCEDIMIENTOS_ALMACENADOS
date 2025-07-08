const express = require('express');
const router = express.Router();
const detallepedidosController = require('../controllers/detallepedidosController');

router.post('/', detallepedidosController.createDetallePedido);
router.get('/pedido/:pedidoId', detallepedidosController.getDetallesByPedidoId);
router.put('/:id', detallepedidosController.updateDetallePedido);
router.delete('/:id', detallepedidosController.deleteDetallePedido);

module.exports = router;