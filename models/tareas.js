import { Tarea } from './tarea.js';

class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;

      const estado = completadoEn ? 'Completada' : 'Pendiente';
      console.log(`${i + 1}. ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas) {
    console.log();
    this.listadoArray.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada' : 'Pendiente';
      if (completadas) {
        if (completadoEn) {
          console.log(`${i + 1}. ${desc} :: ${completadoEn}`);
        }
      } else {
        if (!completadoEn) {
          console.log(`${i + 1}. ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export { Tareas };
