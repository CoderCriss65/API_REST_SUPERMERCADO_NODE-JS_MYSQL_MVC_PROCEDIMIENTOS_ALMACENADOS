const Proveedor = require('../models/proveedoresModel');

exports.createProveedor = async (req, res) => {
  try {
    const id = await Proveedor.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const updated = await Proveedor.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const deleted = await Proveedor.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};