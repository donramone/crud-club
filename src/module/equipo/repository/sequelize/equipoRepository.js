const EquipoMapper = require('../../mapper/equipoMapper');

module.exports = class EquipoRepository {
  constructor(equipoModel) {
    this.equipoModel = equipoModel;
  }

  async getAll() {
    const equipos = await this.equipoModel.findAll();
    return equipos.map((equipoData) => EquipoMapper.fromDbToEntity(equipoData));
  }

  async getById(id) {
    const equipo = await this.equipoModel.findByPk(id);
    return EquipoMapper.fromDbToEntity(equipo);
  }

  async delete(equipo) {
    if (!equipo || !equipo.id) {
      console.log('No existe el equipo');
    }
    return Boolean(await this.equipoModel.destroy({ where: { id: equipo.id } }));
  }

  async save(equipo) {
    let equipoToSave;
    const buildOptions = { isNewRecord: !equipo.id };
    equipoToSave = this.equipoModel.build(EquipoMapper.fromEntityToModel(equipo), buildOptions);
    try {
      await equipoToSave.save();
      return EquipoMapper.fromDbToEntity(equipoToSave);
    } catch (error) {
      console.log(error);
    }
  }
};
