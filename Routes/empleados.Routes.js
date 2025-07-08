const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

router.post('/', empleadosController.createEmpleado);
router.get('/', empleadosController.getAllEmpleados);
router.get('/:id', empleadosController.getEmpleadoById);
router.get('/dni/:dni', empleadosController.getEmpleadoByDNI);
router.put('/:id', empleadosController.updateEmpleado);
router.delete('/:id', empleadosController.deleteEmpleado);

module.exports = router;