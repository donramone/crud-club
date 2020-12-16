require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads`));
// app.use('/public', express.static('public'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
// app.use(require('./routes/handlers'));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'module/equipo/views'));
app.use(require('../src/module/equipo/controller/equipoController'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
