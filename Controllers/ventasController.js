const Venta = require('../models/ventasModel');

exports.createVenta = async (req, res) => {
  try {
    const id = await Venta.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVentasByDate = async (req, res) => {
  try {
    const ventas = await Venta.findByDate(req.params.fecha);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const updated = await Venta.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json({ message: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const deleted = await Venta.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};