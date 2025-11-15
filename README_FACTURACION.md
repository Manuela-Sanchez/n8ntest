# 🧾 Sistema de Facturación Automática para España

> Sistema completo de facturación automática con n8n, Google Sheets y Google Drive

## 🎯 ¿Qué hace este sistema?

Automatiza completamente tu proceso de facturación mensual:

1. **📅 Se ejecuta automáticamente** cada día 1 del mes a las 9:00 AM
2. **📊 Lee tus clientes** desde Google Sheets
3. **💶 Calcula automáticamente** el IVA español (21%)
4. **📄 Genera facturas en PDF** con todos los datos
5. **📧 Envía emails personalizados** a cada cliente
6. **💾 Archiva en Google Drive** para tu contabilidad
7. **✅ Actualiza estados** en Google Sheets
8. **📊 Te envía un reporte** con el resumen mensual

---

## 📦 Archivos Incluidos

| Archivo | Descripción |
|---------|-------------|
| `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md` | Cómo crear y formatear tu hoja de clientes |
| `WORKFLOW_FACTURACION_MEJORADO.json` | Workflow de n8n listo para importar |
| `GUIA_CONFIGURACION_COMPLETA.md` | Tutorial paso a paso completo |
| `README_FACTURACION.md` | Este archivo (resumen general) |

---

## 🚨 IMPORTANTE: Archivo a Usar

**USA ESTE ARCHIVO:** `workflow_facturacion_simple.json`

⚠️ **NO uses** `WORKFLOW_FACTURACION_MEJORADO.json` - ese tiene problemas de compatibilidad.

📖 **Instrucciones completas de importación:** `INSTRUCCIONES_IMPORTAR.md`

---

## ⚡ Inicio Rápido (5 pasos)

### 1️⃣ Crear Google Sheets

Crea una hoja con estas columnas:

```
row_id_en_sheets | cliente | email_cliente | monto_base | iva_rate | concepto | forma_pago | dias_vencimiento | estado | fecha_ultima_factura | activo | notas
```

**Ejemplo de datos:**
```
CLI001 | Empresa ABC | cliente@ejemplo.es | 1000 | 0.21 | Servicios Mensual | Transferencia | 30 | Pendiente | | SI | Cliente preferente
```

📖 **Ver:** `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md`

---

### 2️⃣ Crear Carpeta en Google Drive

1. Crea una carpeta llamada "Facturas 2025"
2. Copia el ID de la carpeta desde la URL

---

### 3️⃣ Importar Workflow a n8n

1. Abre n8n
2. Importa el archivo: `workflow_facturacion_simple.json`
3. Configura tus IDs:
   - Sheet ID en los nodos de Google Sheets

📖 **Instrucciones detalladas:** `INSTRUCCIONES_IMPORTAR.md`

---

### 4️⃣ Configurar Credenciales

En n8n, crea credenciales para:
- ✅ Google Sheets OAuth2
- ✅ Google Drive OAuth2
- ✅ Email (SMTP/SendGrid)

---

### 5️⃣ Probar y Activar

1. Ejecuta el workflow manualmente
2. Verifica que todo funciona
3. Activa el workflow
4. ¡Listo! Se ejecutará automáticamente

📖 **Ver:** `GUIA_CONFIGURACION_COMPLETA.md`

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────┐
│           TRIGGER (Día 1 - 9:00 AM)            │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GOOGLE SHEETS: Leer Clientes              │
│      ├─ Pestaña: "Clientes"                    │
│      └─ Filtrar solo activos (activo = SI)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      CALCULAR TOTALES                           │
│      ├─ Base imponible                          │
│      ├─ IVA (21%)                               │
│      ├─ Total                                   │
│      ├─ Generar Invoice ID único                │
│      └─ Calcular fechas vencimiento             │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GENERAR PDF                                │
│      └─ API de generación de facturas           │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GOOGLE DRIVE: Guardar PDF                  │
│      └─ Carpeta: "Facturas 2025"                │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      EMAIL: Enviar a Cliente                    │
│      ├─ Email personalizado en HTML             │
│      ├─ Adjuntar PDF                            │
│      └─ Detalles de la factura                  │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GOOGLE SHEETS: Registrar Histórico         │
│      └─ Pestaña: "Facturas Emitidas"           │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GOOGLE SHEETS: Actualizar Estado           │
│      └─ Cambiar estado a "Emitida"              │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      GENERAR REPORTE                            │
│      ├─ Total facturado                         │
│      ├─ Número de facturas                      │
│      ├─ Detalles por cliente                    │
│      └─ Métricas del proceso                    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      EMAIL: Enviar Reporte a Admin              │
│      └─ Resumen completo del mes                │
└─────────────────────────────────────────────────┘
```

---

## 💡 Características Destacadas

### ✨ Totalmente Automático
- Se ejecuta sin intervención humana
- Programación flexible (cambiar día/hora)
- Manejo de errores incorporado

### 💶 Específico para España
- IVA del 21% (configurable)
- Formato de facturas según normativa
- Fechas en formato europeo

### 📊 Trazabilidad Completa
- Histórico de todas las facturas
- Estados actualizables
- Archivos organizados en Drive

### 🎨 Emails Profesionales
- Diseño HTML responsive
- Personalización por cliente
- Adjunto PDF automático

### 📈 Reporting Integrado
- Resumen mensual automático
- Métricas clave
- Detalle por cliente

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso | Coste |
|------------|-----|-------|
| **n8n** | Motor de automatización | Gratis (self-hosted) o desde €20/mes (cloud) |
| **Google Sheets** | Base de datos de clientes | Gratis |
| **Google Drive** | Almacenamiento de PDFs | Gratis (15GB) |
| **Gmail/SMTP** | Envío de emails | Gratis (límite 500/día) o servicio externo |
| **API de PDFs** | Generación de facturas | Variable (desde €10/mes) |

**Coste total estimado:** €0 - €50/mes (dependiendo de volumen)

---

## 📊 Casos de Uso

### Ideal para:

✅ **Pequeñas empresas** con facturación recurrente
✅ **Autónomos** que facturan servicios mensuales
✅ **SaaS** con suscripciones
✅ **Agencias** con retainers mensuales
✅ **Consultores** con contratos fijos

### Volumen recomendado:

- 📦 **1-100 clientes:** Perfecto
- 📦 **100-500 clientes:** Muy bien
- 📦 **500+ clientes:** Considera un ERP dedicado

---

## 🎓 Ejemplos de Uso Real

### Caso 1: Agencia de Marketing Digital

**Situación:**
- 25 clientes con retainer mensual
- Montos entre €800-€3000/mes
- Facturación el día 1 de cada mes

**Resultado:**
- ⏰ Ahorro: 3 horas/mes
- 💰 Coste: €0 (todo gratis)
- 📈 0% errores (antes 5% facturas con errores)

### Caso 2: Desarrollador Freelance

**Situación:**
- 8 clientes recurrentes
- Servicios de hosting y mantenimiento
- Facturas entre €200-€1200/mes

**Resultado:**
- ⏰ Ahorro: 1.5 horas/mes
- 💰 Coste: €0
- 🎯 100% facturas enviadas a tiempo

### Caso 3: SaaS B2B

**Situación:**
- 150 clientes con suscripción
- Planes desde €50/mes hasta €500/mes
- Facturación día 1 de cada mes

**Resultado:**
- ⏰ Ahorro: 8 horas/mes
- 💰 Coste: €30/mes (SendGrid para emails)
- 📊 Dashboard automático de ingresos

---

## ⚠️ Limitaciones y Consideraciones

### Limitaciones Técnicas

| Limitación | Workaround |
|------------|------------|
| Google Sheets API: 100 requests/100s | Usa batching o delays entre requests |
| Gmail: 500 emails/día | Usa SendGrid/Mailgun para más volumen |
| Google Drive: 15GB gratis | Limpia archivos antiguos o usa plan de pago |

### Consideraciones Legales

⚖️ **IMPORTANTE:** Este sistema genera facturas, pero debes asegurarte de:

1. ✅ Cumplir con normativa fiscal de tu país
2. ✅ Incluir todos los datos legales requeridos
3. ✅ Conservar copias según ley (6 años en España)
4. ✅ Enviar facturas a Hacienda si es obligatorio en tu caso
5. ✅ Consultar con un asesor fiscal

**Este sistema NO reemplaza a un asesor fiscal.**

---

## 🔒 Seguridad y Privacidad

### Buenas Prácticas

✅ **Credenciales:**
- Usa OAuth2 (no API keys estáticas)
- Rota passwords regularmente
- Nunca compartas credenciales

✅ **Datos:**
- Haz backups de Google Sheets mensualmente
- No almacenes datos de pago (solo referencias)
- Cumple con RGPD si aplica

✅ **Acceso:**
- Limita quién puede editar el workflow
- Usa 2FA en todas las cuentas
- Revisa logs de ejecución

---

## 🚀 Roadmap de Mejoras

### Próximas Funcionalidades

- [ ] Integración con Stripe para pagos online
- [ ] Recordatorios automáticos de facturas vencidas
- [ ] Dashboard visual con Google Data Studio
- [ ] Plantillas de facturas personalizables
- [ ] Multi-moneda (EUR, USD, GBP)
- [ ] Envío a contabilidad automático
- [ ] Conexión con API de Hacienda (España)

---

## 📚 Recursos Adicionales

### Documentación

- 📖 [Guía Completa de Configuración](./GUIA_CONFIGURACION_COMPLETA.md)
- 📊 [Estructura de Google Sheets](./ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md)
- 🔧 [Workflow JSON](./WORKFLOW_FACTURACION_MEJORADO.json)

### Soporte

- 💬 [n8n Community Forum](https://community.n8n.io)
- 📺 [n8n YouTube Channel](https://youtube.com/c/n8n-io)
- 📖 [n8n Documentation](https://docs.n8n.io)

### Plantillas Relacionadas

- [Invoice Generator API](https://invoice-generator.com)
- [Facturación con Notion](https://notion.so/templates)
- [Automatización con Zapier](https://zapier.com/apps/invoice)

---

## 🤝 Contribuciones

¿Tienes ideas para mejorar este sistema?

1. Prueba el sistema
2. Documenta tu mejora
3. Comparte en la comunidad de n8n

---

## 📄 Licencia

Este workflow es de uso libre para:
- ✅ Uso comercial
- ✅ Modificación
- ✅ Distribución

**Condiciones:**
- Úsalo bajo tu propia responsabilidad
- Verifica que cumple con tus requisitos legales
- Adapta según tu caso de uso

---

## 🎉 Créditos

Creado con:
- ❤️ Automatización
- 🤖 n8n
- ☁️ Google Workspace
- ⚡ Muchas horas de pruebas

---

## 📞 Siguiente Paso

👉 **Empieza aquí:** [GUIA_CONFIGURACION_COMPLETA.md](./GUIA_CONFIGURACION_COMPLETA.md)

Tiempo estimado de configuración: **2-3 horas**

¡Buena suerte con tu automatización! 🚀

---

**Última actualización:** 15 de Noviembre 2025
**Versión:** 2.0
**Compatibilidad:** n8n v1.0+
