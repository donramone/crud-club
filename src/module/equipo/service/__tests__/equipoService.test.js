const Equipo = require('../../entity/Equipo');
const EquipoService = require('../equipoService');
const EquipoRepository = require ('../../repository/json/equipoRepository');

jest.mock('../../repository/json/equipoRepository');

beforeEach(() => {
  EquipoRepository.mockClear();
});

it('Podemos verificar que el consumidor llamó al constructor de la clase', () => {
  const service = new EquipoService();
  expect(EquipoRepository).toHaveBeenCalledTimes(1);
});

it('Guardar un equipo llama al método save del repositorio 1 vez', () => {
  const service = new EquipoService();
  service.save({});
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockSave = mockRepo.save;
  expect(mockSave).toHaveBeenCalledTimes(1);
});

test('Eliminar un equipo llama al método delete del repositorio 1 vez', () => {
  const service = new EquipoService();
  service.delete(new Equipo({ id: 1 }));
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockDelete = mockRepo.delete;
  expect(mockDelete).toHaveBeenCalledTimes(1);
});

test('Consultar todos los equipos llama al método getAll del repositorio 1 vez', () => {
  const service = new EquipoService();
  service.getAll();
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockGetAll = mockRepo.getAll;
  expect(mockGetAll).toHaveBeenCalledTimes(1);
});

test('Consultar un equipo por id llama al método get del repositorio 1 vez', () => {
  const service = new EquipoService();
  service.getById(1);
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockGetById = mockRepo.getById;
  expect(mockGetById).toHaveBeenCalledTimes(1);
});


/* 
it('Método save sin ID Equipo Crea un equipo', () => {
  const service = new EquipoService();
  service.save({});
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockCreate = mockRepo.create;
  expect(mockCreate).toHaveBeenCalledTimes(1);
});


it('Método save con ID Equipo Actualiza un equipo', () => {
  const service = new EquipoService();
  service.save({ id: 43, nombre: 'test' });
  const mockRepo = EquipoRepository.mock.instances[0];
  const mockUpdate = mockRepo.update;
  expect(mockUpdate).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un equipo sin pasar un equipo da un error específico', async () => {
  await expect(service.save).rejects.toThrowError(ClubNotDefinedError);
});

test('Llamar a eliminar un equipo sin pasar un equipo da un error específico', async () => {
  await expect(service.delete).rejects.toThrowError(ClubNotDefinedError);
});

test('Llamar a consultar un equipo sin pasar un equipo da un error específico', async () => {
  await expect(service.getById).rejects.toThrowError(ClubIdNotDefinedError);
});

test('Consultar todos los equipos llama al método getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
*/
