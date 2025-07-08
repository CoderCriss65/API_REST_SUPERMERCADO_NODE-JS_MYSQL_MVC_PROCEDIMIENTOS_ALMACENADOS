const pool = require('../config/db');

const Seccion = {
  create: async (seccion) => {
    const { nombre, id_sucursal, temperatura_controlada } = seccion;
    const [result] = await pool.query(
      'INSERT INTO secciones (nombre, id_sucursal, temperatura_controlada) VALUES (?, ?, ?)',
      [nombre, id_sucursal, temperatura_controlada]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM secciones');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM secciones WHERE id_seccion = ?', [id]);
    return rows[0];
  },

  findBySucursal: async (id_sucursal) => {
    const [rows] = await pool.query('SELECT * FROM secciones WHERE id_sucursal = ?', [id_sucursal]);
    return rows;
  },

  update: async (id, seccion) => {
    const { nombre, id_sucursal, temperatura_controlada } = seccion;
    const [result] = await pool.query(
      'UPDATE secciones SET nombre = ?, id_sucursal = ?, temperatura_controlada = ? WHERE id_seccion = ?',
      [nombre, id_sucursal, temperatura_controlada, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM secciones WHERE id_seccion = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Seccion;