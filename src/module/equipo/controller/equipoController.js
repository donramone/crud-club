const express = require('express');

const router = express.Router();
const multer = require('multer');
const EquipoService = require('../service/equipoService');
const { fromDataToEntity } = require('../mapper/equipoMapper');

const storage = {
  dest: './uploads/imagenes',
};
const upload = multer(storage);
const equipoService = new EquipoService();

// Obtengo error si no declaro este urlencode. sirve para subir archivos JPG
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  const team = equipoService.getAll();
  team.then((data) => {
    res.render('index', {
      equipos: data,
    });
  });
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
    const equipoSeleccionado = await equipoService.getById(req.params.id);
    await equipoService.delete(equipoSeleccionado);
    // req.session.messages = [`Se eliminó el club ID: ${id} (${equipo.name})`];
  } catch (e) {
    console.log(e);
    // req.session.errors = [e.message, e.stack];
  }
  res.redirect('/');
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.post('/form', upload.single('escudoUrl'), async (req, res) => {
  try {
    const Myequipo = fromDataToEntity(req.body);
    if (req.file) {
      Myequipo.escudoUrl = `/imagenes/${req.file.filename}`;
    }
    await equipoService.save(Myequipo);

    if (Myequipo.id) {
      // req.session.messages = [`El club con id ${equipo.id} se actualizó exitosamente`];
    } else {
      // req.session.messages = [`Se creó el club con id ${savedClub.id} (${savedClub.name})`];
    }
    res.redirect('/');
  } catch (e) {
    // console.log(e);
    // req.session.errors = [e.message, e.stack];
    // res.redirect('/club');
  }
});

module.exports = router;
