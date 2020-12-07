class Equipo {
  constructor({
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
    // Area,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.nombreBreve = nombreBreve;
    this.siglas = siglas;
    this.escudoUrl = escudoUrl;
    this.direccion = direccion;
    this.telefono = telefono;
    this.web = web;
    this.email = email;
    this.fundado = fundado;
    this.coloresEquipo = coloresEquipo;
    this.sede = sede;
    // this.Area = Area;
  }
}

module.exports = Equipo;
