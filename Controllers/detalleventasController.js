const DetalleVenta = require('../models/detalleventasModel');

exports.createDetalleVenta = async (req, res) => {
  try {
    const id = await DetalleVenta.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetallesByVentaId = async (req, res) => {
  try {
    const detalles = await DetalleVenta.findByVentaId(req.params.ventaId);
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetalleVenta = async (req, res) => {
  try {
    const updated = await DetalleVenta.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Detalle de venta no encontrado' });
    }
    res.json({ message: 'Detalle de venta actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDetalleVenta = async (req, res) => {
  try {
    const deleted = await DetalleVenta.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Detalle de venta no encontrado' });
    }
    res.json({ message: 'Detalle de venta eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};