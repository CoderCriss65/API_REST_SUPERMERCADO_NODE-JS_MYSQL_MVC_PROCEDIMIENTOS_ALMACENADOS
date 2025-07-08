const pool = require('../config/db');

const Proveedor = {
  create: async (proveedor) => {
    const { ruc, nombre, contacto, telefono, categoria, dias_entrega } = proveedor;
    const [result] = await pool.query(
      'INSERT INTO proveedores (ruc, nombre, contacto, telefono, categoria, dias_entrega) VALUES (?, ?, ?, ?, ?, ?)',
      [ruc, nombre, contacto, telefono, categoria, dias_entrega]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM proveedores');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
    return rows[0];
  },

  update: async (id, proveedor) => {
    const { ruc, nombre, contacto, telefono, categoria, dias_entrega } = proveedor;
    const [result] = await pool.query(
      'UPDATE proveedores SET ruc = ?, nombre = ?, contacto = ?, telefono = ?, categoria = ?, dias_entrega = ? WHERE id_proveedor = ?',
      [ruc, nombre, contacto, telefono, categoria, dias_entrega, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Proveedor;