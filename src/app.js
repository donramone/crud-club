// FIX Root directory is -> /src/
const path = require('path');
// require('dotenv').config({ path: '/home/luigi/Proyectos/crud-club/.env' });
const express = require('express');
const exphbs = require('express-handlebars');
const { init: initEquipoModule } = require('./module/equipo/module');
const configureDependencyInjection = require('./config/di');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/uploads`));

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));

const container = configureDependencyInjection();
try {
  initEquipoModule(app, container);
} catch (error) {
  console.log(" *********************ERROR*************************");
  console.log(error);
}

// app.use(container.get('Session'));
// const equipoController = container.get('EquipoController');
// app.get('/', equipoController.index.bind(equipoController));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'module/equipo/views'));
// app.use(require('../src/module/equipo/controller/equipoController'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
