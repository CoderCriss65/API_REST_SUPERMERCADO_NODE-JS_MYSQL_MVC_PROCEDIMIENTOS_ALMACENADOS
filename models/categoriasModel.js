const pool = require('../config/db');

const Categoria = {
  create: async (categoria) => {
    const { nombre, perecedero, requiere_refrigeracion } = categoria;
    
    // 'INSERT INTO categorias (nombre, perecedero, requiere_refrigeracion) VALUES (?, ?, ?)',
    const [result] = await pool.query(
      'CALL Categoria_Create(?,?,?)',
      [nombre, perecedero, requiere_refrigeracion]
    );
     // Para obtener el ID del NUEVOCATEGORIA insertado
     const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
     return rows[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL Categoria_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Categoria_Read(?)', [id]);
    return rows[0];
  },

  update: async (id, categoria) => {
    const { nombre, perecedero, requiere_refrigeracion } = categoria;
   //   'UPDATE categorias SET nombre = ?, perecedero = ?, requiere_refrigeracion = ? WHERE id_categoria = ?',
    const [result] = await pool.query(
      'CALL Categoria_Update(?,?,?,?)',
      [id,nombre, perecedero, requiere_refrigeracion]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Categoria_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Categoria;