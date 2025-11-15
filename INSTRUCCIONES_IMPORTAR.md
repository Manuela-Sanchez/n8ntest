# 📥 Cómo Importar el Workflow a n8n

## ⚡ Archivo Correcto

Usa este archivo: **`workflow_facturacion_simple.json`**

Este es compatible con n8n versiones 0.200.0 y superiores.

---

## 🔧 Pasos para Importar

### 1. Abrir n8n

Accede a tu instalación de n8n:
- Local: http://localhost:5678
- Cloud: https://app.n8n.cloud
- Tu servidor: https://tu-dominio.com

### 2. Importar el Workflow

**Opción A - Desde la interfaz:**

1. En n8n, haz clic en el **menú "☰"** (hamburguesa) arriba a la izquierda
2. Selecciona **"Import from File"** o **"Workflows" → "Import"**
3. Busca y selecciona: `workflow_facturacion_simple.json`
4. El workflow se cargará automáticamente

**Opción B - Copiar y pegar:**

1. Abre el archivo `workflow_facturacion_simple.json` con un editor de texto
2. Copia TODO el contenido (Ctrl+A, Ctrl+C)
3. En n8n, haz clic en el **menú "☰"**
4. Selecciona **"Import from URL or String"**
5. Pega el contenido (Ctrl+V)
6. Haz clic en **"Import"**

---

## ✅ Verificar que se Importó

Deberías ver **8 nodos** en el canvas:

1. ✅ Cada día 1 a las 9 AM (Schedule Trigger)
2. ✅ Leer Clientes Google Sheets
3. ✅ Filtrar Clientes Activos
4. ✅ Calcular IVA y Totales
5. ✅ Enviar Email Factura
6. ✅ Guardar en Histórico
7. ✅ Generar Reporte
8. ✅ Enviar Reporte Admin

**Todos conectados en línea de izquierda a derecha.**

---

## ⚙️ Configuración Necesaria

### Paso 1: Configurar Credenciales

Antes de nada, crea estas credenciales en n8n:

#### A) Google Sheets OAuth2:

1. Ve a **Settings → Credentials** (o el icono de llave 🔑)
2. Clic en **"+ Add Credential"**
3. Busca: **"Google Sheets OAuth2 API"**
4. Clic en **"Connect my account"**
5. Autoriza con tu cuenta de Google
6. Guarda con un nombre como: **"Google Sheets - Facturación"**

#### B) SMTP (para emails):

1. **+ Add Credential**
2. Busca: **"SMTP"**
3. Configura:

**Si usas Gmail:**
```
Host: smtp.gmail.com
Port: 587
Security: TLS
User: tu-email@gmail.com
Password: [App Password de Google - ver más abajo]
```

**Para crear App Password en Gmail:**
- Ve a: https://myaccount.google.com/apppasswords
- Crea una nueva app password
- Copia el código de 16 caracteres
- Pégalo en el campo Password de n8n

4. Guarda con un nombre como: **"SMTP - Gmail"**

---

### Paso 2: Reemplazar IDs

Necesitas cambiar estos valores en 3 nodos:

#### Nodo 2: "Leer Clientes Google Sheets"

1. Doble clic en el nodo
2. Campo **"Document"** o **"documentId"**: Pega tu **Sheet ID**
3. Campo **"Sheet"** o **"sheetName"**: Escribe **"Clientes"**
4. Campo **"Credential to connect with"**: Selecciona tu credencial de Google Sheets
5. Guarda

#### Nodo 6: "Guardar en Histórico"

1. Doble clic en el nodo
2. Campo **"Document"** o **"documentId"**: Pega tu **Sheet ID** (el mismo)
3. Campo **"Sheet"** o **"sheetName"**: Escribe **"Facturas Emitidas"**
4. Campo **"Credential to connect with"**: Selecciona tu credencial de Google Sheets
5. Guarda

#### Nodo 5: "Enviar Email Factura"

1. Doble clic en el nodo
2. Campo **"From Email"**: Cambia por tu email de empresa (ej: facturacion@tuempresa.com)
3. Campo **"Credential to connect with"**: Selecciona tu credencial SMTP
4. Guarda

#### Nodo 8: "Enviar Reporte Admin"

1. Doble clic en el nodo
2. Campo **"From Email"**: Cambia por tu email de sistema (ej: sistema@tuempresa.com)
3. Campo **"To Email"**: Cambia por tu email personal o de administración
4. Campo **"Credential to connect with"**: Selecciona tu credencial SMTP
5. Guarda

---

## 🧪 Probar el Workflow

### Test 1: Leer Google Sheets

1. Haz clic en el nodo **"Leer Clientes Google Sheets"**
2. Arriba del nodo, clic en **"Execute Node"** (o el botón ▶️)
3. **¿Ves datos en el OUTPUT?** ✅ Funciona

**Si da error:**
- Verifica el Sheet ID
- Verifica que la pestaña se llama "Clientes"
- Verifica las credenciales de Google

### Test 2: Filtrar Clientes

1. Haz clic en el nodo **"Filtrar Clientes Activos"**
2. Clic en **"Execute Node"**
3. **¿Solo aparecen clientes con activo = "SI"?** ✅ Funciona

### Test 3: Calcular Totales

1. Haz clic en el nodo **"Calcular IVA y Totales"**
2. Clic en **"Execute Node"**
3. En el OUTPUT verifica que aparecen:
   - `invoice_id` (ej: FAC-202511-ABC123)
   - `monto_total` (con IVA incluido)
   - `iva_monto`
   - `fecha_emision`
   - `fecha_vencimiento`

**¿Todo correcto?** ✅ Funciona

### Test 4: Workflow Completo (SIN enviar emails)

**IMPORTANTE: Desactiva temporalmente los nodos de email para no enviar correos de prueba**

1. Haz clic derecho en el nodo **"Enviar Email Factura"**
2. Selecciona **"Deactivate"** (se pondrá gris/desactivado)
3. Haz lo mismo con **"Enviar Reporte Admin"**

4. Ahora ejecuta el workflow completo:
   - Clic en el botón **"Execute Workflow"** (arriba a la derecha)
   - Observa cómo se ejecuta cada nodo
   - Verde ✅ = éxito

5. Verifica:
   - ✅ Se leyeron los clientes
   - ✅ Se filtraron correctamente
   - ✅ Se calcularon los totales
   - ✅ (Los emails están desactivados, está bien)
   - ✅ Se guardó en "Facturas Emitidas" de Google Sheets

6. **Abre tu Google Sheet** y revisa la pestaña **"Facturas Emitidas"**
   - ¿Aparecen las facturas? ✅ Perfecto

### Test 5: Enviar Email de Prueba

**Solo cuando todo lo demás funcione:**

1. En Google Sheets, crea un cliente de prueba:
```
TEST001 | Prueba | TU_EMAIL@gmail.com | 100 | 0.21 | Prueba del Sistema | Test | 30 | Pendiente | | SI | Solo prueba
```

2. **Reactiva los nodos de email:**
   - Clic derecho en "Enviar Email Factura" → **"Activate"**
   - Clic derecho en "Enviar Reporte Admin" → **"Activate"**

3. Ejecuta el workflow completo

4. **Revisa tu email** (TU_EMAIL@gmail.com)
   - ¿Llegó la factura? ✅
   - ¿Llegó el reporte de admin? ✅

5. **Limpia:**
   - Elimina la fila TEST001 de Google Sheets
   - Elimina la factura de prueba de "Facturas Emitidas"

---

## 🎯 Activar la Automatización

**Cuando todo funcione correctamente:**

1. En la parte superior del workflow
2. Busca el **switch "Inactive" / "Active"**
3. Cámbialo a **"Active"** (se pondrá verde 🟢)

4. Guarda el workflow:
   - Ctrl+S o clic en **"Save"**

**¡Listo!** El workflow se ejecutará automáticamente cada día 1 del mes a las 9:00 AM.

---

## 📊 Monitorear Ejecuciones

### Ver historial de ejecuciones:

1. En el menú lateral de n8n, ve a **"Executions"**
2. Verás todas las ejecuciones:
   - ✅ Verde = éxito
   - ❌ Rojo = error
3. Haz clic en cualquiera para ver detalles

### Ver facturas emitidas:

1. Abre tu Google Sheet
2. Ve a la pestaña **"Facturas Emitidas"**
3. Verás todas las facturas generadas con:
   - ID de factura
   - Cliente
   - Montos
   - Fechas

---

## ⚙️ Personalización

### Cambiar el horario:

1. Abre el nodo **"Cada día 1 a las 9 AM"**
2. Cambia el cron expression:
   - `0 9 1 * *` = Día 1 a las 9 AM
   - `0 10 1 * *` = Día 1 a las 10 AM
   - `0 9 15 * *` = Día 15 a las 9 AM

### Cambiar el diseño del email:

1. Abre el nodo **"Enviar Email Factura"**
2. Edita el campo **"Message"** (HTML)
3. Cambia colores, textos, estructura
4. Guarda

### Agregar más campos:

1. En el nodo **"Calcular IVA y Totales"**
2. Edita el JavaScript
3. Agrega más campos al objeto `json`

---

## ❌ Errores Comunes

| Error | Solución |
|-------|----------|
| "ERROR: The document with id ... could not be found" | Verifica el Sheet ID |
| "ERROR: The sheet with name ... does not exist" | Verifica que la pestaña existe y se llama exactamente "Clientes" |
| "ERROR: Invalid credentials" | Vuelve a crear las credenciales de Google |
| "ERROR: Cannot send email" | Verifica credenciales SMTP y App Password |
| "ERROR: Cannot read property 'monto_base'" | Verifica que las columnas en Sheets tienen los nombres correctos |
| Workflow no se ejecuta automáticamente | Verifica que está en "Active" (verde 🟢) |

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los logs:**
   - Executions → Clic en la ejecución fallida
   - Lee el mensaje de error completo

2. **Verifica la configuración:**
   - Sheet ID correcto
   - Nombres de pestañas correctos
   - Credenciales válidas

3. **Consulta la documentación:**
   - Lee `GUIA_CONFIGURACION_COMPLETA.md`
   - Lee `CONFIGURACION_RAPIDA.md`

4. **Comunidad de n8n:**
   - https://community.n8n.io
   - Busca tu error o pregunta

---

## ✅ Checklist Final

Antes de activar en producción:

- [ ] Workflow importado correctamente
- [ ] Credenciales de Google Sheets configuradas
- [ ] Credenciales de SMTP configuradas
- [ ] Sheet ID reemplazado en los 2 nodos
- [ ] Emails personalizados (from y to)
- [ ] Test de lectura de Sheets ✅
- [ ] Test de cálculos ✅
- [ ] Test de guardado en histórico ✅
- [ ] Test de envío de email ✅
- [ ] Cliente de prueba eliminado
- [ ] Workflow en "Active" 🟢
- [ ] Datos reales de clientes en Sheets

---

## 🎉 ¡Todo Listo!

Si completaste todos los pasos, tu sistema de facturación automática está funcionando.

**Próxima ejecución:** Día 1 del próximo mes a las 9:00 AM (hora de Madrid)

¡Disfruta de tu nuevo sistema automatizado! 🚀

---

**Versión:** 2.0 Simple
**Fecha:** 15 Nov 2025
**Compatible con:** n8n v0.200.0+
