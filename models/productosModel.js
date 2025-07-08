const pool = require('../config/db');

const Producto = {
  create: async (producto) => {
    const { 
      codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
      id_categoria, id_proveedor, fecha_vencimiento, stock_minimo 
    } = producto;
    
    const [result] = await pool.query(
      `INSERT INTO productos (
        codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo
      ]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
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
    
    const [result] = await pool.query(
      `UPDATE productos SET 
        codigo_barras = ?, nombre = ?, descripcion = ?, precio_venta = ?, precio_compra = ?,
        id_categoria = ?, id_proveedor = ?, fecha_vencimiento = ?, stock_minimo = ?
      WHERE id_producto = ?`,
      [
        codigo_barras, nombre, descripcion, precio_venta, precio_compra, 
        id_categoria, id_proveedor, fecha_vencimiento, stock_minimo, id
      ]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Producto;