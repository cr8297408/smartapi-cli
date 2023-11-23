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
import { OPTIONS, TYPE_PROYECT } from './domain/commands.js';
import { GenerateRouter } from './generators/express.mvc.js';
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
  const qs: inquirer.QuestionCollection<any> = [
    {
      name: 'firstOpt',
      type: 'list',
      message: 'Selecciona tu caso',
      choices: ["Crear proyecto desde 0 💡", "Ya tengo un proyecto generado con smartapi ☺️"],
      filter(val: string) {
        if(val === "Crear proyecto desde 0 💡") {
          return TYPE_PROYECT.NEW
        }
        return TYPE_PROYECT.EXISTING
      },
    },
    {
      name: 'name',
      type: 'input',
      message: "Escribe el nombre de tu proyecto ☺️",
      default: "smartapi_new_proyect",
      when: (answers: any) => answers.firstOpt === TYPE_PROYECT.NEW
    },
    {
      name: 'selectGenerateOpt',
      type: 'list',
      message: 'Selecciona que deseas hacer',
      choices: ["Generar ruta"],
      filter(val: string) {
        if(val === "Generar ruta") {
          return OPTIONS.GENERATE_ROUTE
        }
      },
    },
  ];

  return inquirer.prompt(qs);
};

const InitProjectMVC = (data: any) => {
  try {
    if (data?.firstOpt === TYPE_PROYECT.NEW) {
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
        console.log(`
          ------ CREADO CORRECTAMENTE ------\n
          Se ha creado el siguiente projecto\n
          - Nombre: ${chalk.blue.bold(data.name)}\n
          - P.Arquitectura: Modelo Vista Controlador
          Recuerda reemplazar el origin del repositorio en git a tu repositorio remoto ☺️!!!
          ----------------------------------\n
        `);
      });
    }
    if(data?.firstOpt === TYPE_PROYECT.EXISTING) {
      if(data?.selectGenerateOpt === OPTIONS.GENERATE_ROUTE) {
        GenerateRouter({ name: "Prueba" });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// IIFE (Immediately Invoked Function Expression)
(async() => {
  msn('SMARTAPI');
  // createFile(await queryParams());
  InitProjectMVC(await queryParams());
})();