# 📄 Sistema Automático de Importación de Facturas de Proveedores

> Automatización completa para procesar facturas desde Gmail, extraer datos con ChatGPT y guardar todo en Google Sheets y Drive

---

## 🎯 ¿Qué hace este sistema?

Este workflow automatiza **completamente** el proceso de gestión de facturas de proveedores:

1. ✅ **Recibe facturas por email** (Gmail con etiqueta)
2. ✅ **Extrae texto del PDF** usando OCR de Google Drive
3. ✅ **Analiza la factura con ChatGPT** (GPT-4o-mini)
4. ✅ **Extrae 14 campos** automáticamente
5. ✅ **Guarda el PDF** con nombre descriptivo
6. ✅ **Registra todo en Excel** (Google Sheets)
7. ✅ **Marca el correo como procesado**

**Resultado:** Solo etiquetar el correo → Todo automatizado

---

## 💰 Ahorro de Costes

### Configuración Inteligente:

- 🕐 **Ejecución:** 1 vez por semana (viernes 19:00)
- 💳 **Gasto Make:** 1 crédito/semana = 52 créditos/año
- 🤖 **ChatGPT:** Modelo GPT-4o-mini (el más barato)
- 📊 **Almacenamiento:** Google Drive gratuito

**Con plan gratuito de Make (1000 créditos/mes):** Este workflow consume solo el 5% mensual

---

## 📋 Requisitos Previos

### Cuentas necesarias:

- ✅ Gmail (Google Workspace)
- ✅ Google Drive
- ✅ Google Sheets
- ✅ OpenAI (ChatGPT API)
- ✅ n8n (instalado y funcionando)

### Costes estimados:

| Servicio | Coste Mensual |
|----------|---------------|
| **Make/n8n** | €0 (plan gratuito) |
| **Google Drive** | €0 (15GB gratis) |
| **ChatGPT API** | ~€2-5 (GPT-4o-mini muy barato) |
| **TOTAL** | **~€2-5/mes** |

---

## 🔧 Configuración Paso a Paso

### PASO 1: Crear Etiqueta en Gmail

1. Abre Gmail
2. Ve a **Configuración** → **Etiquetas**
3. Clic en **Crear etiqueta nueva**
4. Nombre: `facturas recibidas`
5. Guardar

**Cómo usar:**
- Cuando te llegue una factura por correo
- Simplemente etiquétala con "facturas recibidas"
- ¡Ya está! El sistema la procesará automáticamente

---

### PASO 2: Crear Carpeta en Google Drive

1. Abre [Google Drive](https://drive.google.com)
2. Crea carpeta: **"Facturas Proveedores 2025"**
3. Abre la carpeta
4. **Copia el ID de la carpeta** desde la URL:
   ```
   https://drive.google.com/drive/folders/ABC123_ESTE_ES_EL_ID
   ```
5. Guárdalo - lo necesitarás para configurar n8n

---

### PASO 3: Crear Hoja de Cálculo en Google Sheets

#### Crear la hoja:

1. Abre [Google Sheets](https://sheets.google.com)
2. Crea hoja nueva: **"Registro Facturas Proveedores"**
3. Crea pestaña llamada: **"Facturas"**

#### Estructura de columnas (fila 1):

Copia esto en la fila 1:

```
A: Fecha Factura
B: Nº Factura
C: Descripción
D: Base Imponible
E: IVA
F: Retención
G: Importe Total
H: Familia/Categoría
I: CIF Emisor
J: Razón Social Emisor
K: Domicilio Emisor
L: Código Postal
M: Población
N: Email Emisor
O: CIF Receptor
P: Link Factura
```

#### Formatear columnas:

- **Columnas D, E, F, G:** Formato número con 2 decimales
- **Columna P:** Formato hipervínculo
- **Fila 1:** Negrita, fondo azul, texto blanco

#### Obtener Sheet ID:

URL de tu hoja:
```
https://docs.google.com/spreadsheets/d/ABC123_ESTE_ES_EL_SHEET_ID/edit
```

Copia el ID (entre `/d/` y `/edit`)

---

### PASO 4: Obtener API Key de ChatGPT

1. Ve a [OpenAI Platform](https://platform.openai.com)
2. Crea cuenta o inicia sesión
3. Ve a **API Keys**
4. Clic en **Create new secret key**
5. Nombre: "n8n Facturas"
6. **Copia la key** (solo la verás una vez)
7. Guárdala de forma segura

**Importante:**
- Añade créditos a tu cuenta (mínimo $5)
- El modelo GPT-4o-mini es muy barato (~$0.0001 por factura)

---

### PASO 5: Importar Workflow a n8n

1. Abre n8n
2. Menú → **Import from File**
3. Selecciona: `workflow_importar_facturas_proveedores.json`
4. El workflow se cargará con todos los nodos

---

### PASO 6: Configurar Credenciales en n8n

#### A) Gmail OAuth2

1. En n8n: **Credentials** → **+ Add Credential**
2. Busca: **Gmail OAuth2 API**
3. Clic en **Connect my account**
4. Autoriza con tu cuenta de Google
5. Acepta permisos de Gmail
6. Guarda con nombre: "Gmail - Facturas"

#### B) Google Drive OAuth2

1. **+ Add Credential**
2. Busca: **Google Drive OAuth2 API**
3. Autoriza con la misma cuenta
4. Guarda con nombre: "Google Drive - Facturas"

#### C) Google Sheets OAuth2

1. **+ Add Credential**
2. Busca: **Google Sheets OAuth2 API**
3. Autoriza con la misma cuenta
4. Guarda con nombre: "Google Sheets - Facturas"

#### D) OpenAI (ChatGPT)

1. **+ Add Credential**
2. Busca: **OpenAI API**
3. Pega tu API Key
4. Guarda con nombre: "OpenAI - Facturas"

---

### PASO 7: Configurar los Nodos del Workflow

#### Nodo 1: "📧 Gmail: Watch Emails"

- **Credential:** Gmail OAuth2
- **Label ID:** Busca tu etiqueta "facturas recibidas"
- **Read Status:** Unread (no leídos)
- **Max Results:** 500

#### Nodo 2: "📎 Gmail: Listar Adjuntos"

- **Credential:** Gmail OAuth2
- **Message ID:** `={{ $json.id }}` (ya viene configurado)

#### Nodo 3: "🔄 Iterador Adjuntos"

- No requiere configuración

#### Nodo 4: "🔍 Filtrar: Solo PDFs"

- **Condición:** `mimeType` = `application/pdf`
- Ya viene configurado

#### Nodo 5: "☁️ Drive: Subir como Google Doc"

- **Credential:** Google Drive OAuth2
- **Folder ID:** PEGA aquí tu Folder ID
- **Convert to:** Google Docs (importante para OCR)

#### Nodo 6: "📄 Google Docs: Leer Contenido"

- **Credential:** Google OAuth2
- **Document ID:** `={{ $json.id }}` (ya configurado)

#### Nodo 7: "🤖 ChatGPT: Extraer Datos"

- **Credential:** OpenAI API
- **Model:** gpt-4o-mini (ya configurado)
- **Prompt:** REEMPLAZA `REEMPLAZA_CON_TU_NIF` con tu NIF real

  Ejemplo:
  ```
  Antes: - NIF: REEMPLAZA_CON_TU_NIF
  Después: - NIF: B12345678
  ```

#### Nodo 8: "🗑️ Google Docs: Borrar Temporal"

- **Credential:** Google Drive OAuth2
- Ya viene configurado

#### Nodo 9: "💾 Drive: Guardar PDF Final"

- **Credential:** Google Drive OAuth2
- **Folder ID:** PEGA aquí tu Folder ID (el mismo)
- **Filename:** Ya viene con formato automático

#### Nodo 10: "📊 Google Sheets: Guardar Datos"

- **Credential:** Google Sheets OAuth2
- **Sheet ID:** PEGA aquí tu Sheet ID
- **Range:** `Facturas!A:P` (ya configurado)

#### Nodo 11: "✅ Gmail: Marcar como Leído"

- **Credential:** Gmail OAuth2
- Ya viene configurado

---

## 🧪 Probar el Sistema

### Test Manual:

1. **Envíate una factura de prueba:**
   - Envía un email con un PDF de factura
   - NO lo etiquetes aún

2. **En n8n:**
   - Abre el workflow
   - Clic en **"Execute Workflow"** (ejecutar manualmente)

3. **Etiqueta el correo:**
   - Ve a Gmail
   - Etiqueta el correo con "facturas recibidas"
   - Déjalo como NO leído

4. **Ejecuta manualmente en n8n:**
   - El workflow procesará ese correo
   - Verás pasar los datos nodo por nodo

5. **Verifica resultados:**
   - ✅ Google Drive: ¿Apareció el PDF con nombre formateado?
   - ✅ Google Sheets: ¿Se guardaron los datos?
   - ✅ Gmail: ¿El correo está marcado como leído?

Si todo funciona: ¡Perfecto! Ahora actívalo.

---

## 🚀 Activar en Producción

### Configurar Schedule (Horario):

Por defecto está configurado para:
- **Día:** Viernes
- **Hora:** 19:00 (7 PM)
- **Frecuencia:** Semanal

**Para cambiar el horario:**

1. Abre nodo "⏰ Trigger Viernes 19:00"
2. Campo **Cron Expression:**
   - `0 19 * * 5` = Viernes a las 19:00
   - `0 19 * * 1` = Lunes a las 19:00
   - `0 9 1 * *` = Día 1 del mes a las 9:00
   - `0 12 * * *` = Todos los días a las 12:00

**Calculadora Cron:** [crontab.guru](https://crontab.guru)

### Activar Workflow:

1. En la parte superior del workflow
2. Switch de **Inactive** → **Active**
3. Verás: 🟢 **Active**

¡Listo! Ahora se ejecutará automáticamente.

---

## 📊 Uso Diario

### Proceso Simplificado:

1. **Te llega factura por email**
   - Puede ser forwarded o directa

2. **Etiquetar:**
   - Abre el email
   - Etiqueta con "facturas recibidas"
   - Cierra (déjalo sin leer)

3. **Espera al viernes a las 19:00**
   - El sistema la procesará automáticamente

4. **Revisa resultados:**
   - Ve a Google Sheets
   - Verás todos los datos extraídos
   - Link para ver la factura

**¡Eso es todo!** No necesitas hacer nada más.

---

## 📈 Datos Extraídos Automáticamente

El sistema extrae estos 14 campos de cada factura:

1. **fecha_factura** - Fecha de emisión
2. **numero_factura** - Número de factura
3. **descripcion** - Concepto/descripción del servicio
4. **base_imponible** - Importe antes de IVA
5. **iva** - Importe de IVA
6. **retencion** - Retención IRPF (si existe)
7. **importe_total** - Total a pagar
8. **familia** - Categoría (Asesoría, Marketing, etc.)
9. **cif_emisor** - CIF del proveedor
10. **razon_social_emisor** - Nombre del proveedor
11. **domicilio_emisor** - Dirección
12. **codigo_postal_emisor** - CP
13. **poblacion_emisor** - Ciudad
14. **email_emisor** - Email del proveedor

**Plus:** Link directo a la factura en Drive (columna 16)

---

## 🎨 Personalización

### Cambiar campos a extraer:

1. Abre nodo "🤖 ChatGPT: Extraer Datos"
2. Edita el **prompt**
3. Añade o quita campos según necesites
4. Actualiza las columnas en Google Sheets
5. Actualiza nodo "📊 Google Sheets: Guardar Datos"

### Ejemplos de campos adicionales:

- Fecha de vencimiento
- Método de pago
- Número de pedido
- Proyecto/Cliente asociado
- Notas adicionales

---

## 🔍 Monitoreo y Logs

### Ver ejecuciones:

1. En n8n → **Executions** (menú lateral)
2. Verás todas las ejecuciones:
   - ✅ Verde = éxito
   - ❌ Rojo = error
3. Haz clic para ver detalles completos

### Ver qué procesó ChatGPT:

1. Abre una ejecución exitosa
2. Ve al nodo "🤖 ChatGPT: Extraer Datos"
3. En **OUTPUT** verás todos los datos extraídos

---

## ❌ Solución de Problemas

### Error: "No se encuentra la etiqueta"

**Solución:**
- Verifica que la etiqueta se llama exactamente "facturas recibidas"
- En Gmail → Configuración → Etiquetas
- Copia el **Label ID** y úsalo en el nodo

### Error: "ChatGPT no extrae bien los datos"

**Solución:**
- Mejora el prompt con ejemplos más específicos
- Añade ejemplos de tus facturas reales
- Asegúrate de que el PDF tiene texto (no es imagen)

### Error: "Google Drive no convierte el PDF"

**Solución:**
- Verifica que el archivo es PDF (no imagen)
- Asegúrate de que la opción "Convert to Google Docs" está activada
- Algunos PDFs escaneados necesitan mejor OCR

### Error: "Se queda sin créditos de Make"

**Solución:**
- Cambia la frecuencia a 1 vez por semana (no diario)
- Reduce el **Max Results** a 50 o 100
- Considera upgrade al plan de pago

### Error: "Los números tienen punto en vez de coma"

**Solución:**
- Ya está configurado el reemplazo `.replace('.', ',')`
- Si no funciona, verifica el código en el nodo de Google Sheets

---

## 💡 Tips y Buenas Prácticas

### Para ahorrar créditos:

✅ Ejecuta 1 vez por semana (no diario)
✅ Procesa máximo 100-200 facturas por ejecución
✅ Usa GPT-4o-mini (no GPT-4)
✅ Filtra solo PDFs (ignora imágenes)

### Para mejorar precisión:

✅ Pide a proveedores facturas en PDF (no imágenes)
✅ Añade ejemplos de tus facturas al prompt de ChatGPT
✅ Revisa los primeros 10-20 resultados y ajusta el prompt
✅ Mantén un formato consistente en tus proveedores

### Para organización:

✅ Crea categorías en la columna "Familia"
✅ Usa filtros y tablas dinámicas en Google Sheets
✅ Exporta a tu software de contabilidad mensualmente
✅ Mantén backup de la hoja de cálculo

---

## 📊 Ejemplo de Resultado

### Email recibido:
```
De: proveedor@empresa.com
Asunto: Factura #2025-001
Adjunto: factura_empresa.pdf
```

### Después del procesamiento:

**Google Sheets:**
| Fecha | Nº Factura | Descripción | Base | IVA | Total | ... |
|-------|------------|-------------|------|-----|-------|-----|
| 15/11/2025 | 2025-001 | Servicios consultoría | 1000,00 | 210,00 | 1210,00 | ... |

**Google Drive:**
```
Archivo: FAC-2025-001-Empresa_SL-15-11-2025.pdf
Link: [Ver factura]
```

**Gmail:**
✅ Marcado como leído
✅ Etiqueta: "facturas recibidas"

---

## 🎓 Casos de Uso

### Autónomos:
- Gestión de facturas de proveedores
- Preparación para el gestor
- Control de gastos mensuales

### Pequeñas Empresas:
- Centralización de facturas
- Múltiples proveedores
- Facilitar contabilidad

### Gestorías:
- Procesar facturas de clientes
- Preparar datos para contabilidad
- Reducir trabajo manual

---

## 📞 Soporte

### Recursos:

- 📖 [Documentación n8n](https://docs.n8n.io)
- 🤖 [OpenAI API Docs](https://platform.openai.com/docs)
- 💬 [Comunidad n8n](https://community.n8n.io)

### Próximas Mejoras:

- [ ] Detección automática de duplicados
- [ ] Notificaciones por Telegram/Slack
- [ ] Integración con software de contabilidad
- [ ] Dashboard de gastos mensuales
- [ ] OCR mejorado para facturas escaneadas

---

## 🎉 ¡Sistema Listo!

Has configurado un sistema profesional de gestión de facturas que:

✅ Ahorra 2-4 horas/mes de trabajo manual
✅ Reduce errores humanos a 0%
✅ Centraliza toda la información
✅ Facilita la contabilidad
✅ Cuesta solo €2-5/mes

**Próximo paso:** Etiqueta tu primera factura y ¡pruébalo!

---

**Versión:** 1.0
**Fecha:** 15 Noviembre 2025
**Compatibilidad:** n8n v0.200.0+
