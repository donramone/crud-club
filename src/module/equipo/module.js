const EquipoController = require('./controller/equipoController');
const EquipoRepository = require('./repository/sequelize/equipoRepository');
const EquipoService = require('./service/equipoService');
const EquipoModel = require('./model/equipoModel');

function init(app, container) {
  const controller = container.get('EquipoController');
  // TODO implementar el configureRoutes
  controller.configureRoutes(app);
}

module.exports = {
  init,
  EquipoController,
  EquipoRepository,
  EquipoService,
  EquipoModel,
};
