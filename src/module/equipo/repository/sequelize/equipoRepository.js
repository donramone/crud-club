
const EquipoModel = require('../../model/equipoModel');
const EquipoMapper = require('../../mapper/equipoMapper');

module.exports = class EquipoRepository {
   constructor() {
    // this.databaseAdapter = dbAdapter || db;
  }
   async getAll(){
    const equipos = await EquipoModel.findAll();
    return equipos.map((equipoData) => EquipoMapper.fromDbToEntity(equipoData));
  }
  async getById(id) {
    const equipo = await EquipoModel.findByPk(id);
    return EquipoMapper.fromDbToEntity(equipo);
  }

  async delete(equipo) {
    if (!equipo || !equipo.id) {
      console.log('No existe el equipo');
    }
    return Boolean(await EquipoModel.destroy({ where: { id: equipo.id } }));
  }
  
  async save(equipo){
  let equipoToSave;
  const buildOptions = { isNewRecord: !equipo.id};
  equipoToSave = EquipoModel.build(EquipoMapper.fromEntityToModel(equipo),buildOptions);
    try {
      await equipoToSave.save();
      return EquipoMapper.fromDbToEntity(equipoToSave);
    } catch (error) {
      console.log(error);
    }
  }
}