const pool = require('../config/db');

const DetalleVenta = {
  create: async (detalle) => {
    const { id_venta, id_producto, cantidad, precio_unitario, descuento } = detalle;
    const subtotal = (cantidad * precio_unitario) - descuento;
    
    const [result] = await pool.query(
      'INSERT INTO detalleventas (id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
      [id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal]
    );
    return result.insertId;
  },

  findByVentaId: async (id_venta) => {
    const [rows] = await pool.query('SELECT * FROM detalleventas WHERE id_venta = ?', [id_venta]);
    return rows;
  },

  update: async (id, detalle) => {
    const { cantidad, precio_unitario, descuento } = detalle;
    const subtotal = (cantidad * precio_unitario) - descuento;
    
    const [result] = await pool.query(
      'UPDATE detalleventas SET cantidad = ?, precio_unitario = ?, descuento = ?, subtotal = ? WHERE id_detalle = ?',
      [cantidad, precio_unitario, descuento, subtotal, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM detalleventas WHERE id_detalle = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = DetalleVenta;