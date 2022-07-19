import inquirer from 'inquirer';

const questions = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer?',
    choices: [
      { value: '1', name: '1. Crear tarea' },
      { value: '2', name: '2. Listar tareas' },
      { value: '3', name: '3. Listar tareas completadas' },
      { value: '4', name: '4. Listar tareas pendientes' },
      { value: '5', name: '5. Completar tarea(s)' },
      { value: '6', name: '6. Borrar tarea(s)' },
      { value: '0', name: '0. Salir' },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================');
  console.log('Seleccione una opción');
  console.log('======================\n');

  const { opcion } = await inquirer.prompt(questions);
  return opcion;
};

const confirmacion = async (message) => {
  const question = [{ type: 'confirm', name: 'ok', message }];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const pausa = async () => {
  const question = [
    { type: 'input', name: 'enter', message: 'Presione ENTER para continuar' },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. Cancelar',
  });

  const deleteQuestions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(deleteQuestions);
  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const completeQuestion = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(completeQuestion);
  return ids;
};

export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmacion,
  mostrarListadoChecklist,
};
