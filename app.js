const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const path = require('path');


app.set('port', 3001);


app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(require('./routes/handlers'));


module.exports = app;
