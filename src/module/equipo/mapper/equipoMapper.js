const Equipo = require('../entity/Equipo');
// const Area = require('../../area/entity/area');

function fromDataToEntity({
  id,
  nombre,
  nombreBreve,
  siglas,
  escudoUrl,
  direccion,
  telefono,
  web,
  email,
  fundado,
  coloresEquipo,
  sede,
}) {
  return new Equipo({
    id,
    nombre,
    nombreBreve,
    siglas,
    escudoUrl,
    direccion,
    telefono,
    web,
    email,
    fundado,
    coloresEquipo,
    sede,
  });
}
function fromJsonToEntity(data) {
  const {
    id,
    name: nombre,
    shortName: nombreBreve,
    tla: siglas,
    crestUrl: escudoUrl,
    address: direccion,
    phone: telefono,
    website: web,
    email,
    founded: fundado,
    clubColors: coloresEquipo,
    venue: sede,
    // Area: new Area({ id: Number(area_id) }),
  } = data;
  return new Equipo({
    id,
    nombre,
    nombreBreve,
    siglas,
    escudoUrl,
    direccion,
    telefono,
    web,
    email,
    fundado,
    coloresEquipo,
    sede,
  //  Area: new Area({ id: Number(area_id) }),
  });
}
function fromEntityToJson(data) {
  const {
    id,
    nombre,
    nombreBreve,
    siglas,
    escudoUrl,
    direccion,
    telefono,
    web,
    email,
    fundado,
    coloresEquipo,
    sede,
    // Area: new Area({ id: Number(area_id) }),
  } = data;
  return ({
    id,
    name: nombre,
    shortName: nombreBreve,
    tla: siglas,
    crestUrl: escudoUrl,
    address: direccion,
    phone: telefono,
    website: web,
    email,
    founded: fundado,
    clubColors: coloresEquipo,
    venue: sede,
  //  Area: new Area({ id: Number(area_id) }),
  });
}

module.exports = {
  fromJsonToEntity,
  fromDataToEntity,
  fromEntityToJson,
};
