const EquipoService = require('../equipoService');

const repositoryMock = {
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
  };

  const equipoService = new EquipoService(repositoryMock);

test('Guardar un equipo llama al método save del repositorio 1 vez', () => {
    equipoService.save({});
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });