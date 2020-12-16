const { fromJsonToEntity, fromDataToEntity } = require('../equipoMapper');
const Equipo = require('../../entity/Equipo');

describe('fromDataToEntity', () => {
  test('Debe mapear data del formulario a una entidad de equipo', () => {
    const dataMock = {
      id: '1',
      nombre: 'name',
      nombreBreve: 'short',
      siglas: 'tla',
      escudoUrl: '/img/nada.jpg',
      direccion: 'Av Siempre Viva 123',
      telefono: '37359999',
      web: 'www.test.com',
      email: 'test@gmail.com',
      fundado: '1820',
      coloresEquipo: 'azul',
      sede: 'Argentina',
    };
    const equipo = fromDataToEntity(dataMock);
    expect(equipo).toBeInstanceOf(Equipo);
  });
});

describe('fromJsonToEntity', () => {
  test('Debe mapear desde archivo Json a una entidad de equipo', () => {
    const dataMock = {
      id: '1',
      name: 'name',
      shortName: 'short',
      siglas: 'tla',
      escudoUrl: '/img/nada.jpg',
      direccion: 'Av Siempre Viva 123',
      telefono: '37359999',
      web: 'www.test.com',
      email: 'test@gmail.com',
      fundado: '1820',
      coloresEquipo: 'azul',
      sede: 'Argentina',
    };
    const equipo = fromJsonToEntity(dataMock);
    expect(equipo).toBeInstanceOf(Equipo);
  });
});
