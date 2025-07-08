const express = require('express');
const router = express.Router();
const sucursalesController = require('../controllers/sucursalesController');

router.post('/', sucursalesController.createSucursal);
router.get('/', sucursalesController.getAllSucursales);
router.get('/:id', sucursalesController.getSucursalById);
router.put('/:id', sucursalesController.updateSucursal);
router.delete('/:id', sucursalesController.deleteSucursal);

module.exports = router;