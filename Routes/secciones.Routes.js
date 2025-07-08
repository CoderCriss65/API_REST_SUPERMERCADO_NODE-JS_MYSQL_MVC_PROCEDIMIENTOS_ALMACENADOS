const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/seccionesController');

router.post('/', seccionesController.createSeccion);
router.get('/', seccionesController.getAllSecciones);
router.get('/:id', seccionesController.getSeccionById);
router.get('/sucursal/:sucursalId', seccionesController.getSeccionesBySucursal);
router.put('/:id', seccionesController.updateSeccion);
router.delete('/:id', seccionesController.deleteSeccion);

module.exports = router;