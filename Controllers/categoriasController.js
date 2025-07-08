const Categoria = require('../models/categoriasModel');

exports.createCategoria = async (req, res) => {
  try {
    const id = await Categoria.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const updated = await Categoria.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const deleted = await Categoria.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};