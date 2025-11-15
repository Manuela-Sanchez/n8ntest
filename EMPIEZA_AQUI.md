# 🚀 EMPIEZA AQUÍ - Sistema de Facturación Automática

## 📌 Paso 1: Importar el Workflow

### ✅ Archivo Correcto a Usar:

```
workflow_facturacion_simple.json
```

### ❌ NO uses estos archivos:
- ~~WORKFLOW_FACTURACION_MEJORADO.json~~ (problemas de compatibilidad)

---

## 📖 Guía de Instalación

Sigue estos pasos **en orden**:

### 1️⃣ Leer Overview (5 minutos)
📄 **Archivo:** `README_FACTURACION.md`

Qué aprenderás:
- Qué hace el sistema
- Para qué sirve
- Beneficios y características

---

### 2️⃣ Crear Google Sheets (10 minutos)
📄 **Archivo:** `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md`

Qué hacer:
- Crear hoja de Google Sheets
- Copiar estructura de columnas
- Agregar datos de ejemplo
- Obtener Sheet ID

---

### 3️⃣ Importar a n8n (15 minutos)
📄 **Archivo:** `INSTRUCCIONES_IMPORTAR.md` ⭐ **IMPORTANTE**

Qué hacer:
- Importar `workflow_facturacion_simple.json`
- Configurar credenciales de Google
- Configurar credenciales de email (SMTP)
- Reemplazar Sheet ID
- Probar el workflow

---

### 4️⃣ Configuración Completa (opcional)
📄 **Archivo:** `GUIA_CONFIGURACION_COMPLETA.md`

Solo si tienes problemas o quieres entender más detalles.

---

## ⚡ Configuración Rápida (30 minutos)

Si quieres ir directo al grano:

📄 **Archivo:** `CONFIGURACION_RAPIDA.md`

Checklist paso a paso sin explicaciones extras.

---

## 📋 Archivos del Proyecto

| Archivo | Descripción | ¿Lo necesitas? |
|---------|-------------|----------------|
| `EMPIEZA_AQUI.md` | Este archivo (guía de inicio) | ✅ Léelo primero |
| `README_FACTURACION.md` | Overview general del sistema | ✅ Léelo segundo |
| `INSTRUCCIONES_IMPORTAR.md` | **Cómo importar el workflow** | ✅ ⭐ IMPORTANTE |
| `workflow_facturacion_simple.json` | **Workflow compatible con n8n** | ✅ ⭐ USA ESTE |
| `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md` | Estructura de la base de datos | ✅ Necesario |
| `CONFIGURACION_RAPIDA.md` | Setup rápido en 30 min | ✅ Alternativa rápida |
| `GUIA_CONFIGURACION_COMPLETA.md` | Tutorial detallado completo | 🔄 Si tienes dudas |
| ~~`WORKFLOW_FACTURACION_MEJORADO.json`~~ | ~~Versión incompatible~~ | ❌ NO USAR |

---

## 🎯 ¿Qué Hace Este Sistema?

### Automatiza completamente tu facturación mensual:

✅ **Se ejecuta solo** cada día 1 del mes a las 9 AM
✅ **Lee clientes** desde Google Sheets
✅ **Calcula IVA** español (21%) automáticamente
✅ **Envía emails** profesionales con la factura
✅ **Guarda histórico** en Google Sheets
✅ **Te envía reporte** mensual con estadísticas

### Ahorra tiempo:
⏰ **2-4 horas cada mes** que gastabas facturando manualmente

### Sin costes extras:
💰 **€0** usando Gmail + Google Sheets (gratis)

---

## 🔧 Requisitos

Lo que NECESITAS tener:

- ✅ **n8n instalado** (local, cloud, o servidor)
- ✅ **Cuenta de Google** (Gmail)
- ✅ **Email para enviar facturas** (Gmail funciona)

Eso es todo. Nada más.

---

## 🚀 Ruta Rápida (para impacientes)

Si ya conoces n8n y quieres ir rápido:

1. ✅ Lee `README_FACTURACION.md` (5 min)
2. ✅ Crea Google Sheet con estructura de `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md` (10 min)
3. ✅ Sigue `INSTRUCCIONES_IMPORTAR.md` paso a paso (15 min)
4. ✅ ¡Listo! Total: **30 minutos**

---

## 🎓 Ruta Completa (para principiantes)

Si es tu primera vez con n8n o quieres entender todo:

1. ✅ Lee `README_FACTURACION.md` completo (10 min)
2. ✅ Lee `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md` y crea la hoja (20 min)
3. ✅ Lee `GUIA_CONFIGURACION_COMPLETA.md` (30 min)
4. ✅ Sigue `INSTRUCCIONES_IMPORTAR.md` (30 min)
5. ✅ Prueba y ajusta (30 min)
6. ✅ ¡Listo! Total: **2 horas**

---

## 📊 Estructura del Sistema

```
┌─────────────────────────────────────────┐
│  TRIGGER: Día 1 de cada mes (9 AM)     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GOOGLE SHEETS: Leer lista de clientes │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  FILTRAR: Solo clientes activos        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  CALCULAR: IVA 21% + Totales            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  EMAIL: Enviar factura a cada cliente   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GOOGLE SHEETS: Guardar en histórico    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GENERAR: Reporte mensual               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  EMAIL: Enviar reporte a admin          │
└─────────────────────────────────────────┘
```

**8 nodos en total, conectados en línea recta.**

---

## 💡 Ejemplo de Uso

### Tu situación:
- Tienes 20 clientes que pagan mensualmente
- Servicios entre €500 - €2000/mes
- Facturas el día 1 de cada mes

### Con este sistema:
1. **Hoy:** Configuras todo (30 min - 2 horas)
2. **Día 1 próximo mes:** Sistema se ejecuta automáticamente a las 9 AM
3. **9:05 AM:** Todos los clientes tienen su factura por email
4. **9:06 AM:** Tú recibes el reporte con estadísticas
5. **Resultado:** 0 minutos de tu tiempo, 20 facturas enviadas ✅

---

## ❓ Preguntas Frecuentes

### ¿Es gratis?
Sí, si usas:
- n8n self-hosted (gratis)
- Gmail para emails (500/día gratis)
- Google Sheets (gratis)

### ¿Necesito saber programar?
No. Solo copiar y pegar. Todo está listo.

### ¿Funciona fuera de España?
Sí. Cambia el IVA del 21% por tu tasa.

### ¿Puedo personalizar los emails?
Sí. Están en HTML y puedes editarlos.

### ¿Qué pasa si falla?
El workflow te envía un email si hay algún error.

### ¿Puedo generar PDFs?
Sí, pero necesitas un servicio externo (opcional).
Sin PDFs, envía email HTML con todos los datos.

---

## 🆘 ¿Necesitas Ayuda?

### Si tienes problemas al importar:
📖 Lee: `INSTRUCCIONES_IMPORTAR.md` (sección "Errores Comunes")

### Si tienes problemas de configuración:
📖 Lee: `GUIA_CONFIGURACION_COMPLETA.md` (sección "Solución de Problemas")

### Si no sabes qué hacer:
📖 Lee: `CONFIGURACION_RAPIDA.md` (checklist paso a paso)

---

## ✅ Checklist de Inicio

Marca cada paso cuando lo completes:

- [ ] Leí `README_FACTURACION.md`
- [ ] Creé mi Google Sheet con la estructura correcta
- [ ] Obtuve mi Sheet ID
- [ ] Importé `workflow_facturacion_simple.json` a n8n
- [ ] Configuré credenciales de Google Sheets
- [ ] Configuré credenciales de SMTP
- [ ] Reemplacé Sheet ID en los nodos
- [ ] Probé el nodo "Leer Clientes" ✅
- [ ] Probé el nodo "Calcular Totales" ✅
- [ ] Envié email de prueba ✅
- [ ] Eliminé datos de prueba
- [ ] Activé el workflow 🟢

**Si completaste todo:** ¡Felicidades! 🎉 Tu sistema está listo.

---

## 🎯 Siguiente Paso

👉 **Abre este archivo ahora:** `INSTRUCCIONES_IMPORTAR.md`

Ese archivo te guía paso a paso para importar el workflow.

¡Buena suerte! 🚀

---

**Versión:** 2.0
**Última actualización:** 15 Nov 2025
**Autor:** Sistema de Facturación Automática
**Compatibilidad:** n8n v0.200.0+
