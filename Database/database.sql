-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS supermarket;
USE supermarket;

-- Tabla: categorias
CREATE TABLE categorias (
    id_categoria INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    perecedero TINYINT(1) DEFAULT 0,
    requiere_refrigeracion TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id_categoria),
    UNIQUE KEY nombre (nombre)
);

-- Tabla: clientes
CREATE TABLE clientes (
    id_cliente INT(11) NOT NULL AUTO_INCREMENT,
    dni VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(50) DEFAULT NULL,
    puntos_fidelizacion INT(11) DEFAULT 0,
    fecha_registro DATE NOT NULL,
    PRIMARY KEY (id_cliente),
    UNIQUE KEY dni (dni)
);

-- Tabla: proveedores
CREATE TABLE proveedores (
    id_proveedor INT(11) NOT NULL AUTO_INCREMENT,
    ruc VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    categoria ENUM('Alimentos','Bebidas','Limpieza','Electrónicos') NOT NULL,
    dias_entrega VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (id_proveedor),
    UNIQUE KEY ruc (ruc)
);

-- Tabla: sucursales
CREATE TABLE sucursales (
    id_sucursal INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_sucursal)
);

-- Tabla: secciones
CREATE TABLE secciones (
    id_seccion INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    id_sucursal INT(11) NOT NULL,
    temperatura_controlada TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id_seccion),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);

-- Tabla: productos
CREATE TABLE productos (
    id_producto INT(11) NOT NULL AUTO_INCREMENT,
    codigo_barras VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10,2) NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    id_categoria INT(11) NOT NULL,
    id_proveedor INT(11) NOT NULL,
    fecha_vencimiento DATE DEFAULT NULL,
    stock_minimo INT(11) NOT NULL DEFAULT 5,
    PRIMARY KEY (id_producto),
    UNIQUE KEY codigo_barras (codigo_barras),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);

-- Tabla: empleados
CREATE TABLE empleados (
    id_empleado INT(11) NOT NULL AUTO_INCREMENT,
    dni VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    cargo ENUM('Cajero','Reponedor','Almacenero','Supervisor','Gerente') NOT NULL,
    fecha_contratacion DATE NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    id_seccion INT(11) NOT NULL,
    id_sucursal INT(11) NOT NULL,
    turno ENUM('Mañana','Tarde','Noche') NOT NULL,
    PRIMARY KEY (id_empleado),
    UNIQUE KEY dni (dni),
    FOREIGN KEY (id_seccion) REFERENCES secciones(id_seccion),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id_usuario INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    id_empleado INT(11) NOT NULL,
    rol ENUM('Admin','Cajero','Inventario','Gerente') NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id_usuario),
    UNIQUE KEY username (username),
    UNIQUE KEY email (email),
    UNIQUE KEY id_empleado (id_empleado),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla: promociones
CREATE TABLE promociones (
    id_promocion INT(11) NOT NULL AUTO_INCREMENT,
    id_producto INT(11) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    descuento DECIMAL(5,2) NOT NULL,
    id_sucursal INT(11) DEFAULT NULL,
    PRIMARY KEY (id_promocion),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);

-- Tabla: pedidos
CREATE TABLE pedidos (
    id_pedido INT(11) NOT NULL AUTO_INCREMENT,
    fecha_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    fecha_entrega_esperada DATE NOT NULL,
    id_proveedor INT(11) NOT NULL,
    id_sucursal INT(11) NOT NULL,
    estado ENUM('Pendiente','En tránsito','Recibido','Cancelado') DEFAULT 'Pendiente',
    total DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);

-- Tabla: detallepedidos
CREATE TABLE detallepedidos (
    id_detalle INT(11) NOT NULL AUTO_INCREMENT,
    id_pedido INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Tabla: ventas
CREATE TABLE ventas (
    id_venta INT(11) NOT NULL AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    total DECIMAL(10,2) NOT NULL,
    id_cliente INT(11) DEFAULT NULL,
    id_empleado INT(11) NOT NULL,
    id_sucursal INT(11) NOT NULL,
    tipo_pago ENUM('Efectivo','Tarjeta','Transferencia') NOT NULL,
    PRIMARY KEY (id_venta),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);

-- Tabla: detalleventas
CREATE TABLE detalleventas (
    id_detalle INT(11) NOT NULL AUTO_INCREMENT,
    id_venta INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0.00,
    subtotal DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Tabla: inventario
CREATE TABLE inventario (
    id_inventario INT(11) NOT NULL AUTO_INCREMENT,
    id_producto INT(11) NOT NULL,
    id_sucursal INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    ubicacion VARCHAR(50) DEFAULT NULL,
    ultima_reposicion DATE DEFAULT NULL,
    PRIMARY KEY (id_inventario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal)
);


--------------------
1. Categorías
sql
-- CATEGORIAS
DELIMITER $$
CREATE PROCEDURE Categoria_Create(
    IN p_nombre VARCHAR(50),
    IN p_perecedero TINYINT(1),
    IN p_requiere_refrigeracion TINYINT(1)
)
BEGIN
    INSERT INTO categorias(nombre, perecedero, requiere_refrigeracion)
    VALUES (p_nombre, p_perecedero, p_requiere_refrigeracion);
END$$

CREATE PROCEDURE Categoria_Read(IN p_id INT)
BEGIN
    SELECT * FROM categorias WHERE id_categoria = p_id;
END$$

CREATE PROCEDURE Categoria_ReadAll()
BEGIN
    SELECT * FROM categorias;
END$$

CREATE PROCEDURE Categoria_Update(
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_perecedero TINYINT(1),
    IN p_requiere_refrigeracion TINYINT(1)
)
BEGIN
    UPDATE categorias 
    SET nombre = p_nombre,
        perecedero = p_perecedero,
        requiere_refrigeracion = p_requiere_refrigeracion
    WHERE id_categoria = p_id;
END$$

CREATE PROCEDURE Categoria_Delete(IN p_id INT)
BEGIN
    DELETE FROM categorias WHERE id_categoria = p_id;
END$$
DELIMITER ;
2. Clientes
sql
-- CLIENTES
DELIMITER $$
CREATE PROCEDURE Cliente_Create(
    IN p_dni VARCHAR(20),
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(50),
    IN p_puntos INT
)
BEGIN
    INSERT INTO clientes(dni, nombre, telefono, email, puntos_fidelizacion, fecha_registro)
    VALUES (p_dni, p_nombre, p_telefono, p_email, p_puntos, CURDATE());
        
    SET p_id = LAST_INSERT_ID();

END$$

CREATE PROCEDURE Cliente_Read(IN p_id INT)
BEGIN
    SELECT * FROM clientes WHERE id_cliente = p_id;
END$$

CREATE PROCEDURE Cliente_ReadByDNI(IN p_dni VARCHAR(20))
BEGIN
    SELECT * FROM clientes WHERE dni = p_dni;
END$$

CREATE PROCEDURE Cliente_ReadAll()
BEGIN
    SELECT * FROM clientes;
END$$

CREATE PROCEDURE Cliente_Update(
    IN p_id INT,
    IN p_dni VARCHAR(20),
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(50),
    IN p_puntos INT
)
BEGIN
    UPDATE clientes 
    SET dni = p_dni,
        nombre = p_nombre,
        telefono = p_telefono,
        email = p_email,
        puntos_fidelizacion = p_puntos
    WHERE id_cliente = p_id;
END$$

CREATE PROCEDURE Cliente_Delete(IN p_id INT)
BEGIN
    DELETE FROM clientes WHERE id_cliente = p_id;
END$$
DELIMITER ;
3. DetallePedidos
sql
-- DETALLEPEDIDOS
DELIMITER $$
CREATE PROCEDURE DetallePedido_Create(
    IN p_id_pedido INT,
    IN p_id_producto INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2)
)
BEGIN
    INSERT INTO detallepedidos(id_pedido, id_producto, cantidad, precio_unitario, subtotal)
    VALUES (p_id_pedido, p_id_producto, p_cantidad, p_precio_unitario, p_cantidad * p_precio_unitario);
END$$

CREATE PROCEDURE DetallePedido_Read(IN p_id INT)
BEGIN
    SELECT * FROM detallepedidos WHERE id_detalle = p_id;
END$$

CREATE PROCEDURE DetallePedido_ReadByPedido(IN p_id_pedido INT)
BEGIN
    SELECT * FROM detallepedidos WHERE id_pedido = p_id_pedido;
END$$

CREATE PROCEDURE DetallePedido_Update(
    IN p_id INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2)
)
BEGIN
    UPDATE detallepedidos 
    SET cantidad = p_cantidad,
        precio_unitario = p_precio_unitario,
        subtotal = p_cantidad * p_precio_unitario
    WHERE id_detalle = p_id;
END$$

CREATE PROCEDURE DetallePedido_Delete(IN p_id INT)
BEGIN
    DELETE FROM detallepedidos WHERE id_detalle = p_id;
END$$
DELIMITER ;
4. DetalleVentas
sql
-- DETALLEVENTAS
DELIMITER $$
CREATE PROCEDURE DetalleVenta_Create(
    IN p_id_venta INT,
    IN p_id_producto INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2),
    IN p_descuento DECIMAL(10,2)
)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    SET v_subtotal = (p_cantidad * p_precio_unitario) - p_descuento;
    
    INSERT INTO detalleventas(id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal)
    VALUES (p_id_venta, p_id_producto, p_cantidad, p_precio_unitario, p_descuento, v_subtotal);
END$$

CREATE PROCEDURE DetalleVenta_Read(IN p_id INT)
BEGIN
    SELECT * FROM detalleventas WHERE id_detalle = p_id;
END$$

CREATE PROCEDURE DetalleVenta_ReadByVenta(IN p_id_venta INT)
BEGIN
    SELECT * FROM detalleventas WHERE id_venta = p_id_venta;
END$$

CREATE PROCEDURE DetalleVenta_Update(
    IN p_id INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2),
    IN p_descuento DECIMAL(10,2)
)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    SET v_subtotal = (p_cantidad * p_precio_unitario) - p_descuento;
    
    UPDATE detalleventas 
    SET cantidad = p_cantidad,
        precio_unitario = p_precio_unitario,
        descuento = p_descuento,
        subtotal = v_subtotal
    WHERE id_detalle = p_id;
END$$

CREATE PROCEDURE DetalleVenta_Delete(IN p_id INT)
BEGIN
    DELETE FROM detalleventas WHERE id_detalle = p_id;
END$$
DELIMITER ;
5. Empleados
sql
-- EMPLEADOS
DELIMITER $$
CREATE PROCEDURE Empleado_Create(
    IN p_dni VARCHAR(20),
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_cargo ENUM('Cajero','Reponedor','Almacenero','Supervisor','Gerente'),
    IN p_salario DECIMAL(10,2),
    IN p_id_seccion INT,
    IN p_id_sucursal INT,
    IN p_turno ENUM('Mañana','Tarde','Noche')
)
BEGIN
    INSERT INTO empleados(dni, nombre, apellido, cargo, fecha_contratacion, salario, id_seccion, id_sucursal, turno)
    VALUES (p_dni, p_nombre, p_apellido, p_cargo, CURDATE(), p_salario, p_id_seccion, p_id_sucursal, p_turno);
END$$

CREATE PROCEDURE Empleado_Read(IN p_id INT)
BEGIN
    SELECT * FROM empleados WHERE id_empleado = p_id;
END$$

CREATE PROCEDURE Empleado_ReadByDNI(IN p_dni VARCHAR(20))
BEGIN
    SELECT * FROM empleados WHERE dni = p_dni;
END$$

CREATE PROCEDURE Empleado_ReadAll()
BEGIN
    SELECT * FROM empleados;
END$$

CREATE PROCEDURE Empleado_Update(
    IN p_id INT,
    IN p_dni VARCHAR(20),
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_cargo ENUM('Cajero','Reponedor','Almacenero','Supervisor','Gerente'),
    IN p_salario DECIMAL(10,2),
    IN p_id_seccion INT,
    IN p_id_sucursal INT,
    IN p_turno ENUM('Mañana','Tarde','Noche')
)
BEGIN
    UPDATE empleados 
    SET dni = p_dni,
        nombre = p_nombre,
        apellido = p_apellido,
        cargo = p_cargo,
        salario = p_salario,
        id_seccion = p_id_seccion,
        id_sucursal = p_id_sucursal,
        turno = p_turno
    WHERE id_empleado = p_id;
END$$

CREATE PROCEDURE Empleado_Delete(IN p_id INT)
BEGIN
    DELETE FROM empleados WHERE id_empleado = p_id;
END$$
DELIMITER ;
6. Inventario
sql
-- INVENTARIO
DELIMITER $$
CREATE PROCEDURE Inventario_Create(
    IN p_id_producto INT,
    IN p_id_sucursal INT,
    IN p_cantidad INT,
    IN p_ubicacion VARCHAR(50)
)
BEGIN
    INSERT INTO inventario(id_producto, id_sucursal, cantidad, ubicacion, ultima_reposicion)
    VALUES (p_id_producto, p_id_sucursal, p_cantidad, p_ubicacion, CURDATE());
END$$

CREATE PROCEDURE Inventario_Read(IN p_id INT)
BEGIN
    SELECT * FROM inventario WHERE id_inventario = p_id;
END$$

CREATE PROCEDURE Inventario_ReadByProductoSucursal(
    IN p_id_producto INT,
    IN p_id_sucursal INT
)
BEGIN
    SELECT * FROM inventario 
    WHERE id_producto = p_id_producto 
    AND id_sucursal = p_id_sucursal;
END$$

CREATE PROCEDURE Inventario_ReadAll()
BEGIN
    SELECT * FROM inventario;
END$$

CREATE PROCEDURE Inventario_Update(
    IN p_id INT,
    IN p_cantidad INT,
    IN p_ubicacion VARCHAR(50)
)
BEGIN
    UPDATE inventario 
    SET cantidad = p_cantidad,
        ubicacion = p_ubicacion,
        ultima_reposicion = CURDATE()
    WHERE id_inventario = p_id;
END$$

CREATE PROCEDURE Inventario_Delete(IN p_id INT)
BEGIN
    DELETE FROM inventario WHERE id_inventario = p_id;
END$$
DELIMITER ;
7. Pedidos
sql
-- PEDIDOS
DELIMITER $$
CREATE PROCEDURE Pedido_Create(
    IN p_fecha_entrega_esperada DATE,
    IN p_id_proveedor INT,
    IN p_id_sucursal INT,
    IN p_total DECIMAL(10,2)
)
BEGIN
    INSERT INTO pedidos(fecha_entrega_esperada, id_proveedor, id_sucursal, estado, total)
    VALUES (p_fecha_entrega_esperada, p_id_proveedor, p_id_sucursal, 'Pendiente', p_total);
END$$

CREATE PROCEDURE Pedido_Read(IN p_id INT)
BEGIN
    SELECT * FROM pedidos WHERE id_pedido = p_id;
END$$

CREATE PROCEDURE Pedido_ReadByEstado(IN p_estado VARCHAR(20))
BEGIN
    SELECT * FROM pedidos WHERE estado = p_estado;
END$$

CREATE PROCEDURE Pedido_ReadAll()
BEGIN
    SELECT * FROM pedidos;
END$$

CREATE PROCEDURE Pedido_Update(
    IN p_id INT,
    IN p_estado ENUM('Pendiente','En tránsito','Recibido','Cancelado'),
    IN p_total DECIMAL(10,2)
)
BEGIN
    UPDATE pedidos 
    SET estado = p_estado,
        total = p_total
    WHERE id_pedido = p_id;
END$$

CREATE PROCEDURE Pedido_UpdateEstado(
    IN p_id INT,
    IN p_estado ENUM('Pendiente','En tránsito','Recibido','Cancelado')
)
BEGIN
    UPDATE pedidos 
    SET estado = p_estado
    WHERE id_pedido = p_id;
END$$

CREATE PROCEDURE Pedido_Delete(IN p_id INT)
BEGIN
    DELETE FROM pedidos WHERE id_pedido = p_id;
END$$
DELIMITER ;
8. Productos
sql
-- PRODUCTOS
DELIMITER $$
CREATE PROCEDURE Producto_Create(
    IN p_codigo_barras VARCHAR(50),
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_precio_venta DECIMAL(10,2),
    IN p_precio_compra DECIMAL(10,2),
    IN p_id_categoria INT,
    IN p_id_proveedor INT,
    IN p_fecha_vencimiento DATE,
    IN p_stock_minimo INT
)
BEGIN
    INSERT INTO productos(
        codigo_barras, nombre, descripcion, precio_venta, 
        precio_compra, id_categoria, id_proveedor, 
        fecha_vencimiento, stock_minimo
    ) VALUES (
        p_codigo_barras, p_nombre, p_descripcion, p_precio_venta,
        p_precio_compra, p_id_categoria, p_id_proveedor,
        p_fecha_vencimiento, p_stock_minimo
    );
END$$

CREATE PROCEDURE Producto_Read(IN p_id INT)
BEGIN
    SELECT * FROM productos WHERE id_producto = p_id;
END$$

CREATE PROCEDURE Producto_ReadByBarcode(IN p_codigo VARCHAR(50))
BEGIN
    SELECT * FROM productos WHERE codigo_barras = p_codigo;
END$$

CREATE PROCEDURE Producto_ReadAll()
BEGIN
    SELECT * FROM productos;
END$$

CREATE PROCEDURE Producto_Update(
    IN p_id INT,
    IN p_codigo_barras VARCHAR(50),
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_precio_venta DECIMAL(10,2),
    IN p_precio_compra DECIMAL(10,2),
    IN p_id_categoria INT,
    IN p_id_proveedor INT,
    IN p_fecha_vencimiento DATE,
    IN p_stock_minimo INT
)
BEGIN
    UPDATE productos 
    SET codigo_barras = p_codigo_barras,
        nombre = p_nombre,
        descripcion = p_descripcion,
        precio_venta = p_precio_venta,
        precio_compra = p_precio_compra,
        id_categoria = p_id_categoria,
        id_proveedor = p_id_proveedor,
        fecha_vencimiento = p_fecha_vencimiento,
        stock_minimo = p_stock_minimo
    WHERE id_producto = p_id;
END$$

CREATE PROCEDURE Producto_Delete(IN p_id INT)
BEGIN
    DELETE FROM productos WHERE id_producto = p_id;
END$$
DELIMITER ;
9. Promociones
sql
-- PROMOCIONES
DELIMITER $$
CREATE PROCEDURE Promocion_Create(
    IN p_id_producto INT,
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE,
    IN p_descuento DECIMAL(5,2),
    IN p_id_sucursal INT
)
BEGIN
    INSERT INTO promociones(id_producto, fecha_inicio, fecha_fin, descuento, id_sucursal)
    VALUES (p_id_producto, p_fecha_inicio, p_fecha_fin, p_descuento, p_id_sucursal);
END$$

CREATE PROCEDURE Promocion_Read(IN p_id INT)
BEGIN
    SELECT * FROM promociones WHERE id_promocion = p_id;
END$$

CREATE PROCEDURE Promocion_ReadByProducto(IN p_id_producto INT)
BEGIN
    SELECT * FROM promociones WHERE id_producto = p_id_producto;
END$$

CREATE PROCEDURE Promocion_ReadActivas()
BEGIN
    SELECT * FROM promociones 
    WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin;
END$$

CREATE PROCEDURE Promocion_Update(
    IN p_id INT,
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE,
    IN p_descuento DECIMAL(5,2),
    IN p_id_sucursal INT
)
BEGIN
    UPDATE promociones 
    SET fecha_inicio = p_fecha_inicio,
        fecha_fin = p_fecha_fin,
        descuento = p_descuento,
        id_sucursal = p_id_sucursal
    WHERE id_promocion = p_id;
END$$

CREATE PROCEDURE Promocion_Delete(IN p_id INT)
BEGIN
    DELETE FROM promociones WHERE id_promocion = p_id;
END$$
DELIMITER ;
10. Proveedores
sql
-- PROVEEDORES
DELIMITER $$
CREATE PROCEDURE Proveedor_Create(
    IN p_ruc VARCHAR(20),
    IN p_nombre VARCHAR(100),
    IN p_contacto VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_categoria ENUM('Alimentos','Bebidas','Limpieza','Electrónicos'),
    IN p_dias_entrega VARCHAR(50)
)
BEGIN
    INSERT INTO proveedores(ruc, nombre, contacto, telefono, categoria, dias_entrega)
    VALUES (p_ruc, p_nombre, p_contacto, p_telefono, p_categoria, p_dias_entrega);
END$$

CREATE PROCEDURE Proveedor_Read(IN p_id INT)
BEGIN
    SELECT * FROM proveedores WHERE id_proveedor = p_id;
END$$

CREATE PROCEDURE Proveedor_ReadByRUC(IN p_ruc VARCHAR(20))
BEGIN
    SELECT * FROM proveedores WHERE ruc = p_ruc;
END$$

CREATE PROCEDURE Proveedor_ReadAll()
BEGIN
    SELECT * FROM proveedores;
END$$

CREATE PROCEDURE Proveedor_Update(
    IN p_id INT,
    IN p_ruc VARCHAR(20),
    IN p_nombre VARCHAR(100),
    IN p_contacto VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_categoria ENUM('Alimentos','Bebidas','Limpieza','Electrónicos'),
    IN p_dias_entrega VARCHAR(50)
)
BEGIN
    UPDATE proveedores 
    SET ruc = p_ruc,
        nombre = p_nombre,
        contacto = p_contacto,
        telefono = p_telefono,
        categoria = p_categoria,
        dias_entrega = p_dias_entrega
    WHERE id_proveedor = p_id;
END$$

CREATE PROCEDURE Proveedor_Delete(IN p_id INT)
BEGIN
    DELETE FROM proveedores WHERE id_proveedor = p_id;
END$$
DELIMITER ;
11. Secciones
sql
-- SECCIONES
DELIMITER $$
CREATE PROCEDURE Seccion_Create(
    IN p_nombre VARCHAR(100),
    IN p_id_sucursal INT,
    IN p_temperatura_controlada TINYINT(1)
)
BEGIN
    INSERT INTO secciones(nombre, id_sucursal, temperatura_controlada)
    VALUES (p_nombre, p_id_sucursal, p_temperatura_controlada);
END$$

CREATE PROCEDURE Seccion_Read(IN p_id INT)
BEGIN
    SELECT * FROM secciones WHERE id_seccion = p_id;
END$$

CREATE PROCEDURE Seccion_ReadBySucursal(IN p_id_sucursal INT)
BEGIN
    SELECT * FROM secciones WHERE id_sucursal = p_id_sucursal;
END$$

CREATE PROCEDURE Seccion_ReadAll()
BEGIN
    SELECT * FROM secciones;
END$$

CREATE PROCEDURE Seccion_Update(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_id_sucursal INT,
    IN p_temperatura_controlada TINYINT(1)
)
BEGIN
    UPDATE secciones 
    SET nombre = p_nombre,
        id_sucursal = p_id_sucursal,
        temperatura_controlada = p_temperatura_controlada
    WHERE id_seccion = p_id;
END$$

CREATE PROCEDURE Seccion_Delete(IN p_id INT)
BEGIN
    DELETE FROM secciones WHERE id_seccion = p_id;
END$$
DELIMITER ;
12. Sucursales
sql
-- SUCURSALES
DELIMITER $$
CREATE PROCEDURE Sucursal_Create(
    IN p_nombre VARCHAR(100),
    IN p_direccion VARCHAR(200),
    IN p_telefono VARCHAR(20),
    IN p_horario_apertura TIME,
    IN p_horario_cierre TIME,
    IN p_area DECIMAL(10,2)
)
BEGIN
    INSERT INTO sucursales(
        nombre, direccion, telefono, 
        horario_apertura, horario_cierre, area
    ) VALUES (
        p_nombre, p_direccion, p_telefono,
        p_horario_apertura, p_horario_cierre, p_area
    );
END$$

CREATE PROCEDURE Sucursal_Read(IN p_id INT)
BEGIN
    SELECT * FROM sucursales WHERE id_sucursal = p_id;
END$$

CREATE PROCEDURE Sucursal_ReadAll()
BEGIN
    SELECT * FROM sucursales;
END$$

CREATE PROCEDURE Sucursal_Update(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_direccion VARCHAR(200),
    IN p_telefono VARCHAR(20),
    IN p_horario_apertura TIME,
    IN p_horario_cierre TIME,
    IN p_area DECIMAL(10,2)
)
BEGIN
    UPDATE sucursales 
    SET nombre = p_nombre,
        direccion = p_direccion,
        telefono = p_telefono,
        horario_apertura = p_horario_apertura,
        horario_cierre = p_horario_cierre,
        area = p_area
    WHERE id_sucursal = p_id;
END$$

CREATE PROCEDURE Sucursal_Delete(IN p_id INT)
BEGIN
    DELETE FROM sucursales WHERE id_sucursal = p_id;
END$$
DELIMITER ;
13. Usuarios
sql
-- USUARIOS
DELIMITER $$
CREATE PROCEDURE Usuario_Create(
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_id_empleado INT,
    IN p_rol ENUM('Admin','Cajero','Inventario','Gerente')
)
BEGIN
    INSERT INTO usuarios(username, email, password_hash, id_empleado, rol)
    VALUES (p_username, p_email, p_password_hash, p_id_empleado, p_rol);
END$$

CREATE PROCEDURE Usuario_Read(IN p_id INT)
BEGIN
    SELECT * FROM usuarios WHERE id_usuario = p_id;
END$$

CREATE PROCEDURE Usuario_ReadByUsername(IN p_username VARCHAR(50))
BEGIN
    SELECT * FROM usuarios WHERE username = p_username;
END$$

CREATE PROCEDURE Usuario_ReadAll()
BEGIN
    SELECT * FROM usuarios;
END$$

CREATE PROCEDURE Usuario_Update(
    IN p_id INT,
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_rol ENUM('Admin','Cajero','Inventario','Gerente')
)
BEGIN
    UPDATE usuarios 
    SET email = p_email,
        password_hash = p_password_hash,
        rol = p_rol
    WHERE id_usuario = p_id;
END$$

CREATE PROCEDURE Usuario_Delete(IN p_id INT)
BEGIN
    DELETE FROM usuarios WHERE id_usuario = p_id;
END$$
DELIMITER ;
14. Ventas
sql
-- VENTAS
DELIMITER $$
CREATE PROCEDURE Venta_Create(
    IN p_total DECIMAL(10,2),
    IN p_id_cliente INT,
    IN p_id_empleado INT,
    IN p_id_sucursal INT,
    IN p_tipo_pago ENUM('Efectivo','Tarjeta','Transferencia')
)
BEGIN
    INSERT INTO ventas(total, id_cliente, id_empleado, id_sucursal, tipo_pago)
    VALUES (p_total, p_id_cliente, p_id_empleado, p_id_sucursal, p_tipo_pago);
END$$

CREATE PROCEDURE Venta_Read(IN p_id INT)
BEGIN
    SELECT * FROM ventas WHERE id_venta = p_id;
END$$

CREATE PROCEDURE Venta_ReadByFecha(IN p_fecha DATE)
BEGIN
    SELECT * FROM ventas 
    WHERE DATE(fecha_hora) = p_fecha;
END$$

CREATE PROCEDURE Venta_ReadAll()
BEGIN
    SELECT * FROM ventas;
END$$

CREATE PROCEDURE Venta_Update(
    IN p_id INT,
    IN p_total DECIMAL(10,2),
    IN p_id_cliente INT,
    IN p_tipo_pago ENUM('Efectivo','Tarjeta','Transferencia')
)
BEGIN
    UPDATE ventas 
    SET total = p_total,
        id_cliente = p_id_cliente,
        tipo_pago = p_tipo_pago
    WHERE id_venta = p_id;
END$$

CREATE PROCEDURE Venta_Delete(IN p_id INT)
BEGIN
    DELETE FROM ventas WHERE id_venta = p_id;
END$$
DELIMITER ;