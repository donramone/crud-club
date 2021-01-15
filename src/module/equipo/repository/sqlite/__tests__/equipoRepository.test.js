const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const EquipoRepository = require('../equipoRepository');
const Equipo = require('../../../entity/Equipo');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

 equipoFicticio = new Equipo({
  id: null,
  nombre: 'nombre ficticio',
  nombreBreve: 'Nombre corto',
  siglas: 'XXX',
  escudoUrl: 'Escudo',
  direccion: 'Av Siempre Viva',
  telefono: '3735635241',
  web: 'www.ficticio.com',
  email: 'e@mail.com',
  fundado: '2020',
  coloresEquipo: 'Negro',
  sede: 'Centro',
  website: 'website',
})

test('Eliminar equipo elimina un equipo existente', async () => {
  const repository = new EquipoRepository(mockDb);
  const equipoNuevo = await repository.save(equipoFicticio);
  expect(equipoNuevo.id).toEqual(1);
  expect(await repository.delete(equipoNuevo)).toBe(true);
});

test('Eliminar equipo sin ID no devuelve true', () => {
  const repository = new EquipoRepository(mockDb);
  expect(() => {
    repository.delete({});
  }).not.toBe(true);
});

test('Guardar un equipo sin ID genera correctamente su ID', async () => {
  const repository = new EquipoRepository(mockDb);
  const equipoNuevo = await repository.save(
   equipoFicticio
  );
  expect(equipoNuevo.id).toEqual(1);
});

test('Guardar un equipo existente actualiza sus datos correctamente', async () => {
  const repository = new EquipoRepository(mockDb);
  equipoFicticio.id = 2;
  equipoFicticio.nombre = 'nombre editado';
  let equipoEditado = await repository.save(equipoFicticio);
  expect(equipoEditado.id).toEqual(2);
  expect(equipoEditado.nombre).toEqual('nombre editado');
});

test('Actualizar un equipo con id que no existe da error', async () => {
  const repository = new EquipoRepository(mockDb);
  equipoFicticio.id = 1087;
  await expect(() => {
    repository.save(equipoFicticio).toThrowError(err);
  });
  equipoFicticio.id = null;
});

test('Buscar un equipo con id que no existe da error', async () => {
  const repository = new EquipoRepository(mockDb);
  await expect(() => {
    repository.getById(19835).toThrowError(err);
  });
});

test('Buscar un equipo por id devuelve el equipo correspondiente', async () => {
  const repository = new EquipoRepository(mockDb);
  const equipoNuevo = await repository.save(equipoFicticio);
  expect(equipoNuevo.id).toEqual(1);
  const equipo = await repository.getById(equipoNuevo.id);
  expect(equipo).toEqual(equipoNuevo);
});

test('Otener todos los equipos devuelve un array con los equipos', async () => {
  const repository = new EquipoRepository(mockDb);
  expect(await repository.getAll()).toEqual([]);

  const equipo1 = repository.save(
    new Equipo({
      nombre: 'Uno',
      siglas: '111',
      nombreBreve: '1',
    }),
  );
  const equipo2 = repository.save(
    new Equipo({
      nombre: 'Dos',
      siglas: '222',
      nombreBreve: '2',
    }),
  );
  const listaEquipos = await repository.getAll();
  expect(listaEquipos[0]).toMatchObject({nombre: 'Uno', siglas: '111'});
  expect(listaEquipos[1]).toMatchObject({nombre: 'Dos', siglas: '222'});
});
