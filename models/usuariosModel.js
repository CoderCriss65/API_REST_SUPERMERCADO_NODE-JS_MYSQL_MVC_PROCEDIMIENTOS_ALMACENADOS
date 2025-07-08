const pool = require('../config/db');

const Usuario = {
  create: async (usuario) => {
    const { username, email, password_hash, id_empleado, rol } = usuario;
    const [result] = await pool.query(
      'INSERT INTO usuarios (username, email, password_hash, id_empleado, rol) VALUES (?, ?, ?, ?, ?)',
      [username, email, password_hash, id_empleado, rol]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
  },

  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    return rows[0];
  },

  update: async (id, usuario) => {
    const { email, password_hash, rol } = usuario;
    const [result] = await pool.query(
      'UPDATE usuarios SET email = ?, password_hash = ?, rol = ? WHERE id_usuario = ?',
      [email, password_hash, rol, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Usuario;