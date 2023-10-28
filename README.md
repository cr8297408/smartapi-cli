# Generador de Codigo backend

Este es un generador de Codigo backend que utiliza la librería `generate-template-files` y plantillas preconfiguradas para agilizar el desarrollo.

## Requisitos

Asegúrate de tener Node.js y npm instalados en tu sistema antes de usar este generador.

## Instalación

1. Clona o descarga este repositorio en tu máquina local.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```

4. Para correr en modo desarrollo utiliza el comando

   ```bash
   npm run dev
   ```

## Dependencias de Producción (dependencies)

### figlet (v1.7.0)

- Figlet es una biblioteca que permite la generación de texto en arte ASCII a partir de texto plano. Puede ser útil para crear gráficos de texto llamativos en aplicaciones de línea de comandos.

### generate-template-files (v3.2.1)

- Este paquete facilita la generación de archivos de plantilla en proyectos. Puede ser útil para crear archivos y directorios de manera programática.

### inquirer (v9.0.2)

- Inquirer es una biblioteca de Node.js que simplifica la creación de interfaces de línea de comandos interactivas. Es ampliamente utilizada para la interacción con usuarios en aplicaciones de línea de comandos.

### lowdb (v3.0.0)

- Lowdb es una base de datos JSON ligera que se utiliza para el almacenamiento y manipulación de datos. Es útil en aplicaciones que requieren una base de datos simple y fácil de usar.

Estas dependencias son fundamentales para el desarrollo y funcionamiento de tu proyecto. Asegúrate de mantenerlas actualizadas y de revisar regularmente las nuevas versiones disponibles para aprovechar las mejoras y correcciones de errores.

## Dependencias de Desarrollo (devDependencies)

### @types/figlet (v1.5.7)

- Este paquete proporciona tipos de TypeScript para la biblioteca Figlet, lo que facilita el desarrollo de aplicaciones TypeScript que utilizan Figlet para generar arte de texto.

### @types/inquirer (v8.2.1)

- Este paquete ofrece tipos de TypeScript para Inquirer, una biblioteca popular para crear interfaces de línea de comandos interactivas. Facilita el desarrollo de aplicaciones TypeScript que utilizan Inquirer.

### @types/lowdb (v1.0.11)

- Proporciona tipos de TypeScript para Lowdb, una base de datos ligera basada en JSON. Esto mejora la autocompletación y la detección de errores al interactuar con Lowdb en proyectos TypeScript.

### @typescript-eslint/eslint-plugin (v6.9.0)

- Este es un complemento para ESLint que habilita reglas específicas para TypeScript. Ayuda a mantener un código limpio y libre de errores en proyectos TypeScript.

### @typescript-eslint/parser (v6.9.0)

- Proporciona un analizador de TypeScript para ESLint, permitiendo la verificación de código TypeScript según las reglas de ESLint. Es esencial para un análisis estático efectivo del código TypeScript.

### eslint (v8.52.0)

- ESLint es una herramienta de análisis estático de código que ayuda a mantener un código limpio y consistente. Las reglas específicas para TypeScript se configuran utilizando los paquetes anteriores.

### ts-node (v10.9.1)

- Ts-node es una herramienta que permite ejecutar archivos TypeScript directamente en Node.js sin necesidad de compilarlos previamente. Facilita el desarrollo y la depuración en entornos de TypeScript.

### typescript (v4.7.4)

- TypeScript es un superconjunto de JavaScript que agrega tipado estático a la ecuación. Es esencial para el desarrollo de aplicaciones en TypeScript y se integra con las otras herramientas de desarrollo mencionadas anteriormente.
