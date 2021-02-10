const { fromDataToEntity } = require('../mapper/equipoMapper');

module.exports = class EquipoController {
  constructor(multer, equipoService) {
    this.equipoService = equipoService;
    this.multer = multer;
  }

  configureRoutes(app) {
    app.get('/form', (req, res) => {
      res.render('form');
    });

    app.get('/', (req, res) => {
      const { errors, messages } = req.session;
      const equipos = this.equipoService.getAll();
      equipos.then((data) => {
        res.render('index', {
          equipos: data, messages, errors,
        });
      });
      req.session.errors = [];
      req.session.messages = [];
    });

    app.get('/form/:id', (req, res) => {
      const equipoSeleccionado = this.equipoService.getById(req.params.id);
      equipoSeleccionado.then((data) => {
        res.render('form', {
          equipo: data,
        });
      });
    });

    app.get('/delete/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const equipoSeleccionado = await this.equipoService.getById(id);
        await this.equipoService.delete(equipoSeleccionado);
        req.session.messages = [`Se eliminó el equipo con ID : ${id} (${equipoSeleccionado.nombreBreve})`];
      } catch (e) {
        req.session.errors = [e.message, e.stack];
      }
      res.redirect('/');
    });

    app.post('/form', this.multer.single('escudoUrl'), async (req, res) => {
      try {
        const equipo = fromDataToEntity(req.body);
        if (req.file) {
          equipo.escudoUrl = `/imagenes/${req.file.filename}`;
        }
        const equipoGuardado = await this.equipoService.save(equipo);
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
  }
};
