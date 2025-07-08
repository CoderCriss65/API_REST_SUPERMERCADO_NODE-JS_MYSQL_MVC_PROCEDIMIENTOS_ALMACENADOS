const DetallePedido = require('../models/detallepedidosModel');

exports.createDetallePedido = async (req, res) => {
  try {
    const id = await DetallePedido.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetallesByPedidoId = async (req, res) => {
  try {
    const detalles = await DetallePedido.findByPedidoId(req.params.pedidoId);
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetallePedido = async (req, res) => {
  try {
    const updated = await DetallePedido.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
    }
    res.json({ message: 'Detalle de pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDetallePedido = async (req, res) => {
  try {
    const deleted = await DetallePedido.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
    }
    res.json({ message: 'Detalle de pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};