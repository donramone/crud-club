const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const EquipoMapper = require('../../mapper/equipoMapper');
// TODO: como armar esta ruta sin escribir que suba tantos niveles
const dirPath = path.join(__dirname, '../../../../../data/');

module.exports = class EquipoRepository {
  async getAll() {
    const dataJson = this.getData();
    return dataJson.map((clubData) => EquipoMapper.fromJsonToEntity(clubData));
  }

  async getById(id) {
    const listaEquipos = this.getData();
    // aca no me encuentra cuando pongo la comparacion ===
    const equipo = listaEquipos.find((equipoTmp) => equipoTmp.id == id);
    if (!equipo) {
      console.log(`No se encontró equipo con id ${id} `);
    }
    return EquipoMapper.fromJsonToEntity(equipo);
  }

  getData() {
    const content = fs.readFileSync(dirPath + 'equipos.db.json');
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = [];
    }
    return parsedContent;
  }

  async save(equipo) {
    const nuevaLista = equipo.id ? await this.update(equipo) : await this.create(equipo);
    this.saveData(nuevaLista);
  }

  async update(equipo) {
    const listaEquipos = await this.getData();
    const equipoIndex = listaEquipos.findIndex((tmpClub) => tmpClub.id == equipo.id);
    if (equipoIndex === -1) {
      console.log("No se puede actualizar el equipo ");
    }
    // TODO: Si estoy intentando actualizar un equipo sin escudo da error
    const oldClub = listaEquipos[equipoIndex];
    if (!equipo.escudoUrl) {
      listaEquipos[equipoIndex].escudoUrl = oldClub.escudoUrl;
    }
    listaEquipos[equipoIndex] = EquipoMapper.fromEntityToJson(equipo);
    return listaEquipos;
  }

  async create(equipo) {
    const listaEquipos = await this.getData();
    const equipoToSave = { ...EquipoMapper.fromEntityToJson(equipo), ...{ id: uuidv4() } };
    listaEquipos.push(equipoToSave);
    return listaEquipos;
  }

  async delete(equipo) {
    const listaEquipos = this.getData();
    const clubIndex = listaEquipos.findIndex((tmpClub) => tmpClub.id === equipo.id);
    listaEquipos.splice(clubIndex, 1);
    this.saveData(listaEquipos);
    return true;
  }

  saveData(content) {
    const ruta = dirPath + 'equipos.db.json'
    fs.writeFileSync(ruta, JSON.stringify(content));
  }
};
