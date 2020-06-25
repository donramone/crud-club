
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const storage =  {
    dest: './uploads/imagenes'
}
const upload = multer(storage);

// Obtengo error si no declaro este urlencode
router.use(express.urlencoded({ extended: false }));

function traerDatosEquipos(){
    try {
        return JSON.parse(fs.readFileSync('./data/equipos.db.json'))
      } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('No se encontró el archivo equipos.json!');
          } else {
            throw err;
          }
      }
}

// tambien escribir una función para guardar el JSON
// Crear una entidad para manejar el Edit y Create
router.get('/', (req, res) => {
    res.render('index',{
      equipos: traerDatosEquipos()
    });

});

router.post('/edit/:id', upload.single('imagen'), (req, res) => {
    const {tla, name, shortName, address} = req.body;
    const pais = req.body['area.name'];
    
    const equipos = traerDatosEquipos();
    const equipoSeleccionado = equipos.find((equipo) => equipo.id == req.params.id);

    equipoSeleccionado.tla = tla;
    equipoSeleccionado.name = name ;
    equipoSeleccionado.shortName = shortName;
    equipoSeleccionado.area.name = pais;
    equipoSeleccionado.address = address;
    if(req.file){
        equipoSeleccionado.crestUrl = `/imagenes/${req.file.filename}`;
    }

    const index = equipos.findIndex((equipo) => equipo.id == req.params.id);
    equipos.splice(index, 1, equipoSeleccionado);
     
    fs.writeFileSync('data/equipos.db.json', JSON.stringify(equipos), 'utf-8');
    res.redirect('/');
});

router.get('/team/:id', (req, res) => {
 
    const equipos = traerDatosEquipos();
    const equipoSeleccionado = equipos.find((equipo) => equipo.id == req.params.id);

    res.render('team',{
        equipo : equipoSeleccionado
    });

});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', upload.single('image'), (req, res) => {

    const {tla, name, shortName, address } = req.body;
    // No puedo solucionar pasar el parametro del pais en la linea de arriba
    const pais = req.body['area.name'];
    const equipos = traerDatosEquipos();
   
    let img = '/imagenes/noImage.png';
    
    if (req.file != undefined){
        img =  `/imagenes/${req.file.filename} `;
    }
    
     // la validacion de errores no deberia estar acá
    if(!tla || !name){
        res.status(400).send("Datos incompletos");
         return;
    }
    
    let newTeam = {
        id: uuidv4(),
        tla,
        name,
        shortName,
        area: {
            name: pais
        },
        address,
        crestUrl: img
    };

    equipos.push(newTeam);
    fs.writeFileSync('data/equipos.db.json', JSON.stringify(equipos), 'utf-8');
    res.redirect('/');
       
});

router.get('/delete/:id', (req, res) => {

    const equipos = traerDatosEquipos();
    // Error cuando castea !==
    const equiposActualizados = equipos.filter(equipo => equipo.id != req.params.id);
    fs.writeFileSync('./data/equipos.db.json', JSON.stringify(equiposActualizados))
    res.redirect('/');
    
});

router.use((req, res, next) => {
    res.render('error');
});

module.exports = router;