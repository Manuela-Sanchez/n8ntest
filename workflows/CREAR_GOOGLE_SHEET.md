# 📊 Cómo Crear tu Google Sheet - 3 Métodos

Elige el método que prefieras para crear tu base de datos de clientes:

---

## ✅ MÉTODO 1: Copiar y Pegar (MÁS RÁPIDO - 2 minutos)

### Paso 1: Crear nuevo Google Sheet

1. Ve a **[Google Sheets](https://sheets.google.com)**
2. Haz clic en el botón **"+"** o **"En blanco"** para crear una nueva hoja
3. Nómbrala: **"Base de Datos Clientes"**

### Paso 2: Copiar los datos

**COPIA EXACTAMENTE ESTO** (selecciona todo el bloque y copia con Ctrl+C o Cmd+C):

```
ID Cliente	Fecha Registro	Nombre	Email	Teléfono	Empresa	Plan	Precio	Estado	Número Factura	Fecha Vencimiento Pago	Fecha Seguimiento	Notas	Última Actualización
CLI-20250117-1001	2025-01-17 10:30:00	María González López	maria.gonzalez@ejemplo.com	+34 612 345 678	Tech Solutions S.L.	Profesional	79	Onboarding Iniciado	INV-20250117-1001	2025-02-01	2025-01-27	Cliente interesado en funciones avanzadas	2025-01-17 10:30:00
CLI-20250117-1002	2025-01-17 11:45:00	Carlos Martínez Ruiz	carlos.martinez@ejemplo.com	+34 623 456 789	Consultoría Global	Empresarial	199	Onboarding Iniciado	INV-20250117-1002	2025-02-01	2025-01-27	Requiere factura con datos fiscales específicos	2025-01-17 11:45:00
CLI-20250117-1003	2025-01-17 14:20:00	Ana Fernández Torres	ana.fernandez@ejemplo.com	+34 634 567 890	Particular	Básico	29	Onboarding Iniciado	INV-20250117-1003	2025-02-01	2025-01-27		2025-01-17 14:20:00
```

### Paso 3: Pegar en Google Sheets

1. Haz clic en la celda **A1** de tu Google Sheet
2. Pega con **Ctrl+V** o **Cmd+V**
3. Los datos se distribuirán automáticamente en 14 columnas

### Paso 4: Formatear (Opcional pero recomendado)

1. **Selecciona la primera fila** (los encabezados)
2. Haz clic en el icono de **"Color de relleno"** → Elige azul
3. Haz clic en el icono de **"Color de texto"** → Elige blanco
4. Haz clic en **"Negrita"** (B)
5. Ve a **Ver → Congelar → 1 fila** (para mantener encabezados visibles)

### Paso 5: Eliminar datos de ejemplo (cuando estés listo para producción)

- Selecciona las filas 2, 3 y 4
- Clic derecho → **"Eliminar filas"**

### Paso 6: Copiar el ID

1. Copia la URL de tu Google Sheet
2. Se ve así: `https://docs.google.com/spreadsheets/d/[COPIA_ESTE_ID]/edit`
3. Pega este ID en tu workflow de n8n (nodos 3 y 11)

**¡LISTO!** 🎉

---

## 📄 MÉTODO 2: Importar CSV (ALTERNATIVA - 3 minutos)

### Paso 1: Copiar el CSV

**COPIA ESTE CONTENIDO:**

```csv
ID Cliente,Fecha Registro,Nombre,Email,Teléfono,Empresa,Plan,Precio,Estado,Número Factura,Fecha Vencimiento Pago,Fecha Seguimiento,Notas,Última Actualización
CLI-20250117-1001,2025-01-17 10:30:00,María González López,maria.gonzalez@ejemplo.com,+34 612 345 678,Tech Solutions S.L.,Profesional,79,Onboarding Iniciado,INV-20250117-1001,2025-02-01,2025-01-27,Cliente interesado en funciones avanzadas,2025-01-17 10:30:00
CLI-20250117-1002,2025-01-17 11:45:00,Carlos Martínez Ruiz,carlos.martinez@ejemplo.com,+34 623 456 789,Consultoría Global,Empresarial,199,Onboarding Iniciado,INV-20250117-1002,2025-02-01,2025-01-27,Requiere factura con datos fiscales específicos,2025-01-17 11:45:00
CLI-20250117-1003,2025-01-17 14:20:00,Ana Fernández Torres,ana.fernandez@ejemplo.com,+34 634 567 890,Particular,Básico,29,Onboarding Iniciado,INV-20250117-1003,2025-02-01,2025-01-27,,2025-01-17 14:20:00
```

### Paso 2: Crear archivo CSV

1. Abre un editor de texto (Notepad, TextEdit, VS Code)
2. Pega el contenido copiado
3. Guarda el archivo como: **`clientes.csv`**
   - Importante: asegúrate de que la extensión sea `.csv`

### Paso 3: Importar a Google Sheets

1. Ve a **[Google Sheets](https://sheets.google.com)**
2. Haz clic en **"Archivo" → "Importar"**
3. Selecciona **"Subir"**
4. Arrastra o selecciona tu archivo `clientes.csv`
5. Configuración de importación:
   - **Ubicación de importación**: "Crear hoja de cálculo nueva"
   - **Tipo de separador**: "Detectar automáticamente"
6. Haz clic en **"Importar datos"**

### Paso 4: Renombrar

1. Renombra la hoja a **"Clientes"** (importante, n8n busca este nombre)
2. Renombra el documento a **"Base de Datos Clientes"**

**¡LISTO!** 🎉

---

## 🛠️ MÉTODO 3: Crear Manualmente (SI TIENES PROBLEMAS CON LOS OTROS)

### Paso 1: Crear Google Sheet

1. Ve a **[Google Sheets](https://sheets.google.com)**
2. Crea una nueva hoja en blanco
3. Nómbrala: **"Base de Datos Clientes"**

### Paso 2: Escribir los encabezados

En la **FILA 1**, escribe estos encabezados **EXACTAMENTE** (respeta mayúsculas, espacios y tildes):

| Columna | Encabezado |
|---------|------------|
| A1 | ID Cliente |
| B1 | Fecha Registro |
| C1 | Nombre |
| D1 | Email |
| E1 | Teléfono |
| F1 | Empresa |
| G1 | Plan |
| H1 | Precio |
| I1 | Estado |
| J1 | Número Factura |
| K1 | Fecha Vencimiento Pago |
| L1 | Fecha Seguimiento |
| M1 | Notas |
| N1 | Última Actualización |

### Paso 3: Formatear encabezados (Opcional)

1. Selecciona la fila 1
2. Aplica:
   - Negrita
   - Fondo azul
   - Texto blanco
   - Alineación centrada

### Paso 4: Agregar fila de ejemplo (Opcional)

Puedes agregar una fila de ejemplo para probar:

| Columna | Valor de ejemplo |
|---------|------------------|
| A2 | CLI-20250117-1001 |
| B2 | 2025-01-17 10:30:00 |
| C2 | María González López |
| D2 | maria.gonzalez@ejemplo.com |
| E2 | +34 612 345 678 |
| F2 | Tech Solutions S.L. |
| G2 | Profesional |
| H2 | 79 |
| I2 | Onboarding Iniciado |
| J2 | INV-20250117-1001 |
| K2 | 2025-02-01 |
| L2 | 2025-01-27 |
| M2 | Cliente interesado en funciones avanzadas |
| N2 | 2025-01-17 10:30:00 |

**¡LISTO!** 🎉

---

## 🔍 VERIFICAR QUE TODO ESTÉ CORRECTO

Antes de configurar n8n, verifica:

### ✅ Checklist de Verificación

- [ ] La hoja se llama **"Clientes"** (exactamente así, con mayúscula)
- [ ] Hay **14 columnas** (de A hasta N)
- [ ] Los nombres de las columnas están **exactamente** como se indican (con tildes y espacios)
- [ ] La primera fila contiene los encabezados
- [ ] Las filas de datos empiezan desde la fila 2

### ✅ Nombres Críticos (DEBEN ser exactos)

Estos nombres **NO** pueden tener errores:

```
✓ "ID Cliente"              (con espacio, no "ID_Cliente")
✓ "Fecha Registro"          (con espacio, no "FechaRegistro")
✓ "Número Factura"          (con tilde en ú)
✓ "Última Actualización"    (con tilde en Última y en ó)
```

---

## 📋 OBTENER EL ID DE TU GOOGLE SHEET

Una vez creado el Google Sheet:

### Paso 1: Copiar la URL

Tu URL se verá así:
```
https://docs.google.com/spreadsheets/d/1XyZ_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789/edit#gid=0
```

### Paso 2: Extraer el ID

El ID es la parte entre `/d/` y `/edit`:
```
1XyZ_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
```

### Paso 3: Usar en n8n

Reemplaza `YOUR_SPREADSHEET_ID_HERE` con tu ID en:
- **Nodo 3**: "Guardar en Google Sheets"
- **Nodo 11**: "Actualizar Estado Final"

Ejemplo de cómo se ve en n8n:
```json
"documentId": {
  "__rl": true,
  "value": "1XyZ_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789",
  "mode": "url"
}
```

---

## 🎨 FORMATO PROFESIONAL (OPCIONAL)

Si quieres que se vea más profesional:

### Encabezados
- **Color de fondo**: Azul (#4472C4)
- **Color de texto**: Blanco
- **Negrita**: Sí
- **Alineación**: Centro

### Ancho de columnas recomendado
```
A: 18 caracteres  (ID Cliente)
B: 20 caracteres  (Fecha Registro)
C: 25 caracteres  (Nombre)
D: 30 caracteres  (Email)
E: 16 caracteres  (Teléfono)
F: 25 caracteres  (Empresa)
G: 15 caracteres  (Plan)
H: 10 caracteres  (Precio)
I: 25 caracteres  (Estado)
J: 20 caracteres  (Número Factura)
K: 22 caracteres  (Fecha Vencimiento Pago)
L: 20 caracteres  (Fecha Seguimiento)
M: 40 caracteres  (Notas)
N: 20 caracteres  (Última Actualización)
```

### Congelar primera fila
```
Ver → Congelar → 1 fila
```

Esto mantiene los encabezados visibles al hacer scroll.

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: "Sheet not found" en n8n

**Solución:**
- Verifica que la hoja se llame **"Clientes"** (exactamente)
- Verifica que el ID sea correcto
- Asegúrate de que las credenciales OAuth2 tengan acceso

### Problema: "Column not found" en n8n

**Solución:**
- Verifica que los nombres de las columnas sean **EXACTAMENTE** como se indican
- No puede haber espacios extra, tildes incorrectas, o mayúsculas diferentes

### Problema: Los datos no se ven bien al pegar

**Solución:**
- Asegúrate de copiar el bloque con tabulaciones (no con espacios)
- Si usas el método CSV, guarda con codificación UTF-8

---

## 🎯 RESUMEN DE LOS 3 MÉTODOS

| Método | Dificultad | Tiempo | Recomendado para |
|--------|-----------|--------|------------------|
| **Copiar y Pegar** | 🟢 Fácil | 2 min | La mayoría de usuarios |
| **Importar CSV** | 🟡 Medio | 3 min | Si prefieres archivos |
| **Manual** | 🔴 Difícil | 10 min | Si tienes problemas con los otros |

---

## ✅ ¡YA ESTÁS LISTO!

Una vez que tu Google Sheet esté creado:

1. ✅ Copia el ID
2. ✅ Pégalo en n8n (nodos 3 y 11)
3. ✅ Configura las credenciales OAuth2
4. ✅ Activa el workflow
5. ✅ ¡Empieza a recibir clientes! 🚀

---

**¿Problemas?** Consulta:
- `workflows/README_Client_Onboarding.md` - Documentación completa
- `workflows/QUICKSTART_Onboarding.md` - Guía rápida
- https://community.n8n.io - Comunidad de n8n
