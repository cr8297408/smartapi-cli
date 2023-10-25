#!/usr/bin/env node
/* 
  La linea anterior es una instancia de una línea shebang: 
  la primera línea en un archivo ejecutable de texto sin formato en plataformas tipo Unix 
  que le dice al sistema a qué intérprete pasar ese archivo para su ejecución, 
  a través del comando línea siguiendo el prefijo máfico #! (llamado shebang).
  En Windows no admite líneas shebang, por lo que se ignoran allí; 
  en Windows, es únicamente la extensión del nombre de archivo de un archivo determinado 
  lo que determina qué ejecutable lo interpretará. 
  Sin embargo, aún los necesita en el contexto de npm.
*/
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from "inquirer";
import fs from 'fs';
const pathBase = process.cwd();

// Template que usaremos para la creación del contenido del fichero
import template from './templates/templateVUE.js';

// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn: any) => {
  console.log(chalk.bold.cyan(figlet.textSync(msn, { 
    font:  'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));
}

// Preguntas que se van a realizar y que más tarde usaremos
const queryParams = () => {
  const qs = [{
      name: 'componentName',
      type: 'input',
      message: 'Escribe el nombre del componente'
    },{
      name: 'fileName',
      type: 'input',
      message: 'Escribe el nombre del fichero: '
    }, {
      name: 'type',
      type: 'list',
      message: 'Selecciona el tipo de elemento a crear: ',
      choices: [
        'Components',
        'Views',
        'Layouts',
        'Models',
        'Javascript',
      ],
    },
  ];

  return inquirer.prompt(qs);
};

// Método que se encarga de crear el fichero en base a las preguntas realizadas
const createFile = (data: any) => {
  const extension = data.type === 'Javascript' ? 'js' : 'vue'
  const path = `${pathBase}\\src\\${data.type}`;
  const file = `${path}\\${data.fileName}.${extension}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, 0o777);
  }
  try {
    const filetem = template.replace('$name', data.componentName);
    fs.writeFileSync(file, filetem, { mode: 0o777 });
  } catch(err) {
    console.error(err);
  } finally {
    console.log(`
      ------ CREADO CORRECTAMENTE ------\n
      Se ha creado el siguiente elemento\n
      - Tipo: ${chalk.blue.bold(data.type)}\n
      - Ruta: ${chalk.blue.bold(file)}\n
      ----------------------------------\n
    `);
  }
}

// IIFE (Immediately Invoked Function Expression)
(async() => {
  msn('MTM-CLI');
  createFile(await queryParams());
})();