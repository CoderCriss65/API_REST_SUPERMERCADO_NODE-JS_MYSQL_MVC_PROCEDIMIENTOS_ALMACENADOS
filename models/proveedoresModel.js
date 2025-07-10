const pool = require('../config/db');

const Proveedor = {
  create: async (proveedor) => {
    const { ruc, nombre, contacto, telefono, categoria, dias_entrega } = proveedor;
    //  'INSERT INTO proveedores (ruc, nombre, contacto, telefono, categoria, dias_entrega) VALUES (?, ?, ?, ?, ?, ?)',
    const [result] = await pool.query(
    'CALL Proveedor_Create(?,?,?,?,?,?)',
    [ruc, nombre, contacto, telefono, categoria, dias_entrega]
    );
    // Para obtener el ID del nuevo proveedor insertado
    const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
    return rows[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL Proveedor_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Proveedor_Read(?)', [id]);
    return rows[0];
  },

  update: async (id, proveedor) => {
    const { ruc, nombre, contacto, telefono, categoria, dias_entrega } = proveedor;
    /// 'UPDATE proveedores SET ruc = ?, nombre = ?, contacto = ?, telefono = ?, categoria = ?, dias_entrega = ? WHERE id_proveedor = ?',
    const [result] = await pool.query(
      'CALL Proveedor_Update(?,?,?,?,?,?,?)',
      [id,ruc, nombre, contacto, telefono, categoria, dias_entrega]
    );
    return result.affectedRows > 0;
  
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Proveedor_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Proveedor;