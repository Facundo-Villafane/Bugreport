# Bug Report Formatter - Electron App

Esta aplicación ahora puede ejecutarse como una aplicación de escritorio usando Electron.

## 🚀 Comandos Disponibles

### Desarrollo

```bash
# Ejecutar en modo desarrollo (con hot-reload)
npm run electron:dev
```

### Construir Ejecutable

```bash
# Construir para Windows (.exe)
npm run electron:build:win

# Construir para macOS (.dmg)
npm run electron:build:mac

# Construir para Linux (.AppImage y .deb)
npm run electron:build:linux

# Construir para todas las plataformas
npm run electron:build
```

## 📦 Resultado de la Construcción

Después de ejecutar `npm run electron:build:win`, encontrarás el instalador en:

```
bug-report-formatter/release/
  ├── Bug Report Formatter Setup 1.0.0.exe  (Instalador)
  └── win-unpacked/                         (Versión portable)
```

## 🎯 Cómo Usar

### Opción 1: Instalador (Recomendado)
1. Ejecuta `npm run electron:build:win`
2. Ve a la carpeta `release/`
3. Ejecuta `Bug Report Formatter Setup 1.0.0.exe`
4. Sigue el asistente de instalación
5. La aplicación se instalará y creará accesos directos

### Opción 2: Versión Portable
1. Ve a `release/win-unpacked/`
2. Ejecuta `Bug Report Formatter.exe` directamente
3. No requiere instalación

## ⚙️ Configuración del API Key

Antes de usar la aplicación, asegúrate de tener tu API key de Groq configurada:

1. Crea un archivo `.env` en la carpeta raíz del proyecto
2. Agrega tu API key:
   ```
   VITE_GROQ_API_KEY=tu_api_key_aqui
   ```
3. Reconstruye la aplicación para que incluya tu API key

## 🔧 Personalización

### Cambiar el Ícono

1. Reemplaza `public/icon.png` con tu propio ícono (debe ser PNG)
2. Para Windows NSIS, usa un archivo `.ico`
3. Para macOS, usa un archivo `.icns`

### Modificar la Configuración

Edita la sección `"build"` en `package.json` para cambiar:
- Nombre de la aplicación
- Directorio de salida
- Opciones del instalador
- Y más...

## 📝 Notas

- El primer build puede tardar varios minutos
- El archivo `.exe` resultante incluye Node.js y Chromium, por lo que será grande (~150-200 MB)
- La aplicación funcionará offline excepto para las llamadas a la API de Groq
