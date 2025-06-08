const express = require('express');
const app = express();
const path = require('path');
const productosRoutes = require('./routes/productos');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/productos', productosRoutes);

app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});
