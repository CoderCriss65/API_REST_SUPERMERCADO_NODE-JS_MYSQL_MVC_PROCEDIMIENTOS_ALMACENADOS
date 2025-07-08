const pool = require('../config/db');

const Categoria = {
  create: async (categoria) => {
    const { nombre, perecedero, requiere_refrigeracion } = categoria;
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre, perecedero, requiere_refrigeracion) VALUES (?, ?, ?)',
      [nombre, perecedero, requiere_refrigeracion]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    return rows[0];
  },

  update: async (id, categoria) => {
    const { nombre, perecedero, requiere_refrigeracion } = categoria;
    const [result] = await pool.query(
      'UPDATE categorias SET nombre = ?, perecedero = ?, requiere_refrigeracion = ? WHERE id_categoria = ?',
      [nombre, perecedero, requiere_refrigeracion, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Categoria;