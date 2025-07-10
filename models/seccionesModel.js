const pool = require('../config/db');

const Seccion = {
  create: async (seccion) => {
    const { nombre, id_sucursal, temperatura_controlada } = seccion;
    // 'INSERT INTO secciones (nombre, id_sucursal, temperatura_controlada) VALUES (?, ?, ?)',
    const [result] = await pool.query(
          'CALL Seccion_Create(?,?,?)',
         [nombre, id_sucursal, temperatura_controlada]
    );
     // Para obtener el ID de LASECCION INSERTADA 
     const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
     return rows[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL  Seccion_ReadAll()');
    return rows;
  },



  findById: async (id) => {
    const [rows] = await pool.query(' CALL Seccion_Read(?)', [id]);
    return rows[0];
  },

  findBySucursal: async (id_sucursal) => {
    const [rows] = await pool.query('SELECT * FROM secciones WHERE id_sucursal = ?', [id_sucursal]);
    return rows;
  },

  update: async (id, seccion) => {
    const { nombre, id_sucursal, temperatura_controlada } = seccion;
    //    'UPDATE secciones SET nombre = ?, id_sucursal = ?, temperatura_controlada = ? WHERE id_seccion = ?',
   
    const [result] = await pool.query('CALL Seccion_Update(?,?,?,?)',
     [id,nombre, id_sucursal, temperatura_controlada]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Seccion_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Seccion;