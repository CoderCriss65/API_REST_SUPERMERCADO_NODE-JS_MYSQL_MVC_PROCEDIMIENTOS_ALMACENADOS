const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

router.post('/', proveedoresController.createProveedor);
router.get('/', proveedoresController.getAllProveedores);
router.get('/:id', proveedoresController.getProveedorById);
router.put('/:id', proveedoresController.updateProveedor);
router.delete('/:id', proveedoresController.deleteProveedor);

module.exports = router;