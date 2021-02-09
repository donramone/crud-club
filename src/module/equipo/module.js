const EquipoController = require('./controller/equipoController');
const EquipoRepository = require('./repository/sqlite/equipoRepository');
const EquipoService = require('./service/equipoService');
const EquipoModel = require('./model/equipoModel');

function init(app, container) {
  const controller = container.get('EquipoController');
  console.log(controller);
 controller.configureRoutes(app);
}

module.exports = {
  init,
  EquipoController,
  EquipoRepository,
  EquipoService,
  EquipoModel,
};
