# Frontend - Sistema de Autenticación de Usuarios 🖥️

Este repositorio contiene la interfaz de usuario del sistema de autenticación desarrollado como parte del programa Full Stack de FUNVAL.

## 🧱 Tecnologías Utilizadas

- **React**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **SweetAlert2**
- **JWT** para autenticación
- **React Context + useReducer** para gestión de estado

## ⚙️ Características del Proyecto

- Registro e inicio de sesión de usuarios
- Validación de formularios y manejo de errores
- Autenticación mediante JWT
- Protección de rutas privadas
- Navegación simple y diseño responsivo

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
```

## 🚀 Instalación y Ejecución

### 1. Clona el repositorio:
```bash
git clone https://github.com/Sebastian-Luciano/proyecto-autenticacion-frontend.git
cd proyecto-autenticacion-frontend
```

### 2. Instala las dependencias:
```bash
npm install
```

### 3. Crea un archivo `.env` con la siguiente variable:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecuta el proyecto:
```bash
npm run dev
```

## 🔐 Autenticación

El sistema utiliza JWT para proteger las rutas del frontend. Al iniciar sesión exitosamente:

- El token se guarda en localStorage
- Se restringe el acceso a rutas protegidas
- Se mantiene la sesión del usuario autenticado

## 🧠 Autor

**Sebastián Javier Luciano Marceliano**  
🔗 [GitHub](https://github.com/Sebastian-Luciano)  
✉️ [sebastianperu7@gmail.com](mailto:sebastianperu7@gmail.com)

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso Full Stack Developer en FUNVAL.