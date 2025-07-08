const Empleado = require('../models/empleadosModel');

exports.createEmpleado = async (req, res) => {
  try {
    const id = await Empleado.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmpleadoByDNI = async (req, res) => {
  try {
    const empleado = await Empleado.findByDNI(req.params.dni);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const updated = await Empleado.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const deleted = await Empleado.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};