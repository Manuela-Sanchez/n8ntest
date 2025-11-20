# 🔧 Pasos para Arreglar tu Workflow Angie

Sigue estos pasos **en orden** para arreglar tu workflow actual.

---

## ✅ PASO 1: Arreglar el System Message (CRÍTICO)

### 1. Abre tu workflow en n8n
### 2. Haz clic en el nodo "Angie, AI Assistant 👩🏻‍🏫1"
### 3. Busca el campo "System Message"

**PROBLEMA ACTUAL:**
Tu System Message termina así y tiene texto extra:
```
...
Sistema listo. ¿Cómo puedo ayudarte hoy? Prueba /ayuda para ver comandos.
```

## **🚀 IMPLEMENTACIÓN PASO A PASO**   ← ESTO ESTÁ MAL

### **Orden de implementación recomendado:**
...
```

### 4. BORRA TODO el contenido del System Message
### 5. COPIA Y PEGA exactamente esto:

```
Eres Angie, asistente virtual inteligente de IA Avanza con capacidades avanzadas de planificación.

📅 FECHA Y HORA ACTUAL: {{ $now.format('DD/MM/YYYY HH:mm') }}
📍 UBICACIÓN: Toledo, España
🏢 EMPRESA: IA Avanza - Transformación Digital

===================
⚡ TUS CAPACIDADES
===================

GESTIÓN DE AGENDA:
- Ver citas y eventos programados
- Crear nuevas citas en el calendario
- Modificar citas existentes
- Cancelar eventos
- Buscar disponibilidad

GESTIÓN DE TAREAS:
- Consultar tareas pendientes
- Ver tareas por prioridad o fecha
- Buscar tareas específicas

GESTIÓN DE CLIENTES:
- Buscar información de clientes
- Ver historial de interacciones
- Consultar proyectos activos por cliente

GESTIÓN FINANCIERA:
- Consultar facturas (pendientes, cobradas, vencidas)
- Ver presupuestos y ventas

COMUNICACIONES:
- Leer emails no leídos de Gmail
- Buscar información de contacto

===================
📋 COMANDOS RÁPIDOS
===================

/hoy → Resumen del día (citas + tareas urgentes)
/semana → Vista semanal
/pendientes → Tareas y facturas pendientes
/cliente [nombre] → Información de cliente
/ayuda → Listar todos los comandos

===================
💡 INSTRUCCIONES
===================

1. **Sé proactiva**: Ofrece información relevante sin que la pidan
2. **Sé clara**: Usa formato Markdown para mejor legibilidad
3. **Sé precisa**: Verifica datos antes de responder
4. **Sé útil**: Sugiere acciones siguientes

FORMATO DE RESPUESTAS:

Para citas del día:
📅 **CITAS HOY (DD/MM)**
━━━━━━━━━━━━━━
🕐 HH:MM - Cliente/Asunto
🕐 HH:MM - Cliente/Asunto

Para tareas:
📋 **TAREAS PENDIENTES**
━━━━━━━━━━━━━━
🔴 Urgente: [tarea]
🟡 Importante: [tarea]

Para facturas:
💰 **FACTURAS**
━━━━━━━━━━━━━━
⚠️ Pendientes: X facturas - X,XXX€
✅ Cobradas este mes: X,XXX€

===================
⚠️ IMPORTANTE
===================

- Siempre usa el formato YYYY-MM-DDTHH:mm:ss para fechas en herramientas
- Confirma antes de eliminar o modificar datos
- Si no estás segura, pregunta antes de ejecutar
- Usa las herramientas apropiadas para cada tarea

---
¡Lista para ayudarte! ¿Qué necesitas?
```

### 6. IMPORTANTE: Verifica que NO haya nada después de "¿Qué necesitas?"
### 7. Haz clic en "Save" (Guardar)

---

## ✅ PASO 2: Arreglar el Flujo (Desconectar Planificacion Inteligente)

### 1. Busca el nodo "Planificacion Inteligente1"
### 2. Verás que está conectado entre "Get Voice File1" y "Angie, AI Assistant"

**PROBLEMA:** Este nodo ejecuta código antes de que el Agent procese el mensaje.

### 3. ELIMINA la conexión de "Get Voice File1" a "Planificacion Inteligente1"
   - Haz clic en la línea que los conecta
   - Presiona Delete o Backspace

### 4. CONECTA directamente: "Get Voice File1" → "Speech to Text1"

**El flujo debe quedar así:**

```
Get Voice File1
    ↓
Speech to Text1
    ↓
Angie, AI Assistant
```

### 5. Deja el nodo "Planificacion Inteligente1" desconectado (por ahora)
### 6. Haz clic en "Save" (Guardar)

---

## ✅ PASO 3: Reducir Herramientas a 8

**PROBLEMA:** Tienes 15+ herramientas conectadas. El Agent se confunde.

### Herramientas a DESCONECTAR (temporalmente):

1. **"Subtareas1"**
   - Haz clic en el nodo
   - Busca la línea "ai_tool" que va al Agent
   - Elimina la conexión

2. **"Alertas1"**
   - Elimina la conexión ai_tool al Agent

3. **"Gastos1"**
   - Elimina la conexión ai_tool al Agent

4. **"Control Ventas1"**
   - Elimina la conexión ai_tool al Agent

5. **"Gestión de proyectos activos1"**
   - Elimina la conexión ai_tool al Agent

6. **"Gestión de citas y reuniones1"**
   - Elimina la conexión ai_tool al Agent

7. **"Contacts1"**
   - Elimina la conexión ai_tool al Agent

### Herramientas que DEBEN QUEDAR CONECTADAS (8 total):

✅ 1. Ver citas1 (Google Calendar)
✅ 2. TOOL Crear un evento1 (Google Calendar)
✅ 3. TOOL Modificar Evento1 (Google Calendar)
✅ 4. Eliminar cita1 (Google Calendar)
✅ 5. Base de datos Clientes1 (Baserow)
✅ 6. Tareas1 (Baserow)
✅ 7. Control Facturas1 (Baserow)
✅ 8. Get Email1 (Gmail)

### Haz clic en "Save" (Guardar)

---

## ✅ PASO 4: Mejorar Descripciones de Herramientas Baserow

### 4.1 Arreglar "Tareas1"

1. Haz clic en el nodo "Tareas1"
2. Busca el campo "Tool Description"
3. BORRA el contenido actual
4. PEGA esto:

```
Consultar tareas pendientes, urgentes o completadas. Usa para '¿Qué tareas tengo?', 'tareas urgentes', 'tareas de hoy', 'tareas pendientes'. Devuelve información de tareas con estado, prioridad y fechas.
```

### 4.2 Arreglar "Base de datos Clientes1"

1. Haz clic en el nodo "Base de datos Clientes1"
2. Busca el campo "Tool Description"
3. BORRA el contenido actual
4. PEGA esto:

```
Buscar, consultar y listar información de clientes de IA Avanza. Usa cuando necesites datos de clientes, contactos o historial. Ejemplos: 'Busca el cliente TechCorp', 'Info de todos los clientes', 'Contacto de María'.
```

### 4.3 Arreglar "Control Facturas1"

1. Haz clic en el nodo "Control Facturas1"
2. Busca el campo "Tool Description"
3. BORRA el contenido actual
4. PEGA esto:

```
Buscar facturas emitidas, pendientes de cobro o cobradas. Usa para consultas sobre facturación, cobros y pagos. Ejemplos: 'Facturas pendientes', 'Facturas del mes', 'Busca factura 2025-001'.
```

### 4.4 Arreglar "Gestión de citas y reuniones1" (SI ESTÁ CONECTADA)

Si dejaste esta herramienta conectada:

1. Haz clic en el nodo
2. Busca el campo "Tool Description"
3. BORRA el contenido actual
4. PEGA esto:

```
Consultar detalles de citas guardadas en base de datos. Complementa la información del calendario de Google. Usa para buscar historial de reuniones pasadas.
```

### Haz clic en "Save" (Guardar)

---

## ✅ PASO 5: Verificar el Flujo Final

Tu workflow debe verse así:

```
FLUJO PRINCIPAL:
━━━━━━━━━━━━━━━━

Listen for incoming events1 (Telegram Trigger)
    ↓
Voice or Text1 (Set)
    ↓
If1 (¿Es voz?)
    ↓ SÍ                    ↓ NO
Get Voice File1         [salta directo]
    ↓                           ↓
Speech to Text1                 ↓
    ↓                           ↓
    └────────────┬──────────────┘
                 ↓
    Angie, AI Assistant 👩🏻‍🏫1
                 ↓
         Telegram1 (Respuesta)


HERRAMIENTAS CONECTADAS (AI Tool):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. OpenAI Chat Model1 → [ai_languageModel] → Agent
2. Window Buffer Memory1 → [ai_memory] → Agent
3. Ver citas1 → [ai_tool] → Agent
4. TOOL Crear un evento1 → [ai_tool] → Agent
5. TOOL Modificar Evento1 → [ai_tool] → Agent
6. Eliminar cita1 → [ai_tool] → Agent
7. Base de datos Clientes1 → [ai_tool] → Agent
8. Tareas1 → [ai_tool] → Agent
9. Control Facturas1 → [ai_tool] → Agent
10. Get Email1 → [ai_tool] → Agent


NODOS DESCONECTADOS:
━━━━━━━━━━━━━━━━━━

- Planificacion Inteligente1 (sin conexiones)
- Subtareas1 (sin conexión ai_tool)
- Alertas1 (sin conexión ai_tool)
- Gastos1 (sin conexión ai_tool)
- Control Ventas1 (sin conexión ai_tool)
- Gestión de proyectos activos1 (sin conexión ai_tool)
- Gestión de citas y reuniones1 (sin conexión ai_tool)
- Contacts1 (sin conexión ai_tool)
```

---

## ✅ PASO 6: Guardar y Activar

### 1. Haz clic en "Save" (Guardar) - IMPORTANTE
### 2. Verifica que el workflow se guardó correctamente
### 3. Activa el workflow:
   - Toggle en la esquina superior derecha
   - Debe cambiar de "Inactive" a "Active" (verde)

---

## ✅ PASO 7: Probar el Workflow

### Prueba 1: Test Básico
```
Telegram → "Hola Angie"
Esperado: Mensaje de bienvenida
```

### Prueba 2: Test Google Calendar
```
Telegram → "¿Qué citas tengo hoy?"
Esperado: Lista de eventos de hoy o "No tienes citas hoy"
```

### Prueba 3: Test Baserow (Tareas)
```
Telegram → "Muéstrame las tareas pendientes"
Esperado: Lista de tareas desde Baserow
```

### Prueba 4: Test Comando Rápido
```
Telegram → "/hoy"
Esperado: Resumen del día con citas y tareas
```

### Prueba 5: Test Creación de Evento
```
Telegram → "Agenda una reunión con Juan mañana a las 10:00"
Esperado: Confirmación de evento creado
```

---

## 🆘 Si Algo Falla

### Si el Agent no responde:
1. Ve a n8n → "Executions" (barra lateral)
2. Busca la ejecución más reciente
3. Haz clic en ella
4. Busca el nodo con error (rojo)
5. Lee el mensaje de error

### Errores Comunes:

**Error: "Invalid system message"**
→ Revisa que el System Message esté completo y sin caracteres raros

**Error: "Tool X failed"**
→ Verifica que la credencial esté configurada en esa herramienta

**Error: "Execution timeout"**
→ Tienes demasiadas herramientas, desconecta más

**Agent no usa herramientas**
→ Verifica las descripciones de las herramientas

---

## ✅ Checklist Final

Antes de dar por terminado, verifica:

- [ ] System Message termina en "¿Qué necesitas?" sin nada después
- [ ] Planificacion Inteligente1 está desconectado
- [ ] Solo 8-10 herramientas conectadas al Agent
- [ ] Descripciones de Baserow mejoradas (Tareas, Clientes, Facturas)
- [ ] Workflow guardado
- [ ] Workflow activado (toggle verde)
- [ ] Prueba 1 (Hola Angie) funcionó ✅
- [ ] Prueba 2 (Citas) funcionó ✅
- [ ] Prueba 3 (Tareas) funcionó ✅

---

## 🎯 Resumen de Cambios

| Antes | Después |
|-------|---------|
| System Message con código extra | System Message limpio |
| 15+ herramientas | 8 herramientas esenciales |
| "Get many rows in Baserow" | "Consultar tareas pendientes..." |
| Planificacion en flujo principal | Planificacion desconectada |
| Agent confundido ❌ | Agent funcional ✅ |

---

**¡Sigue estos pasos en orden y tu Angie funcionará perfectamente!** 🚀

Si tienes algún error, compártelo y te ayudo a resolverlo.
