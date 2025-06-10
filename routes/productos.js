const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productoController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', controller.obtenerProductos);
router.get('/nuevo', controller.mostrarFormularioNuevo);
router.get('/buscar', controller.productosFiltrados);
router.post('/', upload.single('imagen'), controller.crearProducto);
router.get('/editar/:id', controller.mostrarFormularioEditar);
router.put('/editar/:id', upload.single('imagen'), controller.actualizarProducto);
router.get('/eliminar/:id', controller.eliminarProducto);
router.delete("/destruir/:id", controller.destruirProducto);

module.exports = router;