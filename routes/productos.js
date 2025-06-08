const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');

router.get('/', controller.obtenerProductos);
router.get('/nuevo', controller.mostrarFormularioNuevo);
router.post('/', controller.crearProducto);
router.get('/editar/:id', controller.mostrarFormularioEditar);
router.post('/:id', controller.actualizarProducto);
router.post('/eliminar/:id', controller.eliminarProducto);

module.exports = router;