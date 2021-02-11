const { Sequelize, Model, DataTypes } = require('sequelize');

/* const path = require('path');

const dirPath = path.join(__dirname, '../../../../data/');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${dirPath}equipos.db`,

}); */

module.exports = class EquipoModel extends Model {
  static setup(sequelizeInstance) {
    EquipoModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        short_name: {
          type: DataTypes.STRING,
        },
        tla: {
          type: DataTypes.STRING,
        },
        crest_url: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        website: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        founded: {
          type: DataTypes.INTEGER,
        },
        club_colors: {
          type: DataTypes.STRING,
        },
        venue: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Equipo',
        tableName: 'equipos',
        timestamps: false,
      },
    );

    return EquipoModel;
  }
};
