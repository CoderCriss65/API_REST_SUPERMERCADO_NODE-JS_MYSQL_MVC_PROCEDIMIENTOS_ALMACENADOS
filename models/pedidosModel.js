const pool = require('../config/db');

const Pedido = {
  create: async (pedido) => {
    const { fecha_entrega_esperada, id_proveedor, id_sucursal, total } = pedido;
    const [result] = await pool.query(
      'INSERT INTO pedidos (fecha_entrega_esperada, id_proveedor, id_sucursal, estado, total) VALUES (?, ?, ?, "Pendiente", ?)',
      [fecha_entrega_esperada, id_proveedor, id_sucursal, total]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
    return rows[0];
  },

  findByStatus: async (estado) => {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE estado = ?', [estado]);
    return rows;
  },

  updateStatus: async (id, estado) => {
    const [result] = await pool.query(
      'UPDATE pedidos SET estado = ? WHERE id_pedido = ?',
      [estado, id]
    );
    return result.affectedRows > 0;
  },

  update: async (id, pedido) => {
    const { estado, total } = pedido;
    const [result] = await pool.query(
      'UPDATE pedidos SET estado = ?, total = ? WHERE id_pedido = ?',
      [estado, total, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Pedido;