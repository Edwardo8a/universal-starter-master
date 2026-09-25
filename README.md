# Universal Starter - Angular & Firebase PWA

Proyecto Angular Universal (Server-Side Rendering) integrado con Firebase Authentication, AngularFire y componentes modulares de Registro, Login y Tareas.

---

## 🚀 Requisitos previos

Este proyecto utiliza **Angular 7** y dependencias heredadas, por lo que requiere **Node.js v12**:

* **Node.js:** `v12.22.12` (gestionado con [NVM for Windows](https://github.com/coreybutler/nvm-windows))
* **NPM:** `v6.14.16`

El proyecto incluye un archivo `.nvmrc` para que NVM conmute automáticamente a la versión correspondiente:
```bash
nvm use 12.22.12
```

---

## 📦 Instalación

Para instalar las dependencias omitiendo scripts nativos incompatibles:

```bash
npm install --ignore-scripts
```

---

## 🛠️ Ejecución en Desarrollo

Para iniciar el servidor de desarrollo en modo cliente:

```bash
npm start
```
O bien:
```bash
ng serve
```

Una vez compilado, abre en tu navegador:
👉 [http://localhost:4200](http://localhost:4200)

---

## ⚡ Construcción y Server-Side Rendering (SSR)

* **Compilar bundles de cliente y servidor:**
  ```bash
  npm run build:ssr
  ```

* **Iniciar el servidor Express SSR:**
  ```bash
  npm run serve:ssr
  ```

---

## 🧩 Estructura de Componentes Principales

* `src/app/home`: Vista principal.
* `src/app/login`: Componente de autenticación con Google mediante Firebase Auth.
* `src/app/register`: Formulario de registro de usuario.
* `src/app/task`: Componente y formulario para gestión de tareas.
* `src/app/services/auth.services.ts`: Servicio de autenticación con Firebase.
* `src/environments`: Configuración de entornos y credenciales del proyecto Firebase (`pwa-h-f57c7`).
