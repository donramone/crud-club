// ESTE MODULO QUEDA A MODO DE APRENDIZAJE, NO ESTA SIENDO UTILIZADO
/*
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
      return false;
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
    const equipoGuardado = equipo.id ? await this.update(equipo) : await this.create(equipo);
    return equipoGuardado;
  }

  async update(equipo) {
    const listaEquipos = await this.getData();
    const equipoIndex = listaEquipos.findIndex((tmpClub) => tmpClub.id == equipo.id);
    if (equipoIndex === -1) {
      console.log('No se puede actualizar el equipo. no existe ID');
      return false;
    }
    // TODO: Si estoy intentando actualizar un equipo sin escudo da error
    const equipoSinModificar = listaEquipos[equipoIndex];
    if (!equipo.escudoUrl) {
      listaEquipos[equipoIndex].escudoUrl = equipoSinModificar.escudoUrl;
    }
    listaEquipos[equipoIndex] = EquipoMapper.fromEntityToJson(equipo);
    this.saveData(listaEquipos);
    return equipo;
  }

  async create(equipo) {
    const listaEquipos = await this.getData();
    const equipoToSave = { ...EquipoMapper.fromEntityToJson(equipo), ...{ id: uuidv4() } };
    listaEquipos.push(equipoToSave);
    this.saveData(listaEquipos);
    return EquipoMapper.fromJsonToEntity(equipoToSave);
    // return listaEquipos;
  }

  async delete(equipo) {
    const listaEquipos = this.getData();
    const equipoIndex = listaEquipos.findIndex((tmpClub) => tmpClub.id == equipo.id);
    if (equipoIndex == -1) {
      console.log('No se puede Eliminar el equipo. no existe ID');
      return false;
    }
    listaEquipos.splice(equipoIndex, 1);
    this.saveData(listaEquipos);
    return true;
  }

  saveData(content) {
    // console.log(content);
    const ruta = dirPath + 'equipos.db.json'
    fs.writeFileSync(ruta, JSON.stringify(content));
  }
};
*/
