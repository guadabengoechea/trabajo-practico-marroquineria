const fs = require("fs");
const path = require("path");
const rutaArchivo = path.join(__dirname, "../models/productos.json");

function leerProductos() {
  const datos = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(datos);
}

function guardarProductos(productos) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2));
}

module.exports = {
  obtenerProductos(req, res) {
    const productos = leerProductos();
    res.render("productos", { productos });
  },

  mostrarFormularioNuevo(req, res) {
    res.render("nuevoProducto");
  },

  productosFiltrados(req, res) {
    const criterio = req.query.criterio;

    const productos = leerProductos();
    const productosFiltrados = productos.filter((p) =>
      p.nombre.toUpperCase().includes(criterio.toUpperCase())
    );

    res.render("productos", { productos: productosFiltrados });
  },

  crearProducto(req, res) {
    const productos = leerProductos();
    const imagen = req.file ? req.file.filename : null;
    
    const nuevo = {
      id: Date.now().toString(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen,
    };
    productos.push(nuevo);
    guardarProductos(productos);
    res.redirect("/productos");
  },

  mostrarFormularioEditar(req, res) {
    const productos = leerProductos();
    const producto = productos.find((p) => p.id === req.params.id);
    res.render("editarProducto", { producto });
  },

  actualizarProducto(req, res) {
    let productos = leerProductos();
    productos = productos.map((p) => {
      if (p.id === req.params.id) {
        return {
          ...p,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
          imagen: req.body.imagen,
        };
      }
      return p;
    });
    guardarProductos(productos);
    res.redirect("/productos");
  },

  eliminarProducto: (req, res) => {
    let productos = leerProductos();
    const id = req.params.id;
    const producto = productos.find((prod) => prod.id == id);
    res.render("eliminarProducto", { producto });
  },

  destruirProducto(req, res) {
    let productos = leerProductos();
    productos = productos.filter((p) => p.id !== req.params.id);
    guardarProductos(productos);
    res.redirect("/productos");
  },
};
