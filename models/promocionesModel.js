const pool = require('../config/db');

const Promocion = {
  create: async (promocion) => {
    const { id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal } = promocion;
    
    ///'INSERT INTO promociones (id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal) VALUES (?, ?, ?, ?, ?)',
    const [result] = await pool.query(
      'CALL Promocion_Create(?,?,?,?,?)',
      [id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal]
    );
      // Para obtener el ID de la nueva promocion
      const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
      return rows[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL Promocion_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Promocion_Read(?)', [id]);
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
    //  'UPDATE promociones SET fecha_inicio = ?, fecha_fin = ?, descuento = ?, id_sucursal = ? WHERE id_promocion = ?',
    const [result] = await pool.query(
      'CALL Promocion_Update(?,?,?,?,?)',
      [id,fecha_inicio, fecha_fin, descuento, id_sucursal]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Promocion_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Promocion;