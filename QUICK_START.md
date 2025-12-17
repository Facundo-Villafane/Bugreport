# Quick Start Guide

## 1. Obtén tu API Key de Groq

1. Ve a https://console.groq.com
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Crea una nueva API key
5. Copia la key (la necesitarás en el siguiente paso)

## 2. Configura el proyecto

```bash
# Crea el archivo .env
cp .env.example .env
```

Edita el archivo `.env` y pega tu API key:
```
VITE_GROQ_API_KEY=gsk_tu_api_key_aqui
```

## 3. Inicia el servidor

```bash
npm run dev
```

Abre tu navegador en: http://localhost:5173

## 4. Ejemplo de uso

### Datos de ejemplo para probar:

**Platforms**: PS5, PC
**Platforms Tested**: PS5, PC, XSX
**How Found**: Playtesting
**Experiences Impacted**: Battle Royale
**Reproduction Rate**: 5/10

**Bug Description**:
```
The game crashes to desktop when trying to open the inventory while riding a vehicle
in Battle Royale. The crash happens consistently on PS5 and PC but seems random on Xbox.
```

**What Were You Doing?**:
```
I was riding a car in Battle Royale, trying to open my inventory to swap weapons
while moving at high speed near Mega City.
```

**Where Did It Happen?**:
```
In Battle Royale match, specifically near Mega City POI, while in a vehicle moving
at high speed on the main road.
```

**Found CL**: 38925561
**Branch Found In**: ++Fortnite+Main

### Resultado esperado:

La IA generará automáticamente:
- **Summary**: [Crash] Inventory Open Crashes Game - Battle Royale - In Vehicle
- **Severity**: 1 (Game Breaker)
- **Steps to Reproduce**: Pasos detallados y numerados
- **Description**: Con todas las secciones requeridas
- **Component**: BR - Gameplay - Interaction

## 5. Copiar al Jira

1. Revisa los campos generados
2. Haz clic en "Copy Complete Report" para copiar todo
3. O copia campos individuales según necesites
4. Pega en tu ticket de Jira

## Troubleshooting

### El botón "Generate" no hace nada
- Verifica que completaste todos los campos requeridos (marcados con *)
- Abre la consola del navegador (F12) para ver errores

### Error de API Key
- Asegúrate de que tu `.env` tenga la variable `VITE_GROQ_API_KEY`
- Reinicia el servidor de desarrollo después de crear/editar `.env`
- Verifica que la API key sea válida en https://console.groq.com

### Los campos generados están vacíos
- Verifica tu conexión a internet
- Revisa la consola del navegador para errores de API
- Verifica que tu API key tenga créditos disponibles

## Atajos útiles

- Completa el formulario y presiona `Ctrl/Cmd + Enter` para generar (si está implementado)
- Usa `Tab` para navegar entre campos
- Los campos multi-select permiten búsqueda escribiendo

## Próximos pasos

1. Guarda el proyecto en Git
2. Personaliza los prompts en `src/services/groqService.js` según tus necesidades
3. Ajusta las opciones de plataformas/categorías en `src/constants/jiraFields.js`
4. Considera deployar a Vercel/Netlify para acceso desde cualquier lugar

---

¿Necesitas ayuda? Abre un issue en el repositorio o consulta el README.md completo.
