const express = require('express');

const router = express.Router();
const multer = require('multer');
const session = require('express-session');

const EquipoService = require('../service/equipoService');
const { fromDataToEntity } = require('../mapper/equipoMapper');

const storage = {
  dest: './uploads/imagenes',
};
const upload = multer(storage);
const equipoService = new EquipoService();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(session({
  secret: 'mysecret_luigi',
  resave: false,
  saveUninitialized: false,
}));

router.get('/', (req, res) => {
  const { errors, messages } = req.session;
  const equipos = equipoService.getAll();
  equipos.then((data) => {
    res.render('index', {
      equipos: data, messages, errors,
    });
  });
  req.session.errors = [];
  req.session.messages = [];
});

router.get('/form/:id', (req, res) => {
  const equipoSeleccionado = equipoService.getById(req.params.id);
  equipoSeleccionado.then((data) => {
    res.render('form', {
      equipo: data,
    });
  });
});

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const equipoSeleccionado = await equipoService.getById(id);
    console.log(equipoSeleccionado);
    await equipoService.delete(equipoSeleccionado);
    req.session.messages = [`Se eliminó el equipo con ID : ${id} (${equipoSeleccionado.nombreBreve})`];
    console.log(req.session.messages);
  } catch (e) {
    req.session.errors = [e.message, e.stack];
  }
  res.redirect('/');
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.post('/form', upload.single('escudoUrl'), async (req, res) => {
  try {
    const equipo = fromDataToEntity(req.body);
    if (req.file) {
      equipo.escudoUrl = `/imagenes/${req.file.filename}`;
    }
    const equipoGuardado = await equipoService.save(equipo);
    console.log(equipo.id);
    if (equipo.id) {
      req.session.messages = [`El equipo con id ${equipo.id} se actualizó exitosamente`];
    } else {
      req.session.messages = [`Se creó el equipo con id ${equipoGuardado.id} (${equipoGuardado.nombreBreve})`];
    }
    console.log(req.session.messages);
    res.redirect('/');
  } catch (e) {
    req.session.errors = [e.message, e.stack];
    // res.redirect('/club');
  }
});

module.exports = router;
