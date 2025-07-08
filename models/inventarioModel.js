const pool = require('../config/db');

const Inventario = {
  create: async (inventario) => {
    const { id_producto, id_sucursal, cantidad, ubicacion } = inventario;
    const [result] = await pool.query(
      'INSERT INTO inventario (id_producto, id_sucursal, cantidad, ubicacion, ultima_reposicion) VALUES (?, ?, ?, ?, CURDATE())',
      [id_producto, id_sucursal, cantidad, ubicacion]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM inventario');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM inventario WHERE id_inventario = ?', [id]);
    return rows[0];
  },

  findByProductoSucursal: async (id_producto, id_sucursal) => {
    const [rows] = await pool.query(
      'SELECT * FROM inventario WHERE id_producto = ? AND id_sucursal = ?',
      [id_producto, id_sucursal]
    );
    return rows[0];
  },

  update: async (id, inventario) => {
    const { cantidad, ubicacion } = inventario;
    const [result] = await pool.query(
      'UPDATE inventario SET cantidad = ?, ubicacion = ?, ultima_reposicion = CURDATE() WHERE id_inventario = ?',
      [cantidad, ubicacion, id]
    );
    return result.affectedRows > 0;
  },

  updateStock: async (id, cantidad) => {
    const [result] = await pool.query(
      'UPDATE inventario SET cantidad = ?, ultima_reposicion = CURDATE() WHERE id_inventario = ?',
      [cantidad, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM inventario WHERE id_inventario = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Inventario;