const pool = require('../config/db');

const Empleado = {
  create: async (empleado) => {
    const { 
      dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno 
    } = empleado;
    
    const [result] = await pool.query(
      `INSERT INTO empleados (
        dni, nombre, apellido, cargo, fecha_contratacion, salario, 
        id_seccion, id_sucursal, turno
      ) VALUES (?, ?, ?, ?, CURDATE(), ?, ?, ?, ?)`,
      [dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM empleados');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
    return rows[0];
  },

  findByDNI: async (dni) => {
    const [rows] = await pool.query('SELECT * FROM empleados WHERE dni = ?', [dni]);
    return rows[0];
  },

  update: async (id, empleado) => {
    const { 
      dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno 
    } = empleado;
    
    const [result] = await pool.query(
      `UPDATE empleados SET 
        dni = ?, nombre = ?, apellido = ?, cargo = ?, salario = ?,
        id_seccion = ?, id_sucursal = ?, turno = ?
      WHERE id_empleado = ?`,
      [dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Empleado;