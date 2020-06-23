
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

router.get('/', (req, res) => {
    res.render('index',{
       equipos: JSON.parse(fs.readFileSync('./data/equipos.json'))
       
    });

});

router.post('/edit/:id', upload.single('imagen'), (req, res) => {
    const {tla, name, shortname} = req.body;
    const pais = req.body['area.name'];
    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));
    //clubIndex 
    const selectedObject = equipos_json.find((equipo) => equipo.id == req.params.id);


    selectedObject.tla = tla;
    selectedObject.name = name ;
    selectedObject.shortName = shortname;
    selectedObject.area.name = pais;
    selectedObject.crestUrl = req.file.filename;


   console.log("equipo Modificado: " , selectedObject); 
   res.redirect('/');
});

router.get('/team/:id', (req, res) => {
 
    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));
    const selectedEquipo = equipos_json.find((equipo) => equipo.id == req.params.id);

    res.render('team',{
        equipo : selectedEquipo
    });

});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', upload.single('image'), (req, res) => {
    console.log(req.file);
    //CONTROLAR SI VIENE LA IMAGEN VACIA DA ERROR!!!
    //console.log("imagen stringl : " + JSON.stringify( req.file.filename ) );
    const {tla, name, shortName } = req.body;
    // No puedo solucionar pasar el parametro del pais en la linea de arriba
    const pais = req.body['area.name'];


    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'));
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
        // + '.jpg'
        crestUrl: req.file.filename
    };

    console.log('el nuevo team es ' + JSON.stringify(newTeam));
    equipos.push(newTeam);
    console.log('eqyupos ' + JSON.stringify(equipos));
    fs.writeFileSync('data/equipos.json', JSON.stringify(equipos), 'utf-8');
    res.redirect('/');
       

});

router.get('/delete/:id', (req, res) => {

    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));
    // Error cuando castea !==
    const equipo = equipos_json.filter(equipo => equipo.id != req.params.id);
    fs.writeFileSync('./data/equipos.json', JSON.stringify(equipo))
    res.redirect('/');
    
});

router.use((req, res, next) => {
    res.render('error');
});

module.exports = router;