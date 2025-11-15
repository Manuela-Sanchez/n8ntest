# 🤖 Telegram Nutrition AI Assistant - Análisis de Workflow

## 📋 Estado del Proyecto

Este proyecto contiene herramientas para analizar y documentar workflows de n8n, específicamente para el asistente de nutrición de Telegram con Google Gemini AI.

---

## 🛠️ Herramientas Disponibles

### `analyze_workflow.py` - Analizador de Workflows

Script de análisis que proporciona información detallada sobre la estructura de cualquier workflow de n8n.

#### Uso

```bash
python analyze_workflow.py <archivo_workflow.json>
```

#### Información que Proporciona

- ✅ **Total de nodos** y distribución por tipo
- ✅ **Puntos de entrada** (triggers) del workflow
- ✅ **Análisis de conexiones** entre nodos
- ✅ **Credenciales utilizadas**
- ✅ **Nodos aislados** sin conexiones
- ✅ **Métricas de complejidad**
- ✅ **Recomendaciones** de mejoras

#### Ejemplo de Salida

```
══════════════════════════════════════════════════════════════════════
📊 ANÁLISIS DE WORKFLOW: Telegram Nutrition AI Assistant
══════════════════════════════════════════════════════════════════════

📝 INFORMACIÓN BÁSICA
  Nombre: Telegram Nutrition AI Assistant
  Total de nodos: 247

🔷 NODOS
  Tipos de nodos:
    • telegramTrigger: 5
    • switch: 5
    • googleSheets: 15
    • gemini: 20

🚪 PUNTOS DE ENTRADA (Triggers)
  1. Telegram Trigger1
  2. Telegram Trigger2
  3. Telegram Trigger3
  4. Telegram Trigger4
  5. Telegram Trigger5

🔗 CONEXIONES
  Total de conexiones: 312
  Nodos con conexiones: 235

🔐 CREDENCIALES UTILIZADAS
  telegramApi:
    • Telegram Bot Token
  googleSheetsOAuth2Api:
    • Google Sheets API Credentials
  geminiApi:
    • Google Gemini API Key
```

---

## 📂 ¿Qué Necesito?

Para poder analizar y documentar correctamente el workflow del asistente de nutrición, necesito:

1. **El archivo JSON del workflow** (`workflow.json` o similar)
2. **Descripción de cada trigger** - ¿Qué función específica cumple cada uno de los 5 Telegram Triggers?
3. **Objetivo del proyecto** - ¿Qué mejoras o cambios necesitas hacer?

---

## 🎯 Próximos Pasos

Una vez que tenga el archivo del workflow, podré:

1. ✅ Analizar la estructura completa
2. ✅ Documentar la función de cada componente
3. ✅ Identificar oportunidades de mejora
4. ✅ Crear guías de uso y configuración
5. ✅ Ayudar con cualquier modificación necesaria

---

## 📝 Notas

- El workflow utiliza **Google Gemini AI** para análisis de nutrición
- Se integra con **Telegram** como interfaz de usuario
- Almacena datos en **Google Sheets**
- Cada Telegram Trigger tiene una **función específica y diferenciada**

---

## 🚀 Cómo Empezar

```bash
# 1. Coloca tu archivo de workflow en este directorio
cp /ruta/al/workflow.json ./workflow.json

# 2. Ejecuta el análisis
python analyze_workflow.py workflow.json

# 3. Revisa el reporte generado
```

---

**Para continuar, necesito el archivo del workflow. Una vez lo tenga, podré proporcionar análisis y documentación precisos.** 📊
