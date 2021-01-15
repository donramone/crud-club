const path = require('path');

const dirPath = path.join(__dirname, '../../../../../data/');
const sqlite = require('better-sqlite3');
const EquipoMapper = require('../../mapper/equipoMapper');

const db = sqlite(dirPath + 'equipos.db');

module.exports = class EquipoRepository {
  constructor(dbAdapter) {
    this.databaseAdapter = dbAdapter || db;
  }
  async getAll() {
    const equipos = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        FROM equipos`
      )
      .all();
    return equipos.map((clubData) => EquipoMapper.fromDbToEntity(clubData));
  }

  async getById(id) {
    const equipo = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        FROM equipos WHERE id = ?`
      ).get(id);
    if (equipo === undefined) {
      console.log("No se encontro equipo by ID");
    }
    return EquipoMapper.fromDbToEntity(equipo);
  }

  async save(equipo) {
    const equipoGuardado = equipo.id ? await this.update(equipo) : await this.create(equipo);
    return equipoGuardado;
  }

  async update(equipo) {
    const statement = this.databaseAdapter.prepare(`
    UPDATE equipos SET
      ${equipo.escudoUrl ? `crest_url = ?,` : ''}
      name = ?,
      short_name = ?,
      tla = ?,
      address = ?,
      phone = ?,
      website = ?,
      email = ?,
      founded = ?,
      club_colors = ?,
      venue = ?
    WHERE id = ?
  `);

    const params = [
      equipo.nombre,
      equipo.nombreBreve,
      equipo.siglas,
      equipo.direccion,
      equipo.telefono,
      equipo.web,
      equipo.email,
      equipo.fundado,
      equipo.coloresEquipo,
      equipo.sede,
      equipo.id,
    ];

    if (equipo.escudoUrl) {
      params.unshift(equipo.escudoUrl);
    }

    statement.run(params);
    return equipo;
  }

  async create(equipo) {
    let id;
  try {
    const statement = this.databaseAdapter.prepare(`
    INSERT INTO equipos
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
  `);
    const result = statement.run(
      null,
      1,
      equipo.nombre,
      equipo.nombreBreve,
      equipo.siglas,
      equipo.escudoUrl,
      equipo.direccion,
      equipo.telefono,
      equipo.web,
      equipo.email,
      equipo.fundado,
      equipo.coloresEquipo,
      equipo.sede,
      null,
      
    );

    id = result.lastInsertRowid;
    return this.getById(id);
  } catch (error) {
    console.log(error);
  }
}

  async delete(equipo) {
    if (!equipo || !equipo.id) {
      console.log('No existe el equipo');
    }
    this.databaseAdapter.prepare('DELETE FROM equipos WHERE id = ?').run(equipo.id);
    return true;
  }
};
