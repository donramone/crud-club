const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const path = require('path');

// Setting
app.set('port', 3001);


app.engine('handlebars', exphbs({
  defaultLayout: 'main',
 // layoutsDir: path.join(__dirname, 'views/layouts')

}));
app.set('view engine', 'handlebars');
// Middlewares

/*
leer los datos del JSON segun fabricio
app.get('/equipos', (req, res) => {
  const equipos = fs.readFileSync('./data/equipos.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(equipos);
});
*/ 
// Routes

//const routes = require('./routes/handlers'); 
//app.use('/',routes);
app.use(require('./routes/handlers'));


module.exports = app;

