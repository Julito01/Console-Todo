import { guardarDB, leerDB } from './helpers/guardarArch.js';
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmacion,
  mostrarListadoChecklist,
} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea(desc);
        break;

      case '2':
        tareas.listadoCompleto();
        break;

      case '3':
        tareas.listarPendientesCompletadas(true);
        break;

      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArray);
        if (id !== '0') {
          const ok = await confirmacion(
            'Está seguro que desea borrar la tarea?'
          );
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada.');
          }
        }
    }

    guardarDB(tareas.listadoArray);

    await pausa();
  } while (opt !== '0');
};

main();
