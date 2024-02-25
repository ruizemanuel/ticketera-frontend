# Ticketera App

Esta es una aplicación web full-stack construida con React 18, Laravel 10 y MySQL como base de datos. La aplicación permite gestionar tickets, visualizarlos, crear nuevos, modificarlos y asignar un gif de GIPHY acorde al nivel de dificultad del ticket. Además, incluye funcionalidades de filtrado por fecha, estado y dificultad para facilitar la organización de los tickets.

URL del proyecto: https://ticketera-emanuelruiz.netlify.app/

## Características

- **Redux:** El frontend utiliza Redux para gestionar el estado de la aplicación de manera centralizada, facilitando la administración de datos y acciones.

- **Axios:** Se utiliza Axios para realizar solicitudes HTTP, permitiendo una comunicación eficiente entre el frontend y el backend de la aplicación.

- **Bootstrap:** La interfaz de usuario está diseñada con Bootstrap para lograr un diseño moderno y responsivo, mejorando la experiencia del usuario.

- **React Router DOM:** La navegación entre páginas se gestiona con React Router DOM, proporcionando una experiencia de usuario fluida y sin recargas de página.

- **Integración de API de GIPHY:** El frontend utiliza la API de GIPHY para asignar automáticamente un gif según el nivel de dificultad seleccionado
por el usuario.


## Requisitos Previos 

Asegúrate de tener las siguientes herramientas y dependencias instaladas en tu sistema antes de ejecutar la aplicación: 

- [Node.js](https://nodejs.org/) (v16.0.0 o superior)
- [Visual Studio Code](https://code.visualstudio.com/download) (opcional pero recomendado)

## Configuración del backend 
Sigue los pasos para ejecutar el backend en este enlace: 

https://github.com/ruizemanuel/ticketera-backend/blob/emanuel-ruiz/README.md


## Uso del Frontend  

1. Clonar o descargar el proyecto.
2. Abre Visual Studio Code y abre la carpeta del proyecto frontend de la Ticketera.
3. Crear un archivo llamado .env en la raiz del proyecto con estos datos:
`VITE_REACT_APP_API_TICKETS=http://localhost:8000/api/v1/tickets`

VITE_REACT_APP_API_KEY_GIPHY=*Tu API KEY personal de Giphy (puedes generarla [aqui](https://developers.giphy.com/))*
4. Abre una terminal en Visual Studio Code o utiliza tu terminal preferida.
5. Instala las dependencias utilizando npm:
`npm install`
6. Inicia la aplicación:
`npm run dev`
7. Accede a la aplicación ingresando a http://localhost:5173/ desde tu navegador web.


## Autor

👤 **Ruiz, Jose Emanuel**

* GitHub: [ruizemanuel](https://github.com/ruizemanuel)
