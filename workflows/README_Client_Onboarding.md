# 🎯 Flujo de Onboarding de Clientes - Automatización Completa

## 📋 Descripción

Este flujo de n8n automatiza completamente el proceso de onboarding de nuevos clientes, desde el registro inicial hasta el seguimiento post-venta.

## ✨ Características Principales

### ✅ Lo que hace este flujo automáticamente:

1. **📝 Captura de datos del cliente** - Formulario web integrado
2. **💾 Registro en base de datos** - Guarda toda la información en Google Sheets
3. **📧 Email de bienvenida personalizado** - Envío automático con diseño profesional
4. **🧾 Generación y envío de factura** - Cálculo automático con IVA incluido
5. **⏰ Recordatorio de pago** - Después de 7 días
6. **🔔 Alerta de seguimiento** - Notificación al equipo de ventas después de 10 días
7. **📊 Actualización de estado** - Tracking completo del proceso

## 🚀 Timeline de Automatización

```
DÍA 0
├─ Cliente completa formulario
├─ Datos guardados en Google Sheets
├─ Email de bienvenida enviado
└─ Factura generada y enviada

DÍA 7
└─ Recordatorio de pago enviado

DÍA 10
└─ Alerta de seguimiento al equipo de ventas
```

## 📦 Requisitos Previos

### 1. Credenciales Necesarias

Necesitarás configurar las siguientes credenciales en n8n:

#### a) **Google Sheets OAuth2**
- Acceso a Google Sheets API
- Permisos de lectura y escritura
- [Guía de configuración](https://docs.n8n.io/integrations/builtin/credentials/google/)

#### b) **SMTP / Email**
- Servidor SMTP configurado
- Puede ser Gmail, Outlook, o servidor propio
- Credenciales: email y contraseña de aplicación

**Ejemplo con Gmail:**
- Host: `smtp.gmail.com`
- Puerto: `587` (TLS) o `465` (SSL)
- Usuario: `tu-email@gmail.com`
- Contraseña: Contraseña de aplicación (no tu contraseña normal)
- [Crear contraseña de aplicación](https://support.google.com/accounts/answer/185833)

### 2. Google Sheet Preparado

Crea una hoja de cálculo con las siguientes columnas:

| ID Cliente | Fecha Registro | Nombre | Email | Teléfono | Empresa | Plan | Precio | Estado | Número Factura | Fecha Vencimiento Pago | Fecha Seguimiento | Notas | Última Actualización |
|------------|----------------|--------|-------|----------|---------|------|--------|--------|----------------|------------------------|-------------------|-------|---------------------|

## 🔧 Instalación y Configuración

### Paso 1: Importar el Flujo

1. Abre tu instancia de n8n
2. Haz clic en **"Workflows"** → **"Add workflow"**
3. Haz clic en el menú **"..."** → **"Import from File"**
4. Selecciona el archivo `Client_Onboarding_Automation.json`

### Paso 2: Configurar Credenciales

#### Google Sheets (Nodos 3 y 11)

1. Haz clic en el nodo **"Guardar en Google Sheets"**
2. En **"Credential to connect with"**, haz clic en **"Create New"**
3. Selecciona **"Google Sheets OAuth2 API"**
4. Sigue el proceso de autenticación con Google
5. Repite para el nodo **"Actualizar Estado Final"** (usa la misma credencial)

#### Email SMTP (Nodos 4, 6, 8, 10)

1. Haz clic en el nodo **"Email de Bienvenida"**
2. En **"Credential to connect with"**, haz clic en **"Create New"**
3. Selecciona **"SMTP"**
4. Completa los datos de tu servidor SMTP:
   ```
   Host: smtp.gmail.com (o tu servidor)
   Port: 587
   User: tu-email@empresa.com
   Password: tu-contraseña-de-aplicación
   Secure: true
   ```
5. Repite para los demás nodos de email (usa la misma credencial)

### Paso 3: Configurar Google Sheets

1. Copia el ID de tu Google Sheet (está en la URL):
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

2. Reemplaza `YOUR_SPREADSHEET_ID_HERE` en estos nodos:
   - **Nodo 3**: "Guardar en Google Sheets"
   - **Nodo 11**: "Actualizar Estado Final"

3. Verifica que el nombre de la hoja coincida (por defecto: "Clientes")

### Paso 4: Personalizar Emails

Edita los siguientes campos en cada nodo de email:

#### Nodo 4: "Email de Bienvenida"
- `fromEmail`: Cambia a tu email de empresa
- Personaliza el contenido HTML según tu marca

#### Nodo 6: "Email con Factura"
- `fromEmail`: Email de facturación
- Actualiza los datos de la empresa en el footer
- Modifica el enlace de pago: `https://tuempresa.com/pagar/...`

#### Nodo 8: "Recordatorio de Pago"
- `fromEmail`: Email de facturación
- Personaliza el tono del mensaje

#### Nodo 10: "Alerta de Seguimiento"
- `toEmail`: Cambia `ventas@tuempresa.com` por el email de tu equipo

### Paso 5: Ajustar Cálculos

En el nodo **"Generar Datos de Factura"** (Nodo 5):

```javascript
// Ajusta la tasa de impuesto según tu país
const taxRate = 0.21;  // 21% IVA (España)
// Cambia a 0.19 (México), 0.16 (Argentina), etc.
```

### Paso 6: Configurar Tiempos de Espera

Puedes modificar los días de espera en:

- **Nodo 7**: "Esperar 7 días" → Cambiar días del recordatorio de pago
- **Nodo 9**: "Esperar 3 días más" → Cambiar días para alerta de seguimiento

### Paso 7: Activar el Flujo

1. Guarda todos los cambios
2. Haz clic en el interruptor **"Inactive"** en la esquina superior derecha
3. Debería cambiar a **"Active"**
4. Copia la URL del formulario (aparecerá en el nodo "Nuevo Cliente (Formulario)")

## 🎨 Personalización Avanzada

### Cambiar Planes y Precios

En el nodo **"Nuevo Cliente (Formulario)"**, modifica las opciones del dropdown:

```json
"fieldOptions": {
  "values": [
    { "option": "Básico - $29/mes" },
    { "option": "Profesional - $79/mes" },
    { "option": "Empresarial - $199/mes" }
  ]
}
```

En el nodo **"Preparar Datos del Cliente"**, actualiza la lógica de precios:

```javascript
"value": "={{ $('Nuevo Cliente (Formulario)').item.json['Plan Contratado'].includes('Básico') ? 29 : $('Nuevo Cliente (Formulario)').item.json['Plan Contratado'].includes('Profesional') ? 79 : 199 }}"
```

### Agregar Campos al Formulario

1. Ve al nodo "Nuevo Cliente (Formulario)"
2. En "Form Fields" → "Add Field"
3. Tipos disponibles:
   - `text`: Campo de texto
   - `email`: Email con validación
   - `number`: Números
   - `dropdown`: Selección única
   - `textarea`: Texto largo
   - `date`: Selector de fecha

### Integrar con CRM

Si usas un CRM específico (HubSpot, Salesforce, etc.), puedes:

1. Agregar un nodo adicional después de "Preparar Datos del Cliente"
2. Conectarlo para crear/actualizar contactos en tu CRM
3. Ejemplos disponibles:
   - HubSpot: `n8n-nodes-base.hubspot`
   - Salesforce: `n8n-nodes-base.salesforce`
   - Pipedrive: `n8n-nodes-base.pipedrive`

## 🧪 Probar el Flujo

### Método 1: Probar con Formulario

1. Copia la URL del formulario (nodo "Nuevo Cliente (Formulario)")
2. Ábrela en tu navegador
3. Completa los datos de prueba
4. Envía el formulario
5. Verifica los emails y Google Sheets

### Método 2: Usar Pin Data

1. Haz clic en el nodo "Nuevo Cliente (Formulario)"
2. Haz clic en "Execute node"
3. Pega datos de prueba en formato JSON:

```json
{
  "Nombre Completo": "Juan Pérez",
  "Email": "juan.perez@ejemplo.com",
  "Teléfono": "+34 612 345 678",
  "Empresa": "Empresa Demo S.A.",
  "Plan Contratado": "Profesional - $79/mes",
  "Notas Adicionales": "Cliente de prueba"
}
```

4. Haz clic en "Pin data"
5. Ejecuta el workflow con el botón "Execute workflow"

## 📊 Monitoreo y Mantenimiento

### Ver Ejecuciones

1. Ve a **"Executions"** en el menú lateral
2. Verás todas las ejecuciones del workflow
3. Haz clic en cada una para ver detalles y logs

### Revisar Errores

Si algo falla:

1. Revisa las credenciales (suelen ser la causa principal)
2. Verifica que el Google Sheet exista y tenga las columnas correctas
3. Comprueba que los emails sean válidos
4. Revisa los logs de ejecución para ver el error específico

### Métricas a Monitorear

- **Tasa de conversión**: % de formularios completados vs. abandonados
- **Tiempo promedio de pago**: Cuántos días tardan en pagar
- **Tasa de respuesta a seguimiento**: % que responden al seguimiento
- **Errores de ejecución**: Identificar problemas recurrentes

## 🔒 Seguridad y Buenas Prácticas

### Datos Sensibles

- ✅ Usa credenciales de aplicación (no contraseñas personales)
- ✅ Activa autenticación de dos factores en Gmail/Google
- ✅ Limita permisos de acceso a Google Sheets
- ✅ No compartas las URLs de webhook públicamente

### Backup

1. Exporta el workflow regularmente
2. Haz backup de tu Google Sheet
3. Guarda copias de las credenciales en un gestor de contraseñas

### GDPR y Privacidad

- Informa a los clientes sobre el procesamiento de datos
- Agrega una política de privacidad en el formulario
- Implementa un proceso para eliminar datos si lo solicitan

## 🆘 Solución de Problemas

### Error: "Credentials not found"

**Solución**: Reconfigura las credenciales en cada nodo que use Google Sheets o Email.

### Error: "Sheet not found"

**Solución**:
1. Verifica que el ID de la hoja sea correcto
2. Comprueba que la credencial de Google tenga acceso a esa hoja
3. Asegúrate de que la hoja se llame exactamente "Clientes"

### Los emails no se envían

**Solución**:
1. Verifica las credenciales SMTP
2. Comprueba que los emails "fromEmail" existan
3. Revisa la carpeta de spam
4. Asegúrate de que el servidor SMTP permita el envío

### El workflow no se activa con el formulario

**Solución**:
1. Verifica que el workflow esté activado (toggle en verde)
2. Comprueba que la URL del formulario sea correcta
3. Revisa que n8n tenga acceso público a internet (webhooks)

### Los Wait nodes no funcionan

**Solución**:
- Los nodos Wait requieren que n8n esté corriendo continuamente
- Si usas n8n self-hosted, asegúrate de que el servidor esté siempre activo
- Para períodos largos, considera usar Schedule Trigger en su lugar

## 🎓 Mejoras Futuras

### Nivel Intermedio

1. **Agregar condicionales por tipo de plan**
   - Diferentes emails según plan Básico/Profesional/Empresarial
   - Usar Switch node para enrutar

2. **Integración con Stripe/PayPal**
   - Generar enlaces de pago automáticos
   - Verificar estado del pago automáticamente

3. **SMS de bienvenida**
   - Agregar nodo Twilio para enviar SMS
   - Notificación instantánea al cliente

### Nivel Avanzado

1. **Machine Learning para predicción de churn**
   - Analizar patrones de uso
   - Alertas tempranas de clientes en riesgo

2. **Integración con sistema de tickets**
   - Crear ticket automático en Zendesk/Freshdesk
   - Asignar account manager

3. **A/B Testing de emails**
   - Probar diferentes versiones de emails
   - Medir tasa de apertura y conversión

4. **Workflow de recuperación de pagos fallidos**
   - Detectar pagos rechazados
   - Secuencia automática de recuperación

## 📞 Soporte

Si necesitas ayuda adicional:

1. **Documentación oficial de n8n**: https://docs.n8n.io
2. **Comunidad n8n**: https://community.n8n.io
3. **Foro de preguntas**: https://community.n8n.io/c/questions

## 📝 Licencia

Este workflow es de uso libre. Puedes modificarlo y adaptarlo según tus necesidades.

---

**Última actualización**: 17 de Enero de 2025
**Versión**: 1.0
**Compatibilidad**: n8n v1.0+

---

## ⭐ Checklist de Implementación

Antes de activar en producción, verifica:

- [ ] Google Sheet creado con todas las columnas
- [ ] Credenciales de Google Sheets configuradas y probadas
- [ ] Credenciales SMTP configuradas y probadas
- [ ] Emails personalizados con datos de tu empresa
- [ ] Precios y planes actualizados
- [ ] Tasa de impuestos ajustada a tu país
- [ ] Enlaces de pago actualizados
- [ ] Email del equipo de ventas configurado
- [ ] Workflow probado con datos de prueba
- [ ] Verificados emails de bienvenida, factura y recordatorio
- [ ] Documentado el proceso para tu equipo
- [ ] Workflow activado

¡Felicidades! Tu sistema de onboarding automático está listo para funcionar. 🎉
