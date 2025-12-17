# Bug Report Formatter with AI

Portal web para formatear bug reports de Fortnite utilizando IA (Groq API) para generar automáticamente campos de Jira.

## Características

- **Formulario Inteligente**: Captura información del bug de forma estructurada
- **Generación con IA**: Utiliza Groq API (Llama 3.3 70B) para generar:
  - Summary optimizado con tags
  - Severity level (1-4)
  - Steps to Reproduce detallados
  - Description completa con secciones requeridas
  - Component/s sugerido
- **Copy to Clipboard**: Copia individual de campos o reporte completo
- **Validación**: Asegura que todos los campos requeridos estén presentes
- **UI Moderna**: Interfaz limpia con Tailwind CSS

## Stack Tecnológico

- React 18
- Vite
- Groq SDK
- Tailwind CSS
- React Hook Form
- React Hot Toast

## Instalación

1. Clona el repositorio:
```bash
cd bug-report-formatter
```

2. Instala dependencias:
```bash
npm install
```

3. Configura tu API key de Groq:
```bash
cp .env.example .env
```

4. Edita `.env` y agrega tu API key:
```
VITE_GROQ_API_KEY=tu_api_key_aqui
```

Puedes obtener una API key gratuita en: https://console.groq.com

## Uso

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

3. Completa el formulario con información del bug:
   - **Campos Manuales**: Plataformas, modos de juego, datos técnicos
   - **Campos para IA**: Descripción del bug, acciones, ubicación

4. Haz clic en "Generate Bug Report with AI"

5. Revisa los campos generados y copia al clipboard:
   - Copia campos individuales
   - Copia reporte completo formateado para Jira

## Campos del Formulario

### Información Básica
- Project (FORT)
- How Found (Playtesting, Automation, etc.)
- Test Team
- Branch Found In
- Found CL
- Reproduction Rate (formato: X/Y)

### Plataformas
- Platforms Tested (multi-select)
- Platforms (donde ocurre el bug)
- Device Specs (presets o custom)

### Experiencias
- Battle Royale, Sparks, Juno, LEGO, Festival, etc.

### Descripción del Bug (para IA)
- **Bug Description**: Descripción detallada del problema
- **What Were You Doing?**: Acciones que realizabas
- **Where Did It Happen?**: Ubicación específica
- **Workaround**: Solución temporal (opcional)

### Detalles Técnicos (opcional)
- Callstack
- Command Line Arguments

## Campos Generados por IA

### Summary
Formato: `[TAG] Descripción - Modo - Condiciones`
- Máximo 120 caracteres
- Tags: [NCL], [Crash], [CDE], [MME], etc.

### Severity
Niveles 1-4:
1. Game Breaker
2. Major Function
3. Minor Function
4. Superficial

### Steps to Reproduce
- Numerados y específicos
- Verbos en imperativo
- Incluye ACTUAL RESULT y EXPECTED RESULT

### Description
Secciones requeridas:
- REPRO RATE PLATFORMS
- WORKAROUND
- NOTES
- IMPACT
- SEARCH TERMS
- DEVICE SPECS

### Component/s
Sugerencia automática basada en el bug:
- BR - Animation
- BR - Gameplay
- BR - UI
- Juno, Sparks, LEGO, etc.

## Estructura del Proyecto

```
src/
├── components/
│   ├── BugReportForm.jsx          # Formulario principal
│   ├── AIGeneratedOutput.jsx      # Vista de output generado
│   ├── LoadingSpinner.jsx         # Indicador de carga
│   └── FormFields/
│       ├── TextInput.jsx
│       ├── TextArea.jsx
│       ├── Select.jsx
│       └── MultiSelect.jsx
├── services/
│   └── groqService.js             # Integración con Groq API
├── constants/
│   └── jiraFields.js              # Definiciones de campos Jira
└── App.jsx                        # Componente principal
```

## Personalización de Prompts

Los prompts de IA se pueden ajustar en [groqService.js](src/services/groqService.js):

- `generateSummary()`: Genera el Summary
- `generateSeverity()`: Determina la severidad
- `generateSteps()`: Crea Steps to Reproduce
- `generateDescription()`: Escribe la Description
- `suggestComponent()`: Sugiere el Component

## Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en `dist/`

## Deploy

### Netlify/Vercel
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agrega variable de entorno: `VITE_GROQ_API_KEY`

### Consideraciones de Seguridad
⚠️ **IMPORTANTE**: Este proyecto usa `dangerouslyAllowBrowser: true` para permitir llamadas a Groq desde el cliente. Para producción, considera:

1. Crear un backend proxy que maneje las llamadas a Groq
2. No exponer tu API key en el cliente
3. Implementar rate limiting

## Mejoras Futuras

- [ ] Historial de reportes generados (LocalStorage)
- [ ] Plantillas guardadas
- [ ] Edición post-generación de campos
- [ ] Dark mode
- [ ] Exportar a JSON/PDF
- [ ] Integración directa con Jira API
- [ ] Backend para manejar API keys de forma segura

## Troubleshooting

### Error: "VITE_GROQ_API_KEY is not defined"
- Asegúrate de crear el archivo `.env` en la raíz del proyecto
- La variable debe comenzar con `VITE_` para ser accesible en Vite
- Reinicia el servidor de desarrollo después de crear `.env`

### Los campos generados no tienen sentido
- Ajusta los prompts en `groqService.js`
- Proporciona más contexto en los campos de descripción
- Prueba con diferentes valores de `temperature`

### La generación es muy lenta
- Groq suele responder en 2-5 segundos
- Verifica tu conexión a internet
- Considera usar modelos más pequeños si es necesario

## Licencia

MIT

## Autor

Creado para optimizar el flujo de trabajo de QA en Fortnite
