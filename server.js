require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar todas las rutas
const categoriasRoutes = require('./Routes/categorias.Routes');
const clientesRoutes = require('./Routes/clientes.Routes');
const proveedoresRoutes = require('./Routes/proveedores.Routes');
const sucursalesRoutes = require('./Routes/sucursales.Routes');
const seccionesRoutes = require('./Routes/secciones.Routes');
const productosRoutes = require('./Routes/productos.Routes');
const empleadosRoutes = require('./Routes/empleados.Routes');
const usuariosRoutes = require('./Routes/usuarios.Routes');
const promocionesRoutes = require('./Routes/promociones.Routes');
const pedidosRoutes = require('./Routes/pedidos.Routes');
const detallepedidosRoutes = require('./Routes/detallepedidos.Routes');
const ventasRoutes = require('./Routes/ventas.Routes');
const detalleventasRoutes = require('./Routes/detalleventas.Routes');
const inventarioRoutes = require('./Routes/inventario.Routes');

// Usar las rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/sucursales', sucursalesRoutes);
app.use('/api/secciones', seccionesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/promociones', promocionesRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/detallepedidos', detallepedidosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/detalleventas', detalleventasRoutes);
app.use('/api/inventario', inventarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Supermarket API corriendo...!');
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});