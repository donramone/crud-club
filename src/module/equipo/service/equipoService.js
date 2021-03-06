const EquipoRepository = require('../repository/sequelize/equipoRepository');
const Equipo = require('../entity/Equipo');

module.exports = class Service {
  constructor() {
    this.repository = new EquipoRepository();
  }

  /**
  *
  * @param {import("../repository/json/equipoRepository")} equipoRepository
  */
  async save(equipo) {
    if (equipo === undefined) {
      throw new Error("Equipo no definido");
    }
    return this.repository.save(equipo);
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Identificador de equipo no valido');
    }
    return this.repository.getById(id);
  }

  async getAll() {
    const equipos = await this.repository.getAll();
    return equipos;
  }

  /**
   * @param {Equipo} Equipo
   */
  async delete(equipo) {
    if (!(equipo instanceof Equipo)) {
      // throw new ClubNotDefinedError();
      console.log('ClubNotDefinedError en service');
      return;
    }
    return this.repository.delete(equipo);
  }
};
