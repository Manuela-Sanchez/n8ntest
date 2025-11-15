# ⚡ Configuración Rápida - Checklist

> Usa este checklist para configurar tu sistema de facturación en 30 minutos

---

## 📋 Pre-requisitos

Antes de empezar, asegúrate de tener:

- [ ] n8n instalado y funcionando
- [ ] Cuenta de Google (Gmail)
- [ ] Cuenta de email para enviar facturas (Gmail/SendGrid/SMTP)

---

## 🚀 Paso a Paso Rápido

### 1️⃣ Google Sheets (10 minutos)

**1.1 Crear la hoja:**
- [ ] Ve a https://sheets.google.com
- [ ] Crea nueva hoja: "Facturación Automática"

**1.2 Copiar estructura:**
- [ ] Abre: `ESTRUCTURA_GOOGLE_SHEETS_FACTURACION.md`
- [ ] Copia los encabezados en la fila 1
- [ ] Crea 3 pestañas: "Clientes", "Facturas Emitidas", "Configuracion"

**1.3 Agregar datos de prueba:**
- [ ] Copia al menos 1 cliente de ejemplo
- [ ] Asegúrate de que `activo = SI`

**1.4 Obtener Sheet ID:**
```
URL: https://docs.google.com/spreadsheets/d/[COPIA_ESTE_ID]/edit

Tu Sheet ID:
┌─────────────────────────────────────────────┐
│                                             │
│  Pega aquí: _____________________________  │
│                                             │
└─────────────────────────────────────────────┘
```

---

### 2️⃣ Google Drive (5 minutos)

**2.1 Crear carpeta:**
- [ ] Ve a https://drive.google.com
- [ ] Crea carpeta: "Facturas 2025"

**2.2 Obtener Folder ID:**
```
URL: https://drive.google.com/drive/folders/[COPIA_ESTE_ID]

Tu Folder ID:
┌─────────────────────────────────────────────┐
│                                             │
│  Pega aquí: _____________________________  │
│                                             │
└─────────────────────────────────────────────┘
```

---

### 3️⃣ n8n - Credenciales (10 minutos)

**3.1 Google Sheets OAuth2:**
- [ ] En n8n: Credentials → + Add Credential
- [ ] Busca: "Google Sheets OAuth2"
- [ ] Autoriza con tu cuenta de Google
- [ ] Nombre sugerido: "Google Sheets - Facturación"

**3.2 Google Drive OAuth2:**
- [ ] + Add Credential
- [ ] Busca: "Google Drive OAuth2"
- [ ] Autoriza con la misma cuenta
- [ ] Nombre sugerido: "Google Drive - Facturas"

**3.3 Email (elige una opción):**

**Opción A - Gmail (para pruebas):**
- [ ] Ve a https://myaccount.google.com/apppasswords
- [ ] Crea "App Password"
- [ ] En n8n: + Add Credential → "SMTP"
- [ ] Configura:
  ```
  Host: smtp.gmail.com
  Port: 587
  User: tu-email@gmail.com
  Password: [App Password de 16 caracteres]
  ```

**Opción B - SendGrid (para producción):**
- [ ] Crea cuenta en https://sendgrid.com
- [ ] Obtén API Key
- [ ] En n8n: + Add Credential → "SendGrid"
- [ ] Pega tu API Key

---

### 4️⃣ n8n - Importar Workflow (5 minutos)

**4.1 Importar archivo:**
- [ ] En n8n: + → Import from File
- [ ] Selecciona: `WORKFLOW_FACTURACION_MEJORADO.json`
- [ ] El workflow se cargará

**4.2 Configurar IDs:**

Reemplaza estos valores en los nodos:

| # | Nodo | Campo | Tu Valor |
|---|------|-------|----------|
| 1 | **Google Sheets: Leer Clientes** | `documentId` | [Tu Sheet ID] |
| 2 | **Google Sheets: Registrar en Histórico** | `documentId` | [Tu Sheet ID] |
| 3 | **Google Sheets: Actualizar Estado** | `documentId` | [Tu Sheet ID] |
| 4 | **Google Drive: Guardar PDF** | `folderId` | [Tu Folder ID] |

**Cómo reemplazar:**
1. Doble clic en el nodo
2. Busca el campo `documentId` o `folderId`
3. Borra el valor "REEMPLAZA_CON_TU..."
4. Pega tu ID
5. Guarda

**4.3 Asignar credenciales:**

Para cada nodo de Google:
- [ ] Doble clic en el nodo
- [ ] Campo "Credential to connect with"
- [ ] Selecciona la credencial creada
- [ ] Guarda

---

## ✅ Verificación Rápida

### Test 1: Leer Google Sheets

- [ ] Abre nodo "Google Sheets: Leer Clientes"
- [ ] Clic "Execute Node"
- [ ] ¿Ves tus datos? → ✅ Funciona

**Si falla:**
- Verifica Sheet ID
- Verifica credenciales
- Verifica nombre de pestaña: "Clientes"

---

### Test 2: Calcular Totales

- [ ] Ejecuta nodo "Code: Calcular Totales"
- [ ] Verifica output:
  - ¿Aparece `invoice_id`? ✅
  - ¿Aparece `monto_total`? ✅
  - ¿Aparece `iva_monto`? ✅

---

### Test 3: Guardar en Drive (OPCIONAL)

⚠️ **Este nodo necesita un PDF generado previamente**

Si tienes servicio de PDFs:
- [ ] Configura URL en nodo "HTTP: Generar Factura PDF"
- [ ] Ejecuta el flujo hasta "Google Drive: Guardar PDF"
- [ ] Verifica que el archivo aparezca en Drive

Si NO tienes servicio de PDFs:
- [ ] **Desactiva** este nodo por ahora
- [ ] **Desactiva** el nodo de email temporalmente
- [ ] Prueba el resto del flujo

---

### Test 4: Email de Prueba

**Antes de enviar emails reales:**

1. **Crea un cliente de prueba:**
   ```
   TEST001 | Mi Empresa Test | TU_EMAIL@gmail.com | 100 | 0.21 | Prueba | Test | 30 | Pendiente | | SI | Prueba
   ```

2. **Configurar emails:**
   - [ ] Abre nodo "Email: Enviar Factura"
   - [ ] Verifica campo `fromEmail` (tu email de empresa)
   - [ ] Asigna credencial de email
   - [ ] Guarda

3. **Probar:**
   - [ ] Ejecuta el workflow completo
   - [ ] Revisa tu email (TU_EMAIL@gmail.com)
   - [ ] ¿Llegó el email? ✅

4. **Limpiar:**
   - [ ] Elimina el cliente TEST001 de Google Sheets

---

## 🎯 Activación Final

**Cuando todo funcione:**

### Configurar datos reales:

- [ ] Reemplaza emails de prueba por los reales
- [ ] En nodo "Email: Enviar Reporte a Administración":
  - Campo `toEmail`: tu email de administración
  - Campo `fromEmail`: sistema@tuempresa.com

### Personalizar emails:

- [ ] Nodo "Email: Enviar Factura"
  - Edita el HTML si quieres cambiar diseño
  - Cambia colores, logo, texto

### Activar workflow:

- [ ] En la parte superior: Switch de Inactive → **Active**
- [ ] Verás: 🟢 Active

**¡Listo!** El sistema se ejecutará automáticamente cada día 1 del mes a las 9 AM.

---

## 📊 Monitoreo

### Ver ejecuciones:

- [ ] Ve a "Executions" en el menú lateral de n8n
- [ ] Verás todas las ejecuciones pasadas
- [ ] Verde ✅ = éxito
- [ ] Rojo ❌ = error

### Revisar histórico:

- [ ] Abre tu Google Sheet
- [ ] Pestaña "Facturas Emitidas"
- [ ] Verás todas las facturas generadas

---

## 🔧 Personalización Rápida

### Cambiar horario de ejecución:

1. Abre nodo "Trigger: Cada día 1 a las 9 AM"
2. Modifica:
   - `triggerAt`: "09:00" → "10:00" (por ejemplo)
   - `monthDay`: 1 → 15 (ejecutar día 15)

### Cambiar IVA:

1. En Google Sheets, columna `iva_rate`
2. Cambia `0.21` por tu tasa (ej: `0.10` para 10%)

### Cambiar moneda:

1. Nodo "Code: Calcular Totales"
2. Busca: `moneda: 'EUR'`
3. Cambia a: `moneda: 'USD'` (o la que necesites)

---

## 📞 ¿Necesitas Ayuda?

### Errores comunes:

| Error | Solución |
|-------|----------|
| "Could not find sheet" | Verifica Sheet ID y nombre de pestaña |
| "Invalid credentials" | Vuelve a crear credenciales de Google |
| "Email not sent" | Verifica credenciales SMTP/SendGrid |
| "Cannot read property..." | Verifica nombres de columnas en Sheets |

### Documentación completa:

📖 Lee: `GUIA_CONFIGURACION_COMPLETA.md` para tutorial detallado

---

## ✅ Checklist Final

Antes de dar por terminado:

- [ ] Google Sheets creada y configurada
- [ ] Google Drive carpeta creada
- [ ] Credenciales de n8n configuradas (Google + Email)
- [ ] Workflow importado
- [ ] Sheet ID y Folder ID configurados
- [ ] Test de lectura de sheets ✅
- [ ] Test de cálculos ✅
- [ ] Test de email enviado ✅
- [ ] Datos de empresa configurados
- [ ] Clientes reales agregados a Sheets
- [ ] Workflow activado 🟢

---

## 🎉 ¡Felicidades!

Si completaste todo el checklist, tu sistema de facturación automática está **100% operativo**.

**Ahora:**
- ⏰ Ahorrarás 2-4 horas cada mes
- 💶 Facturas con IVA calculado automáticamente
- 📧 Emails enviados sin que lo recuerdes
- 📊 Histórico completo automático

**Próxima ejecución:** Día 1 del próximo mes a las 9:00 AM 🚀

---

**Tiempo total estimado de configuración:** 30-45 minutos

**Versión:** 2.0 | **Fecha:** 15 Nov 2025
