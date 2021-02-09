module.exports = class EquipoController {
  constructor(equipoService) {
    this.equipoService = equipoService;
  }

  configureRoutes(app) {
    app.get('/', (req, res) => {
      const errors = null;
      const messages = null;
      // const { errors, messages } = req.session;
      const equipos = this.equipoService.getAll();
      equipos.then((data) => {
        res.render('index', {
          equipos: data, messages, errors,
        });
      });
    });
  }
}

// };

/*   configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
  
    // Nota: el `bind` es necesario porque estamos atando el callback a una función miembro de esta clase
    // y no a la clase en si.
    // Al hacer `bind` nos aseguramos que "this" dentro de `create` sea el controlador.
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  } */



/* const express = require('express');

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
    await equipoService.delete(equipoSeleccionado);
    req.session.messages = [`Se eliminó el equipo con ID : ${id} (${equipoSeleccionado.nombreBreve})`];
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
    if (equipo.id) {
      req.session.messages = [`El equipo con id ${equipo.id} se actualizó exitosamente`];
    } else {
      req.session.messages = [`Se creó el equipo con id ${equipoGuardado.id} (${equipoGuardado.nombreBreve})`];
    }
  } catch (e) {
    req.session.errors = [e.message, e.stack];
  }
  res.redirect('/');
});

module.exports = router;
 */