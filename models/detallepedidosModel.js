const pool = require('../config/db');

const DetallePedido = {
  create: async (detalle) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = detalle;
    const subtotal = cantidad * precio_unitario;
    
    const [result] = await pool.query(
      'INSERT INTO detallepedidos (id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [id_pedido, id_producto, cantidad, precio_unitario, subtotal]
    );
    return result.insertId;
  },

  findByPedidoId: async (id_pedido) => {
    const [rows] = await pool.query('SELECT * FROM detallepedidos WHERE id_pedido = ?', [id_pedido]);
    return rows;
  },

  update: async (id, detalle) => {
    const { cantidad, precio_unitario } = detalle;
    const subtotal = cantidad * precio_unitario;
    
    const [result] = await pool.query(
      'UPDATE detallepedidos SET cantidad = ?, precio_unitario = ?, subtotal = ? WHERE id_detalle = ?',
      [cantidad, precio_unitario, subtotal, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM detallepedidos WHERE id_detalle = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = DetallePedido;