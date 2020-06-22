const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const storage =  {
    dest: './data/img'
}
const upload = multer(storage);
const { v4: uuidv4 } = require('uuid');

router.use(express.static(`${__dirname}/data`));
// Obtengo error si no declaro este urlencode
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.render('index',{
       equipos: JSON.parse(fs.readFileSync('./data/equipos.json'))
       
    });

});

router.post('/edit/:id', upload.single('imagen'), (req, res) => {
    
    console.log("imagen : " + req.file);
    const {tla, name, shortname} = req.body;
    const idEditar = req.params.id;
    //console.log('image ' + crestUrl);
    
    //clubs
    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));
    //clubIndex 
    const selectedObject = equipos_json.find((equipo) => equipo.id == idEditar);
    
    selectedObject.tla = tla;
    selectedObject.name = name ;
    selectedObject.shortName = shortname;


   console.log("equipo Modificado: " , selectedObject); 
   res.redirect('/');
   //equipos_json[idEditar] = selectedObject;

   // fs.writeFileSync('data/equipos.db.json', JSON.stringify(equipos_json), 'utf-8');
    /*

    res.send('testing if method post works');


    fs.writeFileSync('data/equipos.db.json', JSON.stringify(equipos_json), 'utf-8');


    fs.writeFile('data/equipos.db.json', JSON.stringify(clubs), (err) => {
        if (err) throw err;
      });
      res.redirect('/');

    /**
      const { id } = req.body;
      const clubs = helpers.getClubs();
      const clubIndex = clubs.findIndex(({ id: clubId }) => clubId.toString() === id);
    const editedClub = helpers.editClub(req.body, req.file, clubs[clubIndex]);
    clubs[clubIndex] = editedClub;

    fs.writeFile('data/equipos.db.json', JSON.stringify(clubs), (err) => {
    if (err) throw err;
    });
    res.redirect('/');
    });
    */

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

router.post('/create', (req, res) => {
    const {tla, name, shortName} = req.body;
    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'));
    
    if(!tla || !shortName){
        res.status(400).send("Datos incompletos");
         return;
    }
    
    let newTeam = {
        id: uuidv4(),
        tla,
        name,
        shortName
    };

    console.log('el nuevo team es ' + JSON.stringify(newTeam));
    equipos.push(newTeam);
    console.log('eqyupos ' + JSON.stringify(equipos));
    fs.writeFileSync('data/equipos.json', JSON.stringify(equipos), 'utf-8');
    //res.send("datos recibidos" + JSON.stringify(equipos));
    res.redirect('/');
       

});

router.get('/delete/:id', (req, res) => {
    
    const idEliminar = req.params.id;
    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));
    // here error con !==
    const e = equipos_json.filter(equipo => equipo.id != idEliminar);

    fs.writeFileSync('./data/equipos.json', JSON.stringify(e))
    res.redirect('/');
    
});

router.use((req, res, next) => {
    res.render('error');
});

module.exports = router;