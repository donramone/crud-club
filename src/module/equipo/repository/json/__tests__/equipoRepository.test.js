const EquipoRepository = require('../equipoRepository');
const Equipo = require('../../../entity/Equipo');

const equipoRepository = new EquipoRepository();

const equipoMock = {
  id: '57',
  nombre: 'NombreTest',
  nombreBreve: 'testJest',
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

/*
test('Funcion Save crea un equipo cuando la entidad no tiene id', async () => {
   // No puedo hacer este test
  // const newEquipo = await equipoRepository.save({ nombre: 'nombreFicticio' });
  // Probar que se haya ejecutado la funcion Create ¿?????
});
test('Funcion Save edita un equipo cuando la entidad tiene id', async () => {
   // No puedo hacer este test
  // const newEquipo = await equipoRepository.save({ nombre: 'nombreFicticio' });
  // Probar que se haya ejecutado la funcion Update ¿?????
});

test('getById Trae un equipo con id existente', async () => {
  const equipo = await equipoRepository.getById({ id: '62' });
  // No puedo hacer este test
  expect(equipo).toBeInstanceOf(Equipo);
});
*/
test('Borrar un equipo con id inexistente devuelve false', async () => {
  await expect(equipoRepository.delete({ id: 1 })).resolves.toEqual(false);
});

test('Borrar un equipo con id existente devuelve true', async () => {
  // Me elimina al inicio pero el test vuelve a ejecutar y no funciona.
  await expect(equipoRepository.delete({ id: '61' })).resolves.toEqual(true);
});

test('Actualizar equipo con id inexistente devuelve false', async () => {
  await expect (equipoRepository.update({ id: 1, escudoUrl: 'path' })).resolves.toEqual(false);
});

test('Actualizar equipo con id existente lo devuelve en una lista', async () => {
  const equipos = await equipoRepository.update({ id: 62, nombre: 'nombreTest', escudoUrl: 'path' }); 
  const equipo = equipos.find((e) => e.id == '62');
  expect(equipo.name).toEqual('nombreTest');
});

test('getById No trae un equipo con id inexistente', async () => {
  const equipo = await equipoRepository.getById({ id: '6092' });
   expect(equipo).toBe(false);
});