const Pedido = require('../models/pedidosModel');

exports.createPedido = async (req, res) => {
  try {
    const id = await Pedido.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPedidosByStatus = async (req, res) => {
  try {
    const pedidos = await Pedido.findByStatus(req.params.estado);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePedidoStatus = async (req, res) => {
  try {
    const updated = await Pedido.updateStatus(req.params.id, req.body.estado);
    if (!updated) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Estado del pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const updated = await Pedido.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const deleted = await Pedido.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};