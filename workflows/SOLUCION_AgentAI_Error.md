# 🔧 Solución: AgentAI No Comunica con Herramientas

## 🚨 Problemas Identificados en tu Workflow

He analizado tu workflow y encontré **5 problemas críticos** que impiden que el AgentAI funcione correctamente:

---

## ❌ PROBLEMA 1: System Message Cortado y Mal Formateado

### El Issue:
Tu System Message termina abruptamente con:
```
...
Sistema listo. ¿Cómo puedo ayudarte hoy? Prueba /ayuda para ver comandos.
```

## **🚀 IMPLEMENTACIÓN PASO A PASO**

### **Orden de implementación recomendado:**
...
```

**Esto NO debería estar en el System Message.** Todo lo que aparece después de las comillas de cierre se interpreta como texto fuera del prompt, causando errores.

### ✅ Solución:
El System Message debe terminar ANTES de los comentarios de implementación:

```javascript
"systemMessage": "Eres Angie, asistente virtual inteligente de IA Avanza...\n\n---\nSistema listo. ¿Cómo puedo ayudarte hoy? Prueba /ayuda para ver comandos."
```

**NO incluir** los comentarios sobre implementación, checklist, etc.

---

## ❌ PROBLEMA 2: Conexión Incorrecta del Nodo "Planificacion Inteligente"

### El Issue:
El nodo "Planificacion Inteligente1" está conectado en el flujo principal:

```
Get Voice File → Planificacion Inteligente → Agent
```

Esto hace que:
1. El Agent **siempre** ejecute este código, incluso cuando no es necesario
2. El código se ejecuta **antes** de que el Agent procese la solicitud
3. Los datos pueden estar en formato incorrecto

### ✅ Solución:
**Opción A: Convertirlo en herramienta Code Tool**
Conecta el nodo directamente al Agent como herramienta AI:
```
Planificacion Inteligente (Code Tool) → [ai_tool] → Agent
```

**Opción B: Eliminarlo del flujo principal**
Solo conecta:
```
Get Voice File → Speech to Text → Agent
```

---

## ❌ PROBLEMA 3: Demasiadas Herramientas Simultáneas

### El Issue:
Tienes **15+ herramientas** conectadas al Agent:
- Contacts
- Get Email
- Ver citas
- Crear evento
- Modificar evento
- Eliminar cita
- Gestión citas
- Base datos Clientes
- Proyectos activos
- Planificación Inteligente
- Control Ventas
- Gastos
- Control Facturas
- Tareas
- Subtareas
- Alertas

**El Agent se confunde** sobre cuál herramienta usar y cuándo.

### ✅ Solución:
**Agrupa herramientas relacionadas** o **reduce a las esenciales**:

#### Grupo 1: Gestión de Agenda (4 herramientas)
- Ver citas
- Crear evento
- Modificar evento
- Eliminar cita

#### Grupo 2: Bases de Datos (5 herramientas)
- Clientes
- Proyectos
- Tareas
- Ventas
- Facturas

#### Grupo 3: Comunicación (2 herramientas)
- Get Email
- Contacts

**Recomendación:** Empieza con solo 6-8 herramientas principales y añade más gradualmente.

---

## ❌ PROBLEMA 4: Descripciones de Herramientas Poco Claras

### El Issue:
Muchas herramientas Baserow tienen descripciones genéricas:

```json
"toolDescription": "Get many rows in Baserow"
```

El Agent **no sabe cuándo usar cada una**.

### ✅ Solución:
Mejora las descripciones para que sean específicas y accionables:

#### ❌ MAL:
```json
{
  "descriptionType": "manual",
  "toolDescription": "Get many rows in Baserow"
}
```

#### ✅ BIEN:
```json
{
  "descriptionType": "manual",
  "toolDescription": "Usa esta herramienta para BUSCAR, CONSULTAR o LISTAR citas y reuniones. Ejemplos: '¿Qué citas tengo hoy?', 'Muéstrame las reuniones de esta semana', 'Busca la cita con Juan'."
}
```

### Descripciones Recomendadas:

```javascript
// CLIENTES
"Buscar, consultar o listar información de clientes. Ejemplos: 'Busca el cliente TechCorp', 'Muéstrame todos los clientes', 'Info de contacto de María'"

// TAREAS
"Consultar, buscar y listar tareas pendientes o completadas. Ejemplos: '¿Qué tareas tengo hoy?', 'Muéstrame tareas urgentes', 'Busca la tarea X'"

// FACTURAS
"Buscar y consultar facturas emitidas, cobradas o pendientes. Ejemplos: 'Facturas pendientes de cobro', 'Busca factura 2025-001', 'Facturas de enero'"

// PROYECTOS
"Consultar estado de proyectos activos. Ejemplos: 'Proyectos en curso', 'Estado del proyecto Web Acme', 'Proyectos retrasados'"

// VENTAS
"Consultar presupuestos, oportunidades y ventas. Ejemplos: 'Presupuestos pendientes', 'Ventas de este mes', 'Busca presupuesto Empresa X'"

// CITAS (Baserow)
"Consultar información detallada de citas guardadas en base de datos. Complementa Google Calendar."

// VER CITAS (Google Calendar)
"Ver eventos del calendario de Google. Usa esto para consultar agenda y disponibilidad."

// CREAR EVENTO
"Crear nuevo evento en Google Calendar. Usa cuando el usuario pida agendar, programar o crear cita."

// MODIFICAR EVENTO
"Modificar evento existente en Google Calendar. Usa cuando el usuario pida cambiar, mover o actualizar una cita."

// ELIMINAR CITA
"Eliminar evento de Google Calendar. Usa cuando el usuario pida cancelar o borrar una cita."

// GET EMAIL
"Obtener emails no leídos de Gmail. Usa cuando el usuario pregunte por emails, mensajes o correos nuevos."

// CONTACTS
"Buscar información de contactos (emails, teléfonos). Usa cuando necesites datos de contacto."
```

---

## ❌ PROBLEMA 5: Uso Incorrecto de $fromAI

### El Issue:
Muchas herramientas usan `$fromAI` con parámetros que el Agent no puede rellenar:

```json
"start": "={{ $fromAI(\"event_start\", \"Fecha y hora de inicio del evento en formato ISO\") }}"
```

Si el Agent no proporciona `event_start` correctamente, **la herramienta falla**.

### ✅ Solución:
**Simplifica los parámetros** y usa valores por defecto:

#### Para Google Calendar - Crear Evento:
```json
{
  "calendar": {
    "__rl": true,
    "value": "e6973ad750b1dde9d533de9f8d26c21ac063837346dcf9ed573ea0605270a392@group.calendar.google.com",
    "mode": "list"
  },
  "start": "={{ $fromAI(\"start\", \"Fecha y hora de inicio en formato YYYY-MM-DDTHH:mm:ss\") }}",
  "end": "={{ $fromAI(\"end\", \"Fecha y hora de fin en formato YYYY-MM-DDTHH:mm:ss\") }}",
  "additionalFields": {
    "summary": "={{ $fromAI(\"title\", \"Título del evento\") }}",
    "description": "={{ $fromAI(\"description\", \"Descripción (opcional)\") || '' }}",
    "location": "={{ $fromAI(\"location\", \"Ubicación (opcional)\") || '' }}"
  }
}
```

**Nombres simples:** `start`, `end`, `title` son más fáciles de entender para el Agent que `event_start`, `event_summary`, etc.

---

## 🔧 SOLUCIONES PASO A PASO

### 🚀 Solución Rápida (15 minutos)

#### 1. Arreglar el System Message

**Edita el nodo "Angie, AI Assistant 👩🏻‍🏫1":**

Cambia el System Message a esto (copia exactamente):

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
- Consultar subtareas de proyectos

GESTIÓN DE CLIENTES:
- Buscar información de clientes
- Ver historial de interacciones
- Consultar proyectos activos por cliente

GESTIÓN FINANCIERA:
- Consultar facturas (pendientes, cobradas, vencidas)
- Ver presupuestos y ventas
- Consultar gastos

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

**IMPORTANTE:** NO incluyas nada después de esto (ni comentarios de implementación, ni checklist, etc.)

#### 2. Desconectar el nodo "Planificacion Inteligente"

1. Haz clic en el nodo "Planificacion Inteligente1"
2. Elimina la conexión que va desde "Get Voice File1" hacia él
3. Por ahora, déjalo desconectado (lo arreglaremos después)

El flujo debe quedar:
```
Get Voice File → Speech to Text → Agent
```

#### 3. Reducir herramientas a las esenciales

**Desconecta temporalmente** estas herramientas del Agent (para testing):
- Subtareas
- Alertas
- Gastos
- Control Ventas (déjalo si es crítico)

**Deja solo:**
- Ver citas (Google Calendar)
- Crear evento
- Modificar evento
- Eliminar cita
- Base de datos Clientes
- Tareas
- Control Facturas
- Get Email

Esto reduce de 15 a 8 herramientas.

#### 4. Mejorar descripciones de herramientas Baserow

**Para cada herramienta Baserow, edita la descripción:**

**Base de datos Clientes:**
```json
{
  "descriptionType": "manual",
  "toolDescription": "Buscar, consultar y listar información de clientes de IA Avanza. Usa cuando necesites datos de clientes, contactos o historial."
}
```

**Tareas:**
```json
{
  "descriptionType": "manual",
  "toolDescription": "Consultar tareas pendientes, urgentes o completadas. Usa para '¿Qué tareas tengo?', 'tareas urgentes', 'tareas de hoy'."
}
```

**Control Facturas:**
```json
{
  "descriptionType": "manual",
  "toolDescription": "Buscar facturas emitidas, pendientes de cobro o cobradas. Usa para consultas sobre facturación y cobros."
}
```

**Gestión de citas y reuniones:**
```json
{
  "descriptionType": "manual",
  "toolDescription": "Consultar detalles de citas guardadas en base de datos. Complementa la información del calendario de Google."
}
```

#### 5. Probar el workflow

1. **Guarda** el workflow
2. **Activa** el workflow (toggle verde)
3. **Envía un mensaje de prueba** desde Telegram:
   ```
   /hoy
   ```
4. **Verifica** que el Agent responda
5. **Prueba con una herramienta:**
   ```
   ¿Qué citas tengo hoy?
   ```

---

## 🔍 Diagnóstico de Errores

### Si el Agent aún no responde:

#### Error: "Agent failed to execute"
**Causa:** System Message mal formateado
**Solución:** Asegúrate de que el System Message no tenga caracteres raros o esté cortado

#### Error: "Tool X failed"
**Causa:** Parámetros $fromAI incorrectos o credenciales faltantes
**Solución:**
1. Revisa que las credenciales estén configuradas
2. Simplifica los parámetros de la herramienta

#### Error: Agent responde pero no usa herramientas
**Causa:** Descripciones de herramientas poco claras
**Solución:** Mejora las descripciones con ejemplos específicos

#### Error: "Maximum execution time exceeded"
**Causa:** Demasiadas herramientas o bucle infinito
**Solución:** Reduce el número de herramientas conectadas

---

## 📊 Flujo Correcto Final

```
┌─────────────────────────────────────────────────────┐
│  Listen for incoming events (Telegram Trigger)      │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  Voice or Text (Set node)                           │
│  Prepara el input (texto o voz)                     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  If (¿Es mensaje de voz?)                           │
└────────┬─────────────────────────┬──────────────────┘
         │ SÍ                      │ NO
         ▼                         ▼
┌──────────────────┐     ┌─────────────────────────────┐
│  Get Voice File  │     │  (Continúa directo)          │
└────────┬─────────┘     └─────────────┬───────────────┘
         │                              │
         ▼                              │
┌──────────────────┐                   │
│ Speech to Text   │                   │
└────────┬─────────┘                   │
         │                              │
         └──────────────┬───────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Angie, AI Assistant (Agent)     │
         │                                  │
         │  Conectado a:                    │
         │  • OpenAI Chat Model             │
         │  • Window Buffer Memory          │
         │  • 8 herramientas (AI Tools)     │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Telegram (Send message)         │
         └──────────────────────────────────┘

HERRAMIENTAS CONECTADAS AL AGENT (AI Tool):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Ver citas (Google Calendar)
2. Crear evento (Google Calendar)
3. Modificar evento (Google Calendar)
4. Eliminar cita (Google Calendar)
5. Base de datos Clientes (Baserow)
6. Tareas (Baserow)
7. Control Facturas (Baserow)
8. Get Email (Gmail)
```

---

## ✅ Checklist de Verificación

Antes de activar el workflow, verifica:

- [ ] System Message NO tiene texto después de las comillas de cierre
- [ ] System Message termina con "¡Lista para ayudarte! ¿Qué necesitas?"
- [ ] Nodo "Planificacion Inteligente" está desconectado del flujo principal
- [ ] Flujo va: Telegram → Voice/Text → If → Speech to Text → Agent → Telegram
- [ ] Número de herramientas conectadas: 8 o menos
- [ ] Cada herramienta Baserow tiene descripción clara y específica
- [ ] Todas las herramientas tienen credenciales configuradas
- [ ] El workflow está guardado
- [ ] El workflow está activado (toggle verde)

---

## 🎯 Pruebas Recomendadas

Una vez configurado, prueba en este orden:

### 1. Prueba básica de comunicación
```
Telegram: "Hola Angie"
Esperado: Respuesta de bienvenida
```

### 2. Prueba de herramienta simple (Google Calendar)
```
Telegram: "¿Qué citas tengo hoy?"
Esperado: Lista de eventos de hoy o "No tienes citas hoy"
```

### 3. Prueba de herramienta Baserow
```
Telegram: "Muéstrame las tareas pendientes"
Esperado: Lista de tareas de Baserow
```

### 4. Prueba de creación
```
Telegram: "Agenda una reunión con Juan mañana a las 10:00"
Esperado: Confirmación de evento creado en Google Calendar
```

### 5. Prueba de comando rápido
```
Telegram: "/hoy"
Esperado: Resumen del día con citas y tareas
```

---

## 📞 Si Sigues Teniendo Problemas

### Revisa los logs de ejecución:
1. Ve a la pestaña "Executions" en n8n
2. Busca la ejecución fallida
3. Haz clic para ver detalles
4. Busca el error específico en el nodo que falló

### Problemas comunes y soluciones:

| Error | Causa | Solución |
|-------|-------|----------|
| "Invalid JSON in system message" | System message mal formateado | Copia exactamente el System Message de arriba |
| "Tool X not found" | Herramienta no conectada | Verifica conexiones AI Tool |
| "Credentials not set" | Falta configurar credencial | Configura la credencial en la herramienta |
| "Execution timed out" | Demasiadas herramientas | Reduce a 6-8 herramientas |
| "Agent returned no output" | Agent confundido | Mejora descripciones de herramientas |

---

## 🚀 Próximos Pasos (Opcional)

Una vez que el workflow funcione básico:

1. **Añadir más herramientas gradualmente** (una por una)
2. **Reconectar "Planificacion Inteligente"** como Code Tool
3. **Añadir Schedule Triggers** para recordatorios automáticos
4. **Configurar alertas proactivas** de facturas vencidas
5. **Optimizar el System Message** con más contexto

---

¿El workflow sigue sin funcionar? Comparte el mensaje de error específico para ayudarte mejor.
