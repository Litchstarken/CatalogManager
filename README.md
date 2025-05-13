# Aplicación Full Stack - Catálogo de Productos

## Descripción

Esta aplicación permite a los usuarios explorar y gestionar un catálogo de productos de manera intuitiva y eficiente. Está diseñada para ofrecer una experiencia de usuario fluida y un backend robusto.

## 🧱 Stack Tecnológico

- **Frontend**: Construido con Next.js y React para una interfaz modular y escalable, estilizado con TailwindCSS, y utilizando Apollo Client para la gestión de datos GraphQL.
- **Backend**: Desarrollado con Express y Apollo Server, implementando GraphQL como lenguaje de consulta y SQLite 3 como base de datos ligera y eficiente.
- **Compartido**: Uso de TypeScript para tipado estático, Git para control de versiones, Jest para pruebas unitarias, y herramientas como Vite para un entorno de desarrollo rápido.

## 🚀 Características Principales

### Frontend

- Interfaz de usuario responsiva
- Sistema de filtrado y búsqueda en tiempo real
- Carrito de compras interactivo
- Autenticación de usuarios

### Backend

- API GraphQL desarrollada en Node.js
- Base de datos SQLite 3
- Sistema de autenticación JWT
- Gestión de pedidos

## 🎯 Funcionalidades

- Registro y login de usuarios
- Exploración del catálogo
- Filtrado por categorías
- Gestión del carrito
- Proceso de checkout

## 📂 Estructura del Proyecto

```
├── 📁 frontend
│   ├── 📁 public
│   ├── 📁 src
│   │   ├── 📁 components (Componentes reutilizables de la interfaz)
│   │   ├── 📁 pages (Páginas principales de la aplicación)
│   │   ├── 📁 styles (Estilos globales y específicos)
│   │   ├── 📁 utils (Funciones auxiliares y utilidades)
│   │   └── index.tsx (Punto de entrada del frontend)
│   ├── package.json (Dependencias y scripts del frontend)
│   └── vite.config.ts (Configuración de Vite)
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 resolvers (Lógica de resolución de GraphQL)
│   │   ├── 📁 schemas (Definición de esquemas GraphQL)
│   │   ├── 📁 services (Servicios y lógica de negocio)
│   │   └── index.ts (Punto de entrada del backend)
│   ├── package.json (Dependencias y scripts del backend)
│   └── tsconfig.json (Configuración de TypeScript para el backend)
├── 📁 shared
│   ├── 📁 types (Definiciones de tipos compartidos)
│   ├── 📁 utils (Funciones compartidas entre frontend y backend)
│   └── tsconfig.json (Configuración de TypeScript para módulos compartidos)
├── 📄 README.md (Documentación del proyecto)
└── 📄 package.json (Dependencias y scripts generales del proyecto)
```

## 🛠️ Instalación y Uso

### Requisitos Previos

1. Asegúrate de tener instalado:
    - [Node.js](https://nodejs.org/) (versión 16 o superior)
    - [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
    - [Git](https://git-scm.com/)

2. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/FullStack-lab.git
    cd FullStack-lab
    ```

### Instalación

1. Instala las dependencias del frontend:
    ```bash
    cd frontend
    npm install
    ```

2. Instala las dependencias del backend:
    ```bash
    cd ../backend
    npm install
    ```

### Configuración

1. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables de entorno:
    ```env
    PORT=4000
    DATABASE_URL=file:./dev.db
    JWT_SECRET=tu_secreto
    ```

2. (Opcional) Configura las variables de entorno necesarias para el frontend si aplica.

### Uso

1. Inicia el backend:
    ```bash
    cd backend
    npm run dev
    ```

2. Inicia el frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```

3. Abre tu navegador y accede a `http://localhost:3000` para interactuar con la aplicación.

### Pruebas

1. Ejecuta las pruebas unitarias:
    ```bash
    cd backend
    npm test
    ```

    ```bash
    cd ../frontend
    npm test
    ```

### Despliegue

1. Sigue las instrucciones específicas para desplegar el frontend y backend en tu proveedor de hosting preferido (por ejemplo, Vercel, Heroku, AWS, etc.).

