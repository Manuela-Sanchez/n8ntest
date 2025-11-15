# 🚀 Guía Completa: Sistema de Facturación Automática con n8n

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Google Sheets](#configuracion-google-sheets)
3. [Configuración de Google Drive](#configuracion-google-drive)
4. [Configuración de n8n](#configuracion-n8n)
5. [Importar el Workflow](#importar-workflow)
6. [Configurar Credenciales](#configurar-credenciales)
7. [Probar el Sistema](#probar-sistema)
8. [Solución de Problemas](#solucion-problemas)

---

## 1. Requisitos Previos

### ✅ Checklist de lo que necesitas:

- [ ] Cuenta de Google (Gmail)
- [ ] n8n instalado y funcionando
- [ ] Servicio de generación de PDFs (o alternativa)
- [ ] Servicio de email configurado (SMTP, SendGrid, etc.)
- [ ] Datos de tu empresa para las facturas

### Opciones de instalación de n8n:

#### Opción A: n8n Cloud (Más Fácil)
```
1. Ve a https://n8n.io
2. Crea una cuenta
3. Ya está listo para usar
```

#### Opción B: Docker (Recomendado para Local)
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

#### Opción C: npm (Para desarrolladores)
```bash
npm install n8n -g
n8n
```

Accede a: `http://localhost:5678`

---

## 2. Configuración de Google Sheets

### Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Clic en "+ Nuevo" → Hoja de cálculo en blanco
3. Nómbrala: **"Facturación Automática - [Nombre de tu Empresa]"**

### Paso 2: Crear las Pestañas

Crea **3 pestañas** (hojas) en el documento:

#### Pestaña 1: **"Clientes"**

Copia y pega esto en la fila 1:

```
row_id_en_sheets	cliente	email_cliente	monto_base	iva_rate	concepto	forma_pago	dias_vencimiento	estado	fecha_ultima_factura	activo	notas
```

**Datos de ejemplo** (copia desde la fila 2):

```
CLI001	Restaurante La Bella	admin@labella.es	850	0.21	Sistema TPV - Renta Mensual	Transferencia bancaria	30	Pendiente		SI	Cliente desde 2023
CLI002	Clínica Dental Sonrisa	facturacion@clinicasonrisa.es	1200	0.21	Software de Gestión	Transferencia bancaria	15	Pendiente		SI	Pago siempre puntual
CLI003	Bufete Jurídico López	contabilidad@bufetelopez.com	2000	0.21	CRM y Automatización	Domiciliación bancaria	45	Pendiente		SI	Contrato anual
```

#### Pestaña 2: **"Facturas Emitidas"**

Encabezados para el histórico:

```
invoice_id	cliente	email_cliente	monto_base	iva_monto	monto_total	fecha_emision	fecha_vencimiento	estado	archivo_drive_url	fecha_envio	periodo
```

*Esta pestaña se llenará automáticamente*

#### Pestaña 3: **"Configuracion"**

Datos de tu empresa:

| Campo | Valor |
|-------|-------|
| Nombre Empresa | Tu Empresa S.L. |
| CIF | B12345678 |
| Dirección | Calle Principal 123 |
| Ciudad | Madrid |
| CP | 28001 |
| Teléfono | +34 912 345 678 |
| Email Facturación | facturacion@tuempresa.com |
| Web | www.tuempresa.com |
| Banco | Banco Santander |
| IBAN | ES12 1234 1234 12 1234567890 |

### Paso 3: Formatear la Hoja "Clientes"

**Congelar la primera fila:**
- Ver → Congelar → 1 fila

**Dar formato a encabezados:**
- Selecciona la fila 1
- Fondo: Azul (#1155CC)
- Texto: Blanco
- Negrita

**Validación de datos:**

1. **Columna K (activo):**
   - Selecciona K2:K1000
   - Datos → Validación de datos
   - Criterios: Lista de elementos
   - Valores: `SI,NO`

2. **Columna I (estado):**
   - Selecciona I2:I1000
   - Datos → Validación de datos
   - Criterios: Lista de elementos
   - Valores: `Pendiente,Emitida,Pagada,Cancelada`

3. **Columna C (email):**
   - Selecciona C2:C1000
   - Datos → Validación de datos
   - Criterios: Es un email válido

### Paso 4: Obtener el Sheet ID

1. Mira la URL de tu Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/1ABC-XYZ_ESTE_ES_EL_ID/edit
   ```

2. **Copia el ID** (la parte entre `/d/` y `/edit`)

3. **Guárdalo** - lo necesitarás para configurar n8n

---

## 3. Configuración de Google Drive

### Paso 1: Crear Carpeta para Facturas

1. Ve a [Google Drive](https://drive.google.com)
2. Clic derecho → Nueva carpeta
3. Nombre: **"Facturas 2025"**
4. Dentro, crea subcarpetas por mes si quieres:
   - Enero 2025
   - Febrero 2025
   - etc.

### Paso 2: Obtener el Folder ID

1. Abre la carpeta "Facturas 2025"
2. Mira la URL:
   ```
   https://drive.google.com/drive/folders/ABC123_ESTE_ES_EL_FOLDER_ID
   ```
3. **Copia el Folder ID**
4. **Guárdalo** - lo necesitarás para n8n

---

## 4. Configuración de n8n

### Paso 1: Crear Credenciales de Google

#### A) Credenciales para Google Sheets:

1. En n8n, ve a: **Credentials** (menú lateral)
2. Clic en **+ Add Credential**
3. Busca: **Google Sheets OAuth2 API**
4. Sigue el asistente:
   - Autoriza con tu cuenta de Google
   - Acepta los permisos solicitados

#### B) Credenciales para Google Drive:

1. **+ Add Credential**
2. Busca: **Google Drive OAuth2 API**
3. Autoriza con la misma cuenta de Google

### Paso 2: Configurar Email (SMTP)

Opciones:

#### Opción A: Gmail (para pruebas)

1. **+ Add Credential** → **SMTP**
2. Configura:
   ```
   Host: smtp.gmail.com
   Port: 587
   User: tu-email@gmail.com
   Password: [App Password de Google]
   ```

**Importante:** Necesitas crear una "App Password" en tu cuenta de Google:
- https://myaccount.google.com/apppasswords

#### Opción B: SendGrid (recomendado para producción)

1. Crea cuenta en [SendGrid](https://sendgrid.com)
2. Obtén tu API Key
3. En n8n: **+ Add Credential** → **SendGrid**
4. Pega tu API Key

#### Opción C: Mailgun, AWS SES, etc.

Similar al proceso de SendGrid.

---

## 5. Importar el Workflow

### Paso 1: Abrir n8n

Accede a tu instalación de n8n (http://localhost:5678 o tu URL cloud)

### Paso 2: Importar

1. En el menú superior, clic en **"+"** → **Import from File**
2. Selecciona el archivo: `WORKFLOW_FACTURACION_MEJORADO.json`
3. El workflow se cargará automáticamente

### Paso 3: Configurar IDs

Necesitas reemplazar estos valores en varios nodos:

| Nodo | Campo | Reemplazar con |
|------|-------|----------------|
| **Google Sheets: Leer Clientes** | `documentId` | Tu Sheet ID |
| **Google Sheets: Registrar en Histórico** | `documentId` | Tu Sheet ID |
| **Google Sheets: Actualizar Estado** | `documentId` | Tu Sheet ID |
| **Google Drive: Guardar PDF** | `folderId` | Tu Folder ID |

**Cómo reemplazar:**

1. Haz doble clic en cada nodo
2. Busca el campo indicado
3. Pega tu ID
4. Clic en **"Execute Node"** para probar
5. Si funciona ✅, guarda

---

## 6. Configurar Credenciales en los Nodos

### Nodos que necesitan credenciales:

1. **Google Sheets: Leer Clientes**
   - Credential: Google Sheets OAuth2

2. **Google Sheets: Registrar en Histórico**
   - Credential: Google Sheets OAuth2

3. **Google Sheets: Actualizar Estado**
   - Credential: Google Sheets OAuth2

4. **Google Drive: Guardar PDF**
   - Credential: Google Drive OAuth2

5. **Email: Enviar Factura**
   - Credential: SMTP / SendGrid

6. **Email: Enviar Reporte a Administración**
   - Credential: SMTP / SendGrid

### Cómo asignar credenciales:

1. Doble clic en el nodo
2. Busca el campo **"Credential to connect with"**
3. Selecciona la credencial que creaste
4. Guarda

---

## 7. Probar el Sistema

### Prueba 1: Leer Datos de Google Sheets

1. Abre el nodo **"Google Sheets: Leer Clientes"**
2. Clic en **"Execute Node"**
3. Deberías ver los datos de tus clientes en el output

**Si falla:**
- Verifica el Sheet ID
- Verifica las credenciales
- Asegúrate de que la pestaña se llama "Clientes"

### Prueba 2: Filtrar Clientes Activos

1. Ejecuta el nodo **"Filtrar: Solo Clientes Activos"**
2. Solo deberían pasar los clientes con `activo = "SI"`

### Prueba 3: Calcular Totales

1. Ejecuta **"Code: Calcular Totales"**
2. Verifica que aparezcan:
   - `invoice_id`
   - `monto_total`
   - `iva_monto`
   - `fecha_emision`
   - `fecha_vencimiento`

### Prueba 4: Workflow Completo (SIN enviar emails)

**IMPORTANTE:** Antes de la primera prueba completa:

1. **Desactiva temporalmente** los nodos de email:
   - Clic derecho → **Disable**
   - Hazlo en:
     - "Email: Enviar Factura"
     - "Email: Enviar Reporte a Administración"

2. **Activa el modo de prueba:**
   - Clic en **"Execute Workflow"** (esquina superior derecha)

3. **Observa el flujo:**
   - Cada nodo se ejecutará en orden
   - Verás los datos pasando de uno a otro
   - Verde = éxito, Rojo = error

4. **Verifica:**
   - ✅ Se leyeron los clientes
   - ✅ Se filtraron correctamente
   - ✅ Se calcularon los totales
   - ✅ (Si usas PDF) Se generó el PDF
   - ✅ Se guardó en Google Drive
   - ✅ Se actualizó el histórico

### Prueba 5: Envío de Email (Prueba Real)

**Cuando todo lo demás funcione:**

1. **Crea un cliente de prueba** en Google Sheets:
   ```
   TEST001	Cliente Prueba	TU_EMAIL@gmail.com	100	0.21	Prueba del Sistema	Test	30	Pendiente		SI	Solo para pruebas
   ```

2. **Reactiva los nodos de email**

3. **Ejecuta el workflow completo**

4. **Revisa tu email** - deberías recibir la factura

5. **Si todo funciona:**
   - ✅ Elimina el cliente de prueba
   - ✅ El sistema está listo

---

## 8. Activar la Automatización

### Configurar el Trigger

El workflow está configurado para ejecutarse:
- **Día:** 1 de cada mes
- **Hora:** 09:00 AM (hora de Madrid)

**Para cambiar la programación:**

1. Abre el nodo **"Trigger: Cada día 1 a las 9 AM"**
2. Modifica:
   - `triggerAt`: Hora de ejecución
   - `monthDay`: Día del mes (1-31)
   - `timezone`: Zona horaria

### Activar el Workflow

1. En la parte superior del workflow
2. Cambia el switch de **Inactive** → **Active**
3. El workflow ahora se ejecutará automáticamente

**Verás:**
```
🟢 Active
```

### Monitorear Ejecuciones

1. Ve a **Executions** (menú lateral)
2. Verás todas las ejecuciones:
   - ✅ Verde = éxito
   - ❌ Rojo = error
3. Haz clic en cualquiera para ver detalles

---

## 9. Solución de Problemas Comunes

### ❌ Error: "Could not find the sheet"

**Solución:**
- Verifica que el Sheet ID sea correcto
- Verifica que la pestaña se llama exactamente "Clientes"
- Asegúrate de que la hoja esté compartida con las credenciales de n8n

### ❌ Error: "Invalid credentials"

**Solución:**
- Recrea las credenciales en n8n
- Vuelve a autorizar con Google
- Verifica que hayas dado todos los permisos

### ❌ Error: "File not found in Drive"

**Solución:**
- Verifica el Folder ID
- Asegúrate de que la carpeta existe
- Comparte la carpeta con las credenciales de n8n si usas Service Account

### ❌ El email no llega

**Solución:**
- Revisa la carpeta de Spam
- Verifica las credenciales SMTP
- Si usas Gmail, activa "App Passwords"
- Prueba con otro servicio (SendGrid)

### ❌ Error: "Cannot read property 'monto_base'"

**Solución:**
- Verifica que las columnas en Google Sheets tengan los nombres exactos
- Asegúrate de que hay datos en las filas
- Revisa que no haya espacios extra en los nombres de columnas

### ❌ El PDF no se genera

**Solución:**
- El nodo HTTP necesita un servicio externo de PDFs
- Opciones:
  - [DocRaptor](https://docraptor.com)
  - [PDF.co](https://pdf.co)
  - [HTML to PDF API](https://htmlpdfapi.com)
  - O puedes crear tu propio servicio con Puppeteer

**Alternativa sin servicio externo:**
- Usa plantillas de Google Docs
- O envía email con HTML (sin PDF adjunto)

---

## 10. Mejoras Opcionales

### 🎨 Personalizar el Email

Edita el nodo **"Email: Enviar Factura"**:
- Cambia colores en el HTML
- Agrega tu logo
- Modifica el mensaje

### 📊 Dashboard de Métricas

Conecta con:
- Google Data Studio
- Tableau
- Power BI

Usa la pestaña "Facturas Emitidas" como fuente de datos.

### 🔔 Notificaciones

Agrega nodos para notificar a través de:
- Slack
- Telegram
- WhatsApp (Twilio)
- Discord

### 💳 Integración con Pagos

Agrega enlaces de pago en el email:
- Stripe
- PayPal
- Redsys

### 📱 App Móvil

Crea una app con:
- n8n webhook para consultar facturas
- Notion para vista móvil
- Airtable con interfaz móvil

---

## 11. Mantenimiento

### Mensual

- [ ] Revisar ejecuciones en n8n
- [ ] Verificar que todos los emails llegaron
- [ ] Comprobar el histórico en Google Sheets
- [ ] Verificar archivos en Google Drive

### Trimestral

- [ ] Actualizar datos de clientes
- [ ] Revisar montos de facturación
- [ ] Backup de Google Sheets
- [ ] Actualizar credenciales si es necesario

### Anual

- [ ] Revisar todo el flujo
- [ ] Optimizar el workflow
- [ ] Actualizar plantillas de email
- [ ] Migrar histórico a archivo

---

## 12. Soporte y Recursos

### Documentación Oficial

- [n8n Docs](https://docs.n8n.io)
- [n8n Community](https://community.n8n.io)
- [Google Sheets API](https://developers.google.com/sheets)

### Videos y Tutoriales

- [n8n YouTube Channel](https://www.youtube.com/c/n8n-io)
- [Automation Tutorials](https://www.youtube.com/results?search_query=n8n+automation)

### Comunidad

- [n8n Discord](https://discord.gg/n8n)
- [n8n Forum](https://community.n8n.io)

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí, tu sistema de facturación automática debería estar funcionando.

**Resumen de lo que tienes:**

✅ Facturación automática cada mes
✅ Cálculo automático de IVA español (21%)
✅ Generación de facturas en PDF
✅ Envío automático por email a clientes
✅ Archivo en Google Drive
✅ Histórico en Google Sheets
✅ Reporte mensual a administración
✅ Actualización de estados

**Ahorrarás:**
- ⏰ 2-4 horas cada mes en facturación manual
- 💰 Costes de software de facturación (€30-100/mes)
- 🐛 Errores humanos en cálculos
- 📧 Olvidos de envío de facturas

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas específicos, por favor proporciona:

1. Captura de pantalla del error
2. Logs de n8n
3. Configuración de los nodos
4. Datos de ejemplo (sin información sensible)

¡Buena suerte con tu sistema de facturación! 🚀
