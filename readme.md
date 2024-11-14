```markdown
# Task Management Frontend

Este es el frontend para la aplicación de gestión de tareas. La aplicación permite a los usuarios registrarse, iniciar sesión, crear etiquetas(Tags), crear una nueva tarea, actualizar tarea, eliminar tarea y filtrar y paginar las tareas, se consideró el manejo de grandes numeros de datos. Está construida con **React**, **TypeScript**, y utiliza **Zustand** para el manejo de estado, junto con **Axios** para la comunicación con la API backend.|

## Principales Tecnologías Usadas
- **TypeScript** Lenguaje de programación
- **React**  Librería de JavaScript para crear interfaces de usuario
- **Zustand** para el manejo del estado global
- **Axios** para las solicitudes HTTP
- **Material UI** para la interfaz de usuario
- **React Router** para la navegación en la aplicación
- **Vite** Empaquetador de React

## Requisitos Previos

- **Node.js** >= 14.x
- **NPM** o **Yarn**

## Configuración del Proyecto

1. Clona este repositorio:

   ```bash
   git clone https://github.com/sergiodm92/task-management-frontend.git
   cd task-management-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o si usas Yarn
   yarn install
   ```

3. Configura el archivo `.env`:

   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

   ```plaintext
   VITE_API_URL=http://localhost:3000/api
   ```

   Asegúrate de que `VITE_API_URL` apunte al endpoint correcto de tu API backend.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila la aplicación para producción en la carpeta `dist`.
- **`npm run preview`**: Previsualiza la compilación de producción.
- **`npm run lint`**: Ejecuta el linter para mantener el código limpio.

## Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```plaintext
task-management-frontend/
├── public/                # Archivos estáticos
├── src/
│   ├── api/               # Configuración de Axios y servicios de API
│   ├── components/        # Componentes reutilizables
│   ├── config/            # Configuración de la aplicación
│   ├── interfaces/        # Definiciones de tipos TypeScript
│   ├── pages/             # Páginas principales de la aplicación
│   ├── stores/            # Estados globales con Zustand
│   ├── App.tsx            # Componente principal de la aplicación
│   ├── main.tsx           # Punto de entrada
│   └── theme.ts           # Configuración del tema de Material UI
├── index.html             # Archivo HTML de la aplicación
├── package.json           # Archivo de configuración de Node.js
├── tsconfig.json           # Configuración de TypeScript
├── vite.config.ts         # Configuración de Vite
└── README.md              # Este archivo
```

## Funcionalidades

### Autenticación

- **Registro**: Crea una cuenta nueva.
- **Inicio de Sesión**: Inicia sesión para acceder a tus tareas.
- **Logout**: Cierra sesión y limpia todos los estados globales.

### Gestión de Tareas

- **Crear Tarea**: Agrega una nueva tarea con título, descripción, y etiquetas.
- **Actualizar Tarea**: Edita una tarea existente.
- **Eliminar Tarea**: Elimina una tarea.
- **Filtrar y Paginar Tareas**: Filtra por estado y etiquetas, y paginación para optimizar el manejo de grandes cantidades de datos.

### Estado Global

El manejo de estado se realiza con **Zustand**, que controla la autenticación del usuario y la lista de tareas. Los estados se reinician automáticamente al cerrar sesión.

## Interceptores de Axios

Se utilizan interceptores para manejar el token de autenticación en cada solicitud y redirigir al usuario a la página de inicio de sesión en caso de error 401.

