const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');

router.get('/', controller.obtenerProductos);
router.get('/nuevo', controller.mostrarFormularioNuevo);
router.post('/', controller.crearProducto);
router.get('/editar/:id', controller.mostrarFormularioEditar);
router.put('/editar/:id', controller.actualizarProducto);
router.get('/eliminar/:id', controller.eliminarProducto);
router.delete("/destruir/:id", controller.destruirProducto);

module.exports = router;