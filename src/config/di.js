const path = require('path');
const session = require('express-session');
const multer = require('multer');
const { Sequelize } = require('sequelize');

const { default: DIContainer, object, get, factory } = require('rsdi');
const { EquipoController, EquipoService, EquipoRepository, EquipoModel } = require('../module/equipo/module');

function configureSequelize() {
  const dirPath = path.join(__dirname, '../../data/');
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${dirPath}equipos.db`,
  });
  return sequelize;
}

function configureEquipoModel(container) {
  EquipoModel.setup(container.get('Sequelize'));
  return EquipoModel;
}

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
function addEquipoModuleDefinitions(container) {
  container.addDefinitions({
    EquipoController: object(EquipoController).construct(get('Multer'), get('EquipoService')),
    EquipoService: object(EquipoService).construct(get('EquipoRepository')),
    EquipoRepository: object(EquipoRepository).construct(get('EquipoModel')),
    EquipoModel: factory(configureEquipoModel),
  });
}
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelize),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
}
module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addEquipoModuleDefinitions(container);
  return container;
};
