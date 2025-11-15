# 📊 Estructura de Google Sheets para Facturación Automática

## 📋 Tabla: "Clientes Facturación"

### Columnas Necesarias

Crea una hoja de Google Sheets con estas columnas exactamente en este orden:

| Columna | Nombre Campo | Tipo | Descripción | Ejemplo |
|---------|-------------|------|-------------|---------|
| **A** | `row_id_en_sheets` | Texto | ID único del cliente | `CLI001` |
| **B** | `cliente` | Texto | Nombre del cliente o empresa | `Empresa ABC S.L.` |
| **C** | `email_cliente` | Email | Email para enviar factura | `admin@empresaabc.com` |
| **D** | `monto_base` | Número | Importe base sin IVA (€) | `1000` |
| **E** | `iva_rate` | Número | Tasa de IVA (0.21 = 21%) | `0.21` |
| **F** | `concepto` | Texto | Descripción del servicio | `Servicios de Consultoría - Noviembre 2025` |
| **G** | `forma_pago` | Texto | Método de pago | `Transferencia bancaria` |
| **H** | `dias_vencimiento` | Número | Días hasta vencimiento | `30` |
| **I** | `estado` | Texto | Estado de la factura | `Pendiente` / `Emitida` |
| **J** | `fecha_ultima_factura` | Fecha | Última vez facturado | `2025-10-01` |
| **K** | `activo` | Texto | Cliente activo para facturación | `SI` / `NO` |
| **L** | `notas` | Texto | Notas adicionales | `Cliente preferente` |

---

## 📝 Plantilla para Copiar

### Fila 1 - Encabezados (copia esto en tu Google Sheet):

```
row_id_en_sheets	cliente	email_cliente	monto_base	iva_rate	concepto	forma_pago	dias_vencimiento	estado	fecha_ultima_factura	activo	notas
```

### Filas 2+ - Datos de Ejemplo:

```
CLI001	Empresa ABC S.L.	admin@empresaabc.com	1000	0.21	Servicios de Consultoría Mensual	Transferencia bancaria	30	Pendiente		SI	Cliente preferente
CLI002	Tienda XYZ S.L.	contabilidad@tiendaxyz.es	750	0.21	Mantenimiento Web Mensual	Tarjeta de crédito	15	Pendiente		SI
CLI003	Autónomos DEF	contacto@autonomodef.es	500	0.21	Hosting y Dominio	Transferencia bancaria	30	Pendiente		NO	Suspendido temporalmente
CLI004	Corporación GHI	facturacion@corpghi.com	2500	0.21	Soporte Técnico Premium	Transferencia bancaria	45	Pendiente		SI	Contrato anual
```

---

## 🎨 Formato Recomendado

### Encabezados (Fila 1):
- **Color de fondo:** Azul oscuro (#1155CC)
- **Color de texto:** Blanco
- **Negrita:** Sí
- **Alineación:** Centro
- **Congelar fila:** Sí (Ver → Congelar → 1 fila)

### Columnas de Números (D, E, H):
- **Formato:** Número con 2 decimales
- **Alineación:** Derecha

### Columna Email (C):
- **Validación de datos:** Email válido

### Columna Estado (I):
- **Lista desplegable:** Pendiente, Emitida, Pagada, Cancelada
- **Colores condicionales:**
  - Pendiente: Naranja
  - Emitida: Azul
  - Pagada: Verde
  - Cancelada: Rojo

### Columna Activo (K):
- **Lista desplegable:** SI, NO
- **Colores condicionales:**
  - SI: Verde claro
  - NO: Gris

---

## ⚙️ Configuración en Google Sheets

### 1. Crear la Hoja
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja
3. Nómbrala: **"Facturación Automática - [Tu Empresa]"**

### 2. Configurar Pestañas
Crea estas pestañas (hojas):
- `Clientes` ← Tabla principal
- `Facturas Emitidas` ← Histórico
- `Configuración` ← Datos de tu empresa

### 3. Formato de la Pestaña "Clientes"
- Pega los encabezados en la fila 1
- Agrega tus datos de clientes desde la fila 2
- Aplica los formatos descritos arriba

### 4. Pestaña "Facturas Emitidas" (Histórico)

Columnas para el histórico:

```
invoice_id	cliente	email_cliente	monto_base	iva_monto	monto_total	fecha_emision	fecha_vencimiento	estado	archivo_drive_url	fecha_envio	notas
```

Esta pestaña se llenará automáticamente con n8n después de cada facturación.

### 5. Pestaña "Configuración"

Datos de tu empresa para incluir en las facturas:

| Campo | Valor |
|-------|-------|
| Nombre Empresa | Tu Empresa S.L. |
| CIF/NIF | B12345678 |
| Dirección | Calle Principal 123 |
| Ciudad | Madrid |
| Código Postal | 28001 |
| Teléfono | +34 912 345 678 |
| Email | facturacion@tuempresa.com |
| Web | www.tuempresa.com |
| Banco | Banco Santander |
| IBAN | ES12 1234 1234 1234 1234 1234 |

---

## 🔧 Permisos y Compartir

### Compartir la Hoja con n8n:

1. **Opción A - Con cuenta de servicio (Recomendado):**
   - Crea una cuenta de servicio en Google Cloud Console
   - Comparte la hoja con el email de la cuenta de servicio
   - Permiso: **Editor**

2. **Opción B - Con tu cuenta personal:**
   - En n8n, configura credenciales de Google OAuth2
   - Autoriza el acceso a Google Sheets

---

## 📍 Obtener el ID de la Hoja

Para configurar n8n necesitas el **Sheet ID**:

1. Abre tu Google Sheet
2. Mira la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_SHEET_ID/edit
   ```
3. Copia el ID (la parte entre `/d/` y `/edit`)
4. Pégalo en el nodo de n8n en el campo `sheetId`

---

## 🎯 Próximos Pasos

Una vez creada la hoja:

1. ✅ Copia el Sheet ID
2. ✅ Configura las credenciales de Google en n8n
3. ✅ Pega el Sheet ID en los nodos del workflow
4. ✅ Configura el Folder ID de Google Drive
5. ✅ Prueba el workflow con un cliente de prueba

---

## 💡 Tips Importantes

### Validaciones Automáticas en Google Sheets

**Para la columna Email (C):**
```
Datos → Validación de datos → Criterios: "es un email válido"
```

**Para la columna Activo (K):**
```
Datos → Validación de datos → Lista de elementos: SI,NO
```

**Para la columna Estado (I):**
```
Datos → Validación de datos → Lista: Pendiente,Emitida,Pagada,Cancelada
```

### Formato Condicional

**Para la columna Estado:**
1. Selecciona la columna I completa
2. Formato → Formato condicional
3. Crea reglas:
   - Si texto es igual a "Pendiente" → Fondo naranja
   - Si texto es igual a "Emitida" → Fondo azul claro
   - Si texto es igual a "Pagada" → Fondo verde
   - Si texto es igual a "Cancelada" → Fondo rojo claro

---

## 🚀 Ejemplo Completo de Datos

Aquí hay un ejemplo completo de 5 clientes para que copies y pegues:

```tsv
row_id_en_sheets	cliente	email_cliente	monto_base	iva_rate	concepto	forma_pago	dias_vencimiento	estado	fecha_ultima_factura	activo	notas
CLI001	Restaurante La Bella	admin@labella.es	850	0.21	Sistema TPV - Renta Mensual	Transferencia bancaria	30	Pendiente		SI	Cliente desde 2023
CLI002	Clínica Dental Sonrisa	facturacion@clinicasonrisa.es	1200	0.21	Software de Gestión	Transferencia bancaria	15	Pendiente		SI	Pago siempre puntual
CLI003	Bufete Jurídico López	contabilidad@bufetelopez.com	2000	0.21	CRM y Automatización	Domiciliación bancaria	45	Pendiente		SI	Contrato anual
CLI004	Gimnasio FitClub	admin@fitclub.es	600	0.21	App de Reservas	Tarjeta de crédito	30	Pendiente		NO	Suspendido por impago
CLI005	Peluquería Estilo	contacto@peluqueriaestilo.es	450	0.21	Página Web + Hosting	Transferencia bancaria	30	Pendiente		SI
```

**Para copiar en Google Sheets:**
1. Copia todo el bloque de arriba
2. Pégalo en la celda A1 de tu hoja
3. Google Sheets automáticamente separará las columnas

---

¿Necesitas ayuda con algún paso específico? 🤓
