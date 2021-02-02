// FIX Root directory is -> /src/
require('dotenv').config({ path: '/home/luigi/Proyectos/crud-club/.env' });
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/uploads`));

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'module/equipo/views'));
app.use(require('../src/module/equipo/controller/equipoController'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
