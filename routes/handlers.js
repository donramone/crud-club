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

router.get('/create', (req, res) => {
    res.render('create');

});

router.use((req, res, next) => {

    res.render('error');

});

module.exports = router;