const express = require('express');
const router = express.Router();
const inventarioController = require('../modelo/inventario');

router.get('/listar', inventarioController.listarProductos);
router.get('/:id', inventarioController.obtenerProducto);
router.post('/', inventarioController.crearProducto);
router.put('/:id', inventarioController.actualizarProducto);
router.delete('/:id', inventarioController.eliminarProducto);

module.exports = router;