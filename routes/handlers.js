const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
    res.render('index',{
       equipos: JSON.parse(fs.readFileSync('./data/equipos.json'))
       
    });

});

router.get('/ver', (req, res) => {
    res.render('team');


});

router.get('/team/:id', (req, res) => {
    let idEquipo = req.params.id;
    const equipos_json = JSON.parse(fs.readFileSync('./data/equipos.json'));

    const selectedObject = equipos_json.find((equipo) => equipo.id == idEquipo);
    //console.log(selectedObject);
    //function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
    res.render('team',{
        equipo : selectedObject
    });

});

function filterById(jsonObject, id) {
    return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];
}

router.get('/create', (req, res) => {
    res.render('create');

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