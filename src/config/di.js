const session = require('express-session');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { EquipoController, EquipoService, EquipoRepository } = require('../module/equipo/module');

function configureSession() {
  const sessionOptions = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
  };
  return session(sessionOptions);
}

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    EquipoController: object(EquipoController).construct(get('EquipoService')),
    EquipoService: object(EquipoService).construct(get('EquipoRepository')),
    EquipoRepository: object(EquipoRepository).construct(),
    Session: factory(configureSession),
  });
  return container;
};