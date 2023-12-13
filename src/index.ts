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
import { GenerateController, GenerateModule, GenerateRouter } from './generators/express.mvc.js';
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
    // ? General options
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
      choices: ["Generar ruta", "Generar controlador", "Generar modulo", "Generar archivo de validación"],
      filter(val: string) {
        if(val === "Generar ruta") {
          return OPTIONS.GENERATE_ROUTE
        }
        if(val === "Generar controlador") {
          return OPTIONS.GENERATE_CONTROLLER
        }
        if(val === "Generar modulo") {
          return OPTIONS.GENERATE_MODULE
        }
        if(val === "Generar archivo de validación") {
          return OPTIONS.GENERATE_VALIDATION_FILE
        }
      },
    },
    // ? ROUTE OPTIONS
    {
      name: 'routeName',
      type: 'input',
      message: "Escribe el nombre de tu ruta (recuerda que si deseas generar una ruta par un controller llamado [HelloWorldController] el nombre que debes ingresar es HelloWorld) ☺️",
      default: "HelloWorld",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_ROUTE
    },
    {
      name: 'pathName',
      type: 'input',
      message: "Escribe el nombre del path para tu ruta☺️",
      default: "saludo",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_ROUTE
    },
    // ? CONTROLLER OPTIONS
    {
      name: 'controllerName',
      type: 'input',
      message: "Escribe el nombre de tu Controlador recuerda usar CamelCase 🤗 ejemplo: HelloWorld☺️",
      default: "HelloWorld",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_CONTROLLER
    },
    // ? MODULE OPTIONS
    {
      name: 'moduleName',
      type: 'input',
      message: "Escribe el nombre de tu modulo: ",
      default: "HelloWorld",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_MODULE
    },
    {
      name: 'pathName',
      type: 'input',
      message: "Escribe el nombre del path para tu ruta☺️",
      default: "saludo",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_MODULE
    },
    // ? VALIDATION FILES OPTIONS
    {
      name: 'validationName',
      type: 'input',
      message: "Escribe el nombre de tu interfaz (recuerda que debe estár en src/domain/models)",
      default: "CreateHelloWord",
      when: (answers: any) => answers.selectGenerateOpt === OPTIONS.GENERATE_VALIDATION_FILE
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
        GenerateRouter({ name: data?.routeName, path: data?.pathName?.replace(/\b\w/g, (l: string) => l.toUpperCase()) });
      }
      if(data?.selectGenerateOpt === OPTIONS.GENERATE_CONTROLLER) {
        GenerateController({ name: data?.controllerName });
      }
      if(data?.selectGenerateOpt === OPTIONS.GENERATE_MODULE) {
        GenerateModule({ name: data?.moduleName, path: data?.pathName?.replace(/\b\w/g, (l: string) => l.toUpperCase()) });
      }
      if(data?.selectGenerateOpt === OPTIONS.GENERATE_VALIDATION_FILE) {
        const name = data?.validationName
        // TODO: CHANGE ROUTE;
        const comando = `npx ts-to-zod src/domain/models/${name}.ts src/validation/${name}.ts`;
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
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// IIFE (Immediately Invoked Function Expression)
(async() => {
  msn('SMARTAPI');
  InitProjectMVC(await queryParams());
})();