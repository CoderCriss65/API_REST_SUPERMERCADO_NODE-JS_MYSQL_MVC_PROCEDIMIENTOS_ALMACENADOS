const pool = require('../config/db');

const Cliente = {
    create: async (cliente) => {
        const { dni, nombre, telefono, email, puntos_fidelizacion } = cliente;

        // Llamar al procedimiento almacenado
        const [result] = await pool.query(
            'CALL Cliente_Create(?, ?, ?, ?, ?)',
            [dni, nombre, telefono, email, puntos_fidelizacion]
        );

        // Para obtener el ID del nuevo cliente insertado
        const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
        return rows[0].insertId;
    },




    findAll: async () => {
        const [rows] = await pool.query('CALL Cliente_ReadAll()');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await pool.query('CALL Cliente_Read(?)', [id]);
        return rows[0];
    },

    findByDNI: async (dni) => {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE dni = ?', [dni]);
        return rows[0];
    },

    update: async (id, cliente) => {
        const { dni, nombre, telefono, email, puntos_fidelizacion } = cliente;
        const [result] = await pool.query(
            'CALL Cliente_Update(?,?,?,?,?,?)',
            [id,dni, nombre, telefono, email, puntos_fidelizacion]
        );
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const [result] = await pool.query('CALL Cliente_Delete(?)', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Cliente;