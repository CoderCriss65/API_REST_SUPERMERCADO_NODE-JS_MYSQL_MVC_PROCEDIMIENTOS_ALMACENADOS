const pool = require('../config/db');

const Venta = {
  create: async (venta) => {
    const { total, id_cliente, id_empleado, id_sucursal, tipo_pago } = venta;
    const [result] = await pool.query(
      'INSERT INTO ventas (total, id_cliente, id_empleado, id_sucursal, tipo_pago) VALUES (?, ?, ?, ?, ?)',
      [total, id_cliente, id_empleado, id_sucursal, tipo_pago]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM ventas');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM ventas WHERE id_venta = ?', [id]);
    return rows[0];
  },

  findByDate: async (fecha) => {
    const [rows] = await pool.query('SELECT * FROM ventas WHERE DATE(fecha_hora) = ?', [fecha]);
    return rows;
  },

  update: async (id, venta) => {
    const { total, id_cliente, tipo_pago } = venta;
    const [result] = await pool.query(
      'UPDATE ventas SET total = ?, id_cliente = ?, tipo_pago = ? WHERE id_venta = ?',
      [total, id_cliente, tipo_pago, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM ventas WHERE id_venta = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Venta;