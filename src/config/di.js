const session = require('express-session');
const multer = require('multer');
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

function configureMulter() {
  const storage = {
    dest: './uploads/imagenes',
  };
  return multer(storage);
}

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    // Aca va el parametro de multer en el constructor de Controller
    EquipoController: object(EquipoController).construct(get('Multer'), get('EquipoService')),
    // EquipoController: object(EquipoController).construct(get('EquipoService')),
    EquipoService: object(EquipoService).construct(get('EquipoRepository')),
    EquipoRepository: object(EquipoRepository).construct(),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
  return container;
};