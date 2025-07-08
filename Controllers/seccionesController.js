const Seccion = require('../models/seccionesModel');

exports.createSeccion = async (req, res) => {
  try {
    const id = await Seccion.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSecciones = async (req, res) => {
  try {
    const secciones = await Seccion.findAll();
    res.json(secciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeccionById = async (req, res) => {
  try {
    const seccion = await Seccion.findById(req.params.id);
    if (!seccion) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    res.json(seccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeccionesBySucursal = async (req, res) => {
  try {
    const secciones = await Seccion.findBySucursal(req.params.sucursalId);
    res.json(secciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSeccion = async (req, res) => {
  try {
    const updated = await Seccion.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    res.json({ message: 'Sección actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSeccion = async (req, res) => {
  try {
    const deleted = await Seccion.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    res.json({ message: 'Sección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};