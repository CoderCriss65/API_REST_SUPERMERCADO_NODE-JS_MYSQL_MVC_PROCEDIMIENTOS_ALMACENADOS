const express = require('express');
const router = express.Router();
const promocionesController = require('../controllers/promocionesController');

router.post('/', promocionesController.createPromocion);
router.get('/', promocionesController.getAllPromociones);
router.get('/:id', promocionesController.getPromocionById);
router.get('/producto/:productoId', promocionesController.getPromocionesByProduct);
router.get('/activas', promocionesController.getPromocionesActivas);
router.put('/:id', promocionesController.updatePromocion);
router.delete('/:id', promocionesController.deletePromocion);

module.exports = router;