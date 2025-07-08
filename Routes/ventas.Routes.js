const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.post('/', ventasController.createVenta);
router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaById);
router.get('/fecha/:fecha', ventasController.getVentasByDate);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

module.exports = router;