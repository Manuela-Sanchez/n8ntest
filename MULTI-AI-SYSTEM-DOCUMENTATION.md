# 🤖 Sistema Multi-AI para Asistente de Nutrición Telegram

## 📋 Descripción General

Este workflow de n8n implementa un **sistema inteligente de múltiples especialistas AI** para asistir a usuarios en su proceso de pérdida de peso con una dieta ovovegetariana. El sistema utiliza un router inteligente que clasifica las consultas y las dirige al AI especializado correspondiente.

---

## 🏗️ Arquitectura del Sistema

### Flujo de Trabajo:

```
Usuario en Telegram
    ↓
[Telegram Trigger]
    ↓
[Extract Message] - Extrae el mensaje del usuario
    ↓
[Router AI] - Clasifica la consulta en 4 categorías
    ↓
[Route to Specialist] - Switch que dirige al AI correspondiente
    ↓
    ├─→ [AI Nutrición] - Menús, planificación nutricional
    ├─→ [AI Recetas] - Recetas ovovegetarianas detalladas
    ├─→ [AI Ejercicio] - Rutinas de Pilates y ejercicio
    └─→ [AI Terapia] - Apoyo emocional y salud mental
         ↓
[Send Response] - Envía respuesta al usuario en Telegram
```

---

## 🎯 Especialistas AI

### 1. 🥗 AI Nutrición Ovovegetariana

**Especialización:**
- Menús semanales personalizados (1400-1800 kcal/día)
- Planificación nutricional completa
- Control de macronutrientes
- Listas de compras
- Educación nutricional
- Suplementación (especialmente B12)

**Características:**
- Modelo: Gemini 1.5 Pro
- Temperature: 0.7 (balance entre creatividad y precisión)
- Max tokens: 2048
- Memoria conversacional: 10 mensajes

**Consultas típicas:**
- "Dame un menú semanal"
- "¿Cuánta proteína necesito?"
- "Lista de compras ovovegetariana"
- "¿Cómo obtener suficiente hierro?"

---

### 2. 👨‍🍳 AI Recetas Ovovegetarianas

**Especialización:**
- Recetas detalladas con información nutricional
- Desayunos, almuerzos, cenas, snacks
- Instrucciones paso a paso
- Sustituciones de ingredientes
- Ideas para meal prep

**Características:**
- Modelo: Gemini 1.5 Pro
- Temperature: 0.9 (alta creatividad para recetas variadas)
- Max tokens: 2048
- Memoria conversacional: 10 mensajes

**Consultas típicas:**
- "Receta de desayuno con huevos"
- "Ideas para cena rápida"
- "Cómo hacer tofu scramble"
- "Recetas para meal prep"

---

### 3. 🧘‍♀️ AI Pilates y Ejercicio

**Especialización:**
- Rutinas de Pilates (principiante a avanzado)
- Ejercicios para tonificación
- Combinación con cardio
- Planes semanales de entrenamiento
- Técnicas de respiración y forma correcta

**Características:**
- Modelo: Gemini 1.5 Pro
- Temperature: 0.7
- Max tokens: 2048
- Memoria conversacional: 10 mensajes

**Consultas típicas:**
- "Rutina de Pilates para principiantes"
- "Ejercicios para abdomen"
- "Cuántas veces entrenar a la semana"
- "Combinar Pilates con cardio"

---

### 4. 🧠 AI Terapia y Salud Mental

**Especialización:**
- Apoyo emocional y motivación
- Gestión de ansiedad y estrés
- Comer emocional
- Autoestima e imagen corporal
- Mindfulness y meditación
- Manejo de recaídas

**Características:**
- Modelo: Gemini 1.5 Pro
- Temperature: 0.8 (empatía y calidez)
- Max tokens: 2048
- Memoria conversacional: 10 mensajes

**Consultas típicas:**
- "Me siento desmotivada"
- "Tengo ansiedad por comer"
- "Cómo manejar comer emocional"
- "Necesito motivación"

---

## 🎛️ Router AI (Sistema de Clasificación)

**Función:**
Clasifica automáticamente cada consulta del usuario en una de las 4 categorías.

**Modelo:** Gemini 1.5 Flash (rápido y eficiente)
**Temperature:** 0.3 (baja para máxima precisión en clasificación)
**Max tokens:** 50 (solo necesita responder con una palabra)

**Categorías de clasificación:**
1. **NUTRICION** → Dirige a AI Nutrición
2. **RECETAS** → Dirige a AI Recetas
3. **EJERCICIO** → Dirige a AI Ejercicio
4. **TERAPIA** → Dirige a AI Terapia

**Lógica del Router:**
- Analiza el contenido y la intención del mensaje
- Responde con UNA palabra (la categoría)
- Saludos generales ("Hola") → NUTRICION (punto de entrada principal)

---

## 💾 Sistema de Memoria

Cada AI especializado tiene su **propia memoria conversacional** independiente:

- **Tipo:** Buffer Window Memory
- **Tamaño:** 10 mensajes últimos
- **Identificación:** Chat ID de Telegram (único por usuario)
- **Función:** Mantiene contexto de conversaciones anteriores

**Ventajas:**
- El usuario puede tener conversaciones continuas con cada especialista
- El contexto se mantiene entre sesiones
- Cada especialista recuerda sus interacciones específicas

---

## 🔧 Configuración Técnica

### Nodos principales:

| Nodo | Tipo | Función |
|------|------|---------|
| Telegram Trigger | Trigger | Recibe mensajes de Telegram |
| Extract Message | Set | Extrae datos del mensaje |
| Router AI | Agent (LangChain) | Clasifica consulta |
| Route to Specialist | Switch | Dirige a AI correcto |
| AI Nutrición | Agent (LangChain) | Responde sobre nutrición |
| AI Recetas | Agent (LangChain) | Responde sobre recetas |
| AI Ejercicio | Agent (LangChain) | Responde sobre ejercicio |
| AI Terapia | Agent (LangChain) | Responde sobre terapia |
| Send Response | Telegram | Envía respuesta al usuario |

### Credenciales necesarias:

1. **Telegram Bot API**
   - Para Telegram Trigger y Send Response
   - Obtener token de @BotFather

2. **Google PaLM API (Gemini)**
   - Para todos los modelos AI
   - Obtener en Google AI Studio

---

## 🚀 Instalación y Configuración

### 1. Crear Bot de Telegram:
```
1. Abre Telegram y busca @BotFather
2. Envía /newbot
3. Sigue instrucciones para nombrar tu bot
4. Guarda el token de API que te da
```

### 2. Obtener API Key de Google Gemini:
```
1. Ve a https://ai.google.dev/
2. Crea cuenta o inicia sesión
3. Solicita API key
4. Guarda la key
```

### 3. Importar workflow en n8n:
```
1. Abre n8n
2. Click en "Import from File"
3. Selecciona telegram-nutrition-multi-ai-workflow.json
4. El workflow se importará
```

### 4. Configurar credenciales:
```
1. En n8n, ve a Settings → Credentials
2. Agrega "Telegram Bot API" con tu token
3. Agrega "Google PaLM API" con tu key de Gemini
4. Asigna credenciales a todos los nodos correspondientes
```

### 5. Activar workflow:
```
1. En n8n, abre el workflow
2. Click en "Active" en la esquina superior derecha
3. El bot ya está funcionando
```

---

## 📊 Ventajas del Sistema Multi-AI

### ✅ Especialización:
- Cada AI es **experto en su área**
- Prompts optimizados para cada especialidad
- Respuestas más precisas y relevantes

### ✅ Eficiencia:
- Router rápido clasifica en milisegundos
- No sobrecarga un solo AI con todo
- Uso óptimo de tokens

### ✅ Escalabilidad:
- Fácil agregar nuevos especialistas
- Modificar prompts individualmente sin afectar otros
- Mejorar cada AI de forma independiente

### ✅ Experiencia de Usuario:
- Respuestas más relevantes
- Conversaciones más naturales
- Memoria específica por especialista

### ✅ Mantenimiento:
- Debugear problemas específicos más fácil
- Actualizar una especialidad sin tocar otras
- Probar mejoras de forma aislada

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Menú Semanal
```
Usuario: "Hola, dame un menú para esta semana"
↓
Router: NUTRICION
↓
AI Nutrición: [Responde con menú completo de 7 días]
```

### Ejemplo 2: Receta Específica
```
Usuario: "Receta de desayuno con huevos y espinacas"
↓
Router: RECETAS
↓
AI Recetas: [Responde con 2-3 recetas detalladas]
```

### Ejemplo 3: Rutina de Ejercicio
```
Usuario: "Rutina de Pilates para principiantes de 30 minutos"
↓
Router: EJERCICIO
↓
AI Ejercicio: [Responde con rutina completa paso a paso]
```

### Ejemplo 4: Apoyo Emocional
```
Usuario: "Me siento desmotivada, no estoy viendo resultados"
↓
Router: TERAPIA
↓
AI Terapia: [Responde con validación emocional y estrategias]
```

---

## 🔍 Monitoreo y Logs

### En n8n puedes monitorear:

1. **Executions**: Ver cada ejecución del workflow
2. **Rutas tomadas**: Qué AI fue activado
3. **Errores**: Si algo falla, dónde ocurrió
4. **Tiempos**: Cuánto tarda cada nodo

### Tips de monitoreo:
- Revisa regularmente qué categorías son más usadas
- Identifica errores comunes de clasificación del router
- Ajusta prompts según necesidades reales de usuarios

---

## 🛠️ Mantenimiento y Mejoras

### Ajustar Prompts:
Si un AI no responde como esperas:
1. Edita el nodo del AI correspondiente
2. Modifica el `systemMessage`
3. Guarda y prueba
4. No necesitas tocar otros AIs

### Mejorar Router:
Si el router clasifica mal:
1. Edita el nodo "Router AI"
2. Agrega ejemplos en el `systemMessage`
3. Ajusta temperatura (más baja = más preciso)

### Agregar Nuevo Especialista:
1. Crea nuevo nodo Agent
2. Configura modelo y memoria
3. Agrega nueva salida en Switch
4. Actualiza Router para reconocer nueva categoría

---

## ⚙️ Configuraciones Avanzadas

### Ajustar Temperature de Modelos:

- **Baja (0.3-0.5)**: Respuestas más consistentes y predecibles
  - Recomendado para: Router, Nutrición

- **Media (0.6-0.8)**: Balance creatividad/precisión
  - Recomendado para: Ejercicio, Terapia

- **Alta (0.9-1.0)**: Máxima creatividad
  - Recomendado para: Recetas

### Ajustar Max Output Tokens:

- **Router**: 50 tokens (solo necesita 1 palabra)
- **Especialistas**: 2048 tokens (respuestas detalladas)
- Si respuestas se cortan: aumentar a 3000-4000

### Ajustar Memoria:

- **contextWindowLength**: 10 mensajes (default)
- Para conversaciones más largas: aumentar a 20-30
- Considera costo: más memoria = más tokens usados

---

## 📈 Métricas de Éxito

### KPIs a monitorear:

1. **Tasa de respuesta correcta**: ¿El router clasifica bien?
2. **Satisfacción de usuarios**: Feedback de usuarios
3. **Tiempo de respuesta**: ¿Qué tan rápido responde?
4. **Uso por especialista**: ¿Cuál AI se usa más?
5. **Errores**: ¿Qué falla y con qué frecuencia?

---

## 🆘 Troubleshooting

### Problema: Router clasifica mal
**Solución**:
- Ajusta ejemplos en prompt del router
- Baja temperature a 0.2
- Agrega más palabras clave de cada categoría

### Problema: AI no responde
**Solución**:
- Verifica credenciales de Google API
- Revisa logs de ejecución
- Asegúrate que modelo esté disponible

### Problema: Respuestas cortadas
**Solución**:
- Aumenta maxOutputTokens a 3000-4000
- Simplifica system message si es muy largo

### Problema: Bot no recibe mensajes
**Solución**:
- Verifica token de Telegram
- Activa el workflow
- Revisa que webhook esté configurado

---

## 📞 Soporte

Para problemas técnicos:
- Revisa documentación de n8n: https://docs.n8n.io
- Comunidad n8n: https://community.n8n.io
- Documentación Gemini: https://ai.google.dev/docs

---

## 📝 Changelog

### Versión 2.0 (2025-11-15)
- ✨ Sistema multi-AI implementado
- ✨ 4 especialistas creados
- ✨ Router inteligente agregado
- ✨ Memoria individual por especialista
- ✨ Optimización de prompts por especialidad

### Versión 1.0 (2025-11-14)
- 🎉 Versión inicial con un solo AI generalista

---

## 🎯 Roadmap Futuro

### Próximas mejoras planeadas:

- [ ] AI especializado en suplementación
- [ ] Integración con app de tracking de calorías
- [ ] Sistema de recordatorios automáticos
- [ ] Análisis de progreso con gráficos
- [ ] Comunidad de usuarios en grupo de Telegram
- [ ] Base de datos de recetas favoritas por usuario
- [ ] Planes premium con consultas ilimitadas

---

## 📄 Licencia

Este workflow es de uso libre para fines educativos y personales.

---

## 👥 Créditos

**Desarrollado por:** Manuela Sánchez
**Fecha:** 15 de Noviembre, 2025
**Tecnologías:** n8n, Google Gemini AI, Telegram Bot API, LangChain

---

## 🌟 Conclusión

Este sistema multi-AI representa un enfoque modular y escalable para proporcionar asistencia integral en pérdida de peso. Cada especialista está optimizado para su área, garantizando respuestas de alta calidad y experiencia de usuario superior.

**¡Tu asistente de nutrición inteligente está listo para ayudar! 🚀**
