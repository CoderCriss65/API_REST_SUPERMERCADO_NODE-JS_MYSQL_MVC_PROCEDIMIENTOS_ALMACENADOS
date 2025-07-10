const pool = require('../config/db');

const Empleado = {
  create: async (empleado) => {
    const { 
      dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno 
    } = empleado;
    
    // Llamada al procedimiento almacenado
    const [result] = await pool.query(
      `CALL Empleado_Create(?, ?, ?, ?, ?, ?, ?, ?)`,
      [dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno]
    );
    
    // Para obtener el ID insertado necesitamos una segunda consulta
    const [idResult] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
    return idResult[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL Empleado_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Empleado_Read(?)', [id]);
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
        /*   `UPDATE empleados SET 
        dni = ?, nombre = ?, apellido = ?, cargo = ?, salario = ?,
        id_seccion = ?, id_sucursal = ?, turno = ?
      WHERE id_empleado = ?`, */
    const [result] = await pool.query(
      'CALL Empleado_Update(?,?,?,?,?,?,?,?,?)',
      [id,dni, nombre, apellido, cargo, salario, id_seccion, id_sucursal, turno]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Empleado_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Empleado;