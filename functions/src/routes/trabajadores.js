const express = require('express');
const router = express.Router();
const trabajadoresController = require('../modelo/trabajadores');

router.get('/listar', trabajadoresController.listarTrabajadores);
router.get('/:id', trabajadoresController.obtenerTrabajador);
router.post('/', trabajadoresController.crearTrabajador);
router.put('/:id', trabajadoresController.actualizarTrabajador);
router.delete('/:id', trabajadoresController.eliminarTrabajador);

module.exports = router;