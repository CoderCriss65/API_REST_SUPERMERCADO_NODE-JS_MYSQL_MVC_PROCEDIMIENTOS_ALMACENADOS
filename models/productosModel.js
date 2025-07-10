const pool = require('../config/db');

const Producto = {
  create: async (producto) => {
    const { 
      codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
      id_categoria, id_proveedor, fecha_vencimiento, stock_minimo 
    } = producto;
    
    /*       `INSERT INTO productos (
        codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, */
    const [result] = await pool.query(
      'CALL Producto_Create(?,?,?,?,?,?,?,?,?)',
      [
        codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo
      ]
    );
     // Para obtener el ID del nuevo PRODUCTO insertado
     const [rows] = await pool.query('SELECT LAST_INSERT_ID() as insertId');
     return rows[0].insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('CALL Producto_ReadAll()');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('CALL Producto_Read(?)', [id]);
    return rows[0];
  },

  findByBarcode: async (codigo_barras) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE codigo_barras = ?', [codigo_barras]);
    return rows[0];
  },

  update: async (id, producto) => {
    const { 
      codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
      id_categoria, id_proveedor, fecha_vencimiento, stock_minimo 
    } = producto;
     /*   `UPDATE productos SET 
        codigo_barras = ?, nombre = ?, descripcion = ?, precio_venta = ?, precio_compra = ?,
        id_categoria = ?, id_proveedor = ?, fecha_vencimiento = ?, stock_minimo = ?
      WHERE id_producto = ?`, */
    
    const [result] = await pool.query(
      'CALL Producto_Update(?,?,?,?,?,?,?,?,?,?)',
      [
       id, codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo
      ]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('CALL Producto_Delete(?)', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Producto;