import { resolve } from 'path';

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('======================');
    console.log('Seleccione una opción');
    console.log('======================\n');

    console.log(`1. Crear tarea`);
    console.log(`2. Listar tareas`);
    console.log(`3. Listar tareas completadas`);
    console.log(`4. Listar tareas pendientes`);
    console.log(`5. Completar tarea(s)`);
    console.log(`6. Borrar tarea(s)`);
    console.log(`0. Salir\n`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('Seleccione una opcion: ', (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('\nPresione ENTER para continuar\n', (opt) => {
      readLine.close();
      resolve();
    });
  });
};

export default {
  mostrarMenu,
  pausa,
};
