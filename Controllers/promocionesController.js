const Promocion = require('../models/promocionesModel');

exports.createPromocion = async (req, res) => {
  try {
    const id = await Promocion.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.findAll();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPromocionById = async (req, res) => {
  try {
    const promocion = await Promocion.findById(req.params.id);
    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPromocionesByProduct = async (req, res) => {
  try {
    const promociones = await Promocion.findByProduct(req.params.productoId);
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPromocionesActivas = async (req, res) => {
  try {
    const promociones = await Promocion.findActive();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePromocion = async (req, res) => {
  try {
    const updated = await Promocion.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json({ message: 'Promoción actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePromocion = async (req, res) => {
  try {
    const deleted = await Promocion.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json({ message: 'Promoción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};