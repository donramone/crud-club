
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
    return JSON.parse(fs.readFileSync('./data/equipos.json'))
}

router.get('/', (req, res) => {
    res.render('index',{
      equipos: traerDatosEquipos()
    });

});

router.post('/edit/:id', upload.single('imagen'), (req, res) => {
    const {tla, name, shortname} = req.body;
    const pais = req.body['area.name'];
    const equipos = traerDatosEquipos();
 
    const equipoSeleccionado = equipos.find((equipo) => equipo.id == req.params.id);
    const index = equipos.findIndex((equipo) => equipo.id == req.params.id);
    
    console.log("el index es_:" + index);

    equipoSeleccionado.tla = tla;
    equipoSeleccionado.name = name ;
    equipoSeleccionado.shortName = shortname;
    equipoSeleccionado.area.name = pais;
    // equipoSeleccionadoObj.crestUrl = req.file.filename;

    equipos.splice(index, 1, equipoSeleccionado);
    //console.log("equipo Modificado: " , selectedObject); 
    console.log("todos los equipos: " , equipos); 
    fs.writeFileSync('data/equipos.json', JSON.stringify(equipos), 'utf-8');
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
    //CONTROLAR SI VIENE LA IMAGEN VACIA DA ERROR!!!
    const {tla, name, shortName } = req.body;
    // No puedo solucionar pasar el parametro del pais en la linea de arriba
    const pais = req.body['area.name'];


    const equipos = traerDatosEquipos();
    // la validacion de errores no deberia estar acá
    if(!tla || !shortName){
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
        // + '.jpg' El navegador deberia poder mostrar sin la extension 
        crestUrl: req.file.filename
    };

    console.log('el nuevo team es ' + JSON.stringify(newTeam));
    equipos.push(newTeam);
    console.log('eqyupos ' + JSON.stringify(equipos));
    fs.writeFileSync('data/equipos.json', JSON.stringify(equipos), 'utf-8');
    res.redirect('/');
       

});

router.get('/delete/:id', (req, res) => {

    const equipos = traerDatosEquipos();
    // Error cuando castea !==
    const equiposActualizados = equipos.filter(equipo => equipo.id != req.params.id);
    fs.writeFileSync('./data/equipos.json', JSON.stringify(equiposActualizados))
    res.redirect('/');
    
});

router.use((req, res, next) => {
    res.render('error');
});

module.exports = router;