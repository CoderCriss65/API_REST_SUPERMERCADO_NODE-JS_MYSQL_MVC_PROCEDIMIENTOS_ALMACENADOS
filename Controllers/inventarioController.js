const Inventario = require('../models/inventarioModel');

exports.createInventario = async (req, res) => {
  try {
    const id = await Inventario.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInventarioById = async (req, res) => {
  try {
    const item = await Inventario.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Registro de inventario no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInventarioByProductoSucursal = async (req, res) => {
  try {
    const item = await Inventario.findByProductoSucursal(
      req.params.productoId, 
      req.params.sucursalId
    );
    
    if (!item) {
      return res.status(404).json({ error: 'Registro de inventario no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInventario = async (req, res) => {
  try {
    const updated = await Inventario.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Registro de inventario no encontrado' });
    }
    res.json({ message: 'Inventario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const updated = await Inventario.updateStock(req.params.id, cantidad);
    if (!updated) {
      return res.status(404).json({ error: 'Registro de inventario no encontrado' });
    }
    res.json({ message: 'Stock actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInventario = async (req, res) => {
  try {
    const deleted = await Inventario.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Registro de inventario no encontrado' });
    }
    res.json({ message: 'Registro de inventario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};