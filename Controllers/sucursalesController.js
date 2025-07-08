const Sucursal = require('../models/sucursalesModel');

exports.createSucursal = async (req, res) => {
  try {
    const id = await Sucursal.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSucursalById = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);
    if (!sucursal) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSucursal = async (req, res) => {
  try {
    const updated = await Sucursal.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json({ message: 'Sucursal actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSucursal = async (req, res) => {
  try {
    const deleted = await Sucursal.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json({ message: 'Sucursal eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};