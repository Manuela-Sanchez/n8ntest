# 🚀 Guía Rápida - Onboarding de Clientes

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Importar el Workflow

```bash
# En n8n:
Workflows → Add workflow → ... → Import from File
# Selecciona: Client_Onboarding_Automation.json
```

### 2️⃣ Configurar lo Mínimo Esencial

#### A. Google Sheets (2 minutos)

1. **Crea una hoja de cálculo** con estas columnas:
   ```
   ID Cliente | Fecha Registro | Nombre | Email | Teléfono | Empresa | Plan | Precio | Estado | Número Factura | Fecha Vencimiento Pago | Fecha Seguimiento | Notas | Última Actualización
   ```

2. **Copia el ID** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[COPIA_ESTE_ID]/edit
   ```

3. **Reemplaza en n8n**:
   - Nodo 3: "Guardar en Google Sheets"
   - Nodo 11: "Actualizar Estado Final"
   - Busca: `YOUR_SPREADSHEET_ID_HERE`
   - Pega tu ID

#### B. Emails (3 minutos)

**Opción A: Gmail (Recomendado para pruebas)**

1. Activa verificación en 2 pasos: https://myaccount.google.com/security
2. Crea contraseña de aplicación: https://myaccount.google.com/apppasswords
3. En n8n, configura SMTP:
   - Host: `smtp.gmail.com`
   - Puerto: `587`
   - Usuario: `tu-email@gmail.com`
   - Password: [contraseña de aplicación]

**Opción B: Servidor propio**
- Host: `smtp.tuempresa.com`
- Puerto: `587` o `465`
- Credenciales de tu servidor

4. **Cambia los emails** en cada nodo:
   - Nodo 4: Cambia `bienvenida@tuempresa.com`
   - Nodo 6: Cambia `facturacion@tuempresa.com`
   - Nodo 8: Cambia `facturacion@tuempresa.com`
   - Nodo 10: Cambia `ventas@tuempresa.com`

### 3️⃣ Activar y Probar

1. Haz clic en **"Inactive"** → debe cambiar a **"Active"**
2. Copia la URL del formulario (aparece en el primer nodo)
3. Abre la URL y prueba con tus datos

---

## 📊 Diagrama Visual del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                    NUEVO CLIENTE ENTRA                           │
│                  (Formulario Web)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│             PREPARAR DATOS DEL CLIENTE                           │
│  • Generar ID único (CLI-20250117-1234)                         │
│  • Calcular precios según plan                                   │
│  • Generar número de factura                                     │
│  • Calcular fechas de vencimiento                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              GUARDAR EN GOOGLE SHEETS                            │
│  Base de datos completa con toda la info                         │
└─────────┬───────────────────────────┬───────────────────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────┐   ┌──────────────────────────────────────┐
│  EMAIL BIENVENIDA    │   │   GENERAR DATOS DE FACTURA           │
│  • Diseño HTML       │   │   • Calcular subtotal                │
│  • Personalizado     │   │   • Aplicar IVA (21%)                │
│  • Próximos pasos    │   │   • Total a pagar                    │
└──────────────────────┘   └─────────────┬────────────────────────┘
                                         │
                                         ▼
                           ┌──────────────────────────────────────┐
                           │      EMAIL CON FACTURA               │
                           │  • Factura detallada                 │
                           │  • Botón de pago                     │
                           │  • Fecha de vencimiento              │
                           └─────────────┬────────────────────────┘
                                         │
                                         ▼
                           ┌──────────────────────────────────────┐
                           │      ⏰ ESPERAR 7 DÍAS               │
                           └─────────────┬────────────────────────┘
                                         │
                                         ▼
                           ┌──────────────────────────────────────┐
                           │   RECORDATORIO DE PAGO               │
                           │  • Email amigable                    │
                           │  • Días restantes                    │
                           │  • Enlace de pago                    │
                           └──────────────────────────────────────┘

          ┌──────────────────────────────────────────────────────┐
          │  [En paralelo desde el inicio]                       │
          │  ⏰ ESPERAR 3 DÍAS MÁS                               │
          └─────────────┬────────────────────────────────────────┘
                        │
                        ▼
          ┌──────────────────────────────────────────────────────┐
          │  🔔 ALERTA AL EQUIPO DE VENTAS                       │
          │  • Información completa del cliente                  │
          │  • Acciones sugeridas                                │
          │  • Timeline de eventos                               │
          └─────────────┬────────────────────────────────────────┘
                        │
                        ▼
          ┌──────────────────────────────────────────────────────┐
          │  ACTUALIZAR ESTADO EN GOOGLE SHEETS                  │
          │  Estado: "Seguimiento Manual Requerido"              │
          └──────────────────────────────────────────────────────┘
```

---

## 🎯 Personalización Rápida

### Cambiar Precios

**Nodo: "Nuevo Cliente (Formulario)"**
```json
"fieldOptions": {
  "values": [
    { "option": "Básico - $29/mes" },      ← Cambia aquí
    { "option": "Pro - $79/mes" },         ← Cambia aquí
    { "option": "Empresa - $199/mes" }     ← Cambia aquí
  ]
}
```

**Nodo: "Preparar Datos del Cliente"**
```javascript
// En el campo planPrice:
... includes('Básico') ? 29 : ... includes('Pro') ? 79 : 199
                         ↑                            ↑       ↑
                    Cambia estos números
```

### Cambiar Días de Espera

**Para recordatorio de pago:**
- Nodo: "Esperar 7 días"
- Cambia `amount: 7` por el número de días que prefieras

**Para seguimiento:**
- Nodo: "Esperar 3 días más"
- Cambia `amount: 3` por el número de días que prefieras

### Cambiar IVA/Impuestos

**Nodo: "Generar Datos de Factura"**
```javascript
const taxRate = 0.21;  // 21% España
                 ↑
// Ejemplos:
// 0.19 → 19% IVA (México)
// 0.16 → 16% IVA (México - reducido)
// 0.22 → 22% IVA (Italia)
// 0.0  → Sin impuestos
```

---

## ✅ Checklist Mínimo

Antes de activar:

- [ ] Google Sheet creado con columnas correctas
- [ ] ID de la hoja reemplazado en 2 nodos
- [ ] Credencial de Google Sheets configurada
- [ ] Credencial SMTP configurada
- [ ] Emails "fromEmail" cambiados en 4 nodos
- [ ] Email de tu equipo en nodo de seguimiento
- [ ] Workflow probado una vez

---

## 🎉 ¡Listo!

Una vez activado, el flujo funcionará automáticamente:

1. **Cliente completa formulario** → Todo el proceso se dispara
2. **Recibes datos en Google Sheets** → Visibilidad total
3. **Cliente recibe emails automáticos** → Experiencia profesional
4. **Tu equipo recibe alertas** → Seguimiento garantizado

---

## 🆘 Problemas Comunes

| Problema | Solución Rápida |
|----------|-----------------|
| "Credentials not found" | Reconfigura las credenciales en cada nodo |
| "Sheet not found" | Verifica el ID de la hoja y que se llame "Clientes" |
| Emails no llegan | Revisa spam, credenciales SMTP y emails "fromEmail" |
| Workflow no se activa | Verifica toggle en verde y que n8n tenga acceso a internet |

---

## 📞 ¿Necesitas más?

- **Documentación completa**: Ver `README_Client_Onboarding.md`
- **Comunidad n8n**: https://community.n8n.io
- **Docs oficiales**: https://docs.n8n.io

---

**¡Tu sistema de onboarding automático está listo en menos de 5 minutos!** 🚀
