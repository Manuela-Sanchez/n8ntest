# 🚀 Quick Start - Importar Facturas Proveedores

## ⚡ En 5 pasos

### 1️⃣ Preparar Gmail
- Crea etiqueta "facturas recibidas"
- Obtén credenciales OAuth2 para Gmail

### 2️⃣ Preparar Google Drive
- Crea carpeta "Facturas Proveedores 2025"
- Copia el Folder ID

### 3️⃣ Preparar Google Sheets
- Crea hoja "Registro Facturas Proveedores"
- Copia estas columnas en fila 1:
  ```
  Fecha Factura | Nº Factura | Descripción | Base Imponible | IVA | Retención | Importe Total | Familia | CIF Emisor | Razón Social | Domicilio | CP | Población | Email | CIF Receptor | Link
  ```
- Copia el Sheet ID

### 4️⃣ Obtener API de ChatGPT
- Ve a https://platform.openai.com
- Crea API Key
- Añade $5 de crédito

### 5️⃣ Importar y Configurar
- Importa: `workflow_importar_facturas_proveedores.json`
- Reemplaza en los nodos:
  - `REEMPLAZA_CON_TU_FOLDER_ID` → Tu Folder ID
  - `REEMPLAZA_CON_TU_SHEET_ID` → Tu Sheet ID
  - `REEMPLAZA_CON_TU_NIF` → Tu NIF (en el prompt de ChatGPT)
- Configura credenciales en cada nodo
- Activa el workflow

---

## 📖 Guía Completa

Lee: `GUIA_IMPORTAR_FACTURAS_PROVEEDORES.md`

---

## 💡 Uso

1. Recibe factura por email
2. Etiquétala con "facturas recibidas"
3. El sistema la procesa automáticamente cada viernes a las 19:00
4. Revisa los datos en Google Sheets

---

## 🎯 Lo que hace

```
Email con factura PDF
        ↓
Etiqueta "facturas recibidas"
        ↓
n8n procesa automáticamente
        ↓
ChatGPT extrae 14 campos
        ↓
Guarda en Google Drive + Sheets
        ↓
¡Listo para contabilidad!
```

---

## 💰 Coste

- **Make/n8n:** Gratis (52 créditos/año)
- **ChatGPT API:** ~€2-5/mes
- **Google:** Gratis

**Total: €2-5/mes**

---

## ⏰ Ahorro

- **Antes:** 10-15 min por factura
- **Ahora:** 0 min (automático)
- **Ahorro mensual:** 2-4 horas

---

## 🆘 Ayuda

Ver: `GUIA_IMPORTAR_FACTURAS_PROVEEDORES.md` (guía completa)
