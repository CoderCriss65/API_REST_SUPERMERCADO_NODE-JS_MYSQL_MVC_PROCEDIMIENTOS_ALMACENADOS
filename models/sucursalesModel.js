const pool = require('../config/db');

const Sucursal = {
  /* create: async (sucursal) => {
    const { nombre, direccion, telefono, horario_apertura, horario_cierre, area } = sucursal;
    const [result] = await pool.query(
      'INSERT INTO sucursales (nombre, direccion, telefono, horario_apertura, horario_cierre, area) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, direccion, telefono, horario_apertura, horario_cierre, area]
    );
    return result.insertId;
  }, */
  create: async (sucursal) => {
    const { nombre, direccion, telefono, horario_apertura, horario_cierre, area } = sucursal;
    const [result] = await pool.query(
      'CALL Sucursal_Create(?, ?, ?, ?, ?, ?)',
      [nombre, direccion, telefono, horario_apertura, horario_cierre, area]
    );
         // Para obtener el ID del nuevo cliente insertado
         const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
         return rows[0].insertId;
  },




  findAll: async () => {
    const [rows] = await pool.query('CALL Sucursal_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Sucursal_Read(?)', [id]);
    return rows[0];
  },

  update: async (id, sucursal) => {
    const { nombre, direccion, telefono, horario_apertura, horario_cierre, area } = sucursal;
    const [result] = await pool.query(
      'CALL Sucursal_Update(?,?,?,?,?,?,?)',
      [id,nombre, direccion, telefono, horario_apertura, horario_cierre, area]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Sucursal_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Sucursal;