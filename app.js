const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const path = require('path');

// Setting
app.set('port', 3001);


app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Routes

//const routes = require('./routes/handlers'); 
//app.use('/',routes);
app.use(require('./routes/handlers'));


module.exports = app;
