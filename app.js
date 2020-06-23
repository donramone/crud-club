
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads`));
app.set('port', 3001);
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(require('./routes/handlers'));

module.exports = app;
