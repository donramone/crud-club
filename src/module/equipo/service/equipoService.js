const EquipoRepository = require('../repository/json/equipoRepository');
const Equipo = require('../entity/Equipo');

equipoRepository = new EquipoRepository();
module.exports = class Service {

  /**
   * @param {Equipo} Equipo
   */
  async save(equipo) {
    /*  if (equipo === undefined) {
      throw new ClubNotDefinedError();
    } */
    return await equipoRepository.save(equipo);
  }

  /**
   * @param {Equipo} Equipo
   */
  /*   async delete(equipo) {
      console.log("delete en Service");
    return this.clubRepository.delete(equipo);
  } */

  async getById(id) {
    /* if (id === undefined) {
      throw new ClubIdNotDefinedError();
    }
 */
    // return this.clubRepository.getById(id);
    const e = await equipoRepository.getById(id);
    return e;
  }

  async getAll() {

    const equipos = await equipoRepository.getAll();
    return equipos;
  }

  async delete(equipo) {
    if (!(equipo instanceof Equipo)) {
      // throw new ClubNotDefinedError();
      console.log("ClubNotDefinedError en service");
      return;
    }
    return await equipoRepository.delete(equipo);
  }
};