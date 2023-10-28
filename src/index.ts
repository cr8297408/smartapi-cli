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
import { exec } from 'child_process';
// import { GenerateRouter } from './generators/express.mvc.js';
const pathBase = process.cwd();

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
  const qs = [
    {
      name: 'name',
      type: 'input',
      message: 'Escribe el nombre de tu projecto'
    },
  ];

  return inquirer.prompt(qs);
};

// Método que se encarga de crear el fichero en base a las preguntas realizadas
// const createFile = (data: any) => {
//   try {
//     const file = GenerateRouter({ name: data.name });
//     console.log("🚀 ~ file: test.ts:59 ~ createFile ~ fileCreated:", file);
//   } catch(err) {
//     console.error(err);
//   } finally {
//     console.log(`
//       ------ CREADO CORRECTAMENTE ------\n
//       Se ha creado el siguiente elemento\n
//       - Tipo: ${chalk.blue.bold(data.type)}\n
//       - Ruta: ${chalk.blue.bold(data)}\n
//       ----------------------------------\n
//     `);
//   }
// }

const InitProjectMVC = (data: any) => {
  try {
    // Comando que quieres ejecutar
    const comando = `mkdir ${data.name} && git clone https://github.com/cr8297408/smartapi-template.mvc.git ${data.name}`;
  
    // Ejecutar el comando
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el comando: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error en la salida estándar del comando: ${stderr}`);
        return;
      }
      console.log(`Salida del comando:\n${stdout}`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`
      ------ CREADO CORRECTAMENTE ------\n
      Se ha creado el siguiente projecto\n
      - Nombre: ${chalk.blue.bold(data.name)}\n
      - P.Arquitectura: Modelo Vista Controlador
      ----------------------------------\n
    `);
  }
}

// IIFE (Immediately Invoked Function Expression)
(async() => {
  msn('SMARTAPI');
  // createFile(await queryParams());
  InitProjectMVC(await queryParams());
})();