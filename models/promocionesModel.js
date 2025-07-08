const pool = require('../config/db');

const Promocion = {
  create: async (promocion) => {
    const { id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal } = promocion;
    const [result] = await pool.query(
      'INSERT INTO promociones (id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal) VALUES (?, ?, ?, ?, ?)',
      [id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM promociones');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM promociones WHERE id_promocion = ?', [id]);
    return rows[0];
  },

  findByProduct: async (id_producto) => {
    const [rows] = await pool.query('SELECT * FROM promociones WHERE id_producto = ?', [id_producto]);
    return rows;
  },

  findActive: async () => {
    const [rows] = await pool.query('SELECT * FROM promociones WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin');
    return rows;
  },

  update: async (id, promocion) => {
    const { fecha_inicio, fecha_fin, descuento, id_sucursal } = promocion;
    const [result] = await pool.query(
      'UPDATE promociones SET fecha_inicio = ?, fecha_fin = ?, descuento = ?, id_sucursal = ? WHERE id_promocion = ?',
      [fecha_inicio, fecha_fin, descuento, id_sucursal, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM promociones WHERE id_promocion = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Promocion;