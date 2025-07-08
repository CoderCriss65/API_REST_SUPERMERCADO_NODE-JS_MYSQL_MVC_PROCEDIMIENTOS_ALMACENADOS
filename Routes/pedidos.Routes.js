const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.post('/', pedidosController.createPedido);
router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidoById);
router.get('/estado/:estado', pedidosController.getPedidosByStatus);
router.put('/:id/estado', pedidosController.updatePedidoStatus);
router.put('/:id', pedidosController.updatePedido);
router.delete('/:id', pedidosController.deletePedido);

module.exports = router;