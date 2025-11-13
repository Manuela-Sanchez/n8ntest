# Correcciones para tu workflow de n8n

## Problema Original
El error "Paired item data for item from node 'Parse Scoring Rápido' is unavailable" ocurre porque los nodos intermedios pierden el contexto de datos.

## Solución - Cambios Manuales

### 1. Nodo "Parse Scoring Rápido" (ID: 32479368-3109-4076-afb8-88fa5d343a06)

**Reemplaza el código JavaScript con:**

```javascript
// Parsear solo el score rápido
const aiOutput = $json.output || "{}";
const cleanOutput = aiOutput.replace(/```(?:json)?/g, "").trim();

let parsed = { score: 0 };

try {
  parsed = JSON.parse(cleanOutput);
} catch (error) {
  // Intentar extraer JSON del texto
  const jsonMatch = cleanOutput.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log('Error parsing score:', e.message);
    }
  }
}

const quickScore = parsed.score || 0;

// IMPORTANTE: Preservar todos los datos de la oferta original
return {
  json: {
    ...($input.first().json || {}),
    score: quickScore
  }
};
```

**Lo clave:** La línea `...($input.first().json || {})` copia TODOS los datos existentes.

---

### 2. Nodo "Filtrar Top 5" (ID: f6529e42-f704-4a8b-aa4e-b5e759379080)

**El código actual ya está bien, pero asegúrate que sea:**

```javascript
// Ordenar por score y seleccionar las 5 mejores ofertas
const items = $input.all();

// Ordenar de mayor a menor score
const sorted = items.sort((a, b) => {
  const scoreA = a.json.score || 0;
  const scoreB = b.json.score || 0;
  return scoreB - scoreA; // Descendente
});

// Tomar solo las 5 mejores
const top5 = sorted.slice(0, 5);

console.log(`📊 Total ofertas analizadas: ${items.length}`);
console.log(`🏆 Top 5 ofertas seleccionadas:`);
top5.forEach((item, index) => {
  console.log(`${index + 1}. ${item.json.title || 'Sin título'} - Score: ${item.json.score}%`);
});

return top5;
```

---

### 3. NUEVO NODO: "Agregar CV Text"

**Crear un NUEVO nodo Code ENTRE "Filtrar Top 5" y "AI Agent Analizar"**

- Tipo: Code
- Nombre: "Agregar CV Text"
- JavaScript:

```javascript
// Agregar el texto del CV a cada oferta para análisis
const cvText = $('Extraer Texto CV').first().json.text || "";
const inputData = $input.first().json;

return {
  json: {
    ...inputData,
    cvText: cvText
  }
};
```

**Conexiones:**
- Entrada: Conectar desde "Filtrar Top 5"
- Salida: Conectar hacia "AI Agent Analizar"

---

### 4. Nodo "Parse Análisis Completo" (ID: ddf64ced-7f8e-45d7-8374-831adfd8a267)

**Reemplaza el código con:**

```javascript
// Parsear respuesta completa de IA
const aiOutput = $json.output || "{}";
const cleanOutput = aiOutput.replace(/```(?:json)?/g, "").trim();

let parsed = {
  score: 0,
  coverLetter: "",
  cvAdaptadoHtml: "",
  guiaEntrevistaHtml: ""
};

try {
  parsed = JSON.parse(cleanOutput);
} catch (error) {
  console.log('Error parsing:', error.message);
  const jsonMatch = cleanOutput.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log('Failed to extract JSON');
    }
  }
}

// IMPORTANTE: Combinar con todos los datos previos
const inputData = $input.first().json;
const score = parsed.score || inputData.score || 0;

return {
  json: {
    ...inputData,
    score: score,
    coverLetter: parsed.coverLetter || "",
    cvAdaptadoHtml: parsed.cvAdaptadoHtml || "",
    guiaEntrevistaHtml: parsed.guiaEntrevistaHtml || ""
  }
};
```

---

### 5. Nodo "Preparar Email y CV" (ID: 390cc699-a95b-464a-85e2-5602c60bbce4)

**En la primera línea del código, cambia:**

```javascript
const inputData = $input.first().json;
const cvText = inputData.cvText || "";
```

**En lugar de:**
```javascript
const mergedData = $('Merge Ofertas').item.json;
const cvText = $('Extraer Texto CV').first().json.text || "";
```

---

### 6. Nodo "Notificar Telegram" (ID: 3e7b3be8-cc28-4ec9-9c1f-460b6042ea39)

**Actualiza el texto del mensaje a:**

```
=🎯 *Nueva Oferta Compatible*

*Puesto:* {{ $json.job_title }}
*Empresa:* {{ $json.company }}
*Ubicación:* {{ $json.location }}
*Score:* {{ $json.score }}% ⭐
*Fuente:* {{ $json.source }}

📝 [Ver Oferta]({{ $json.apply_link }})

✅ Email enviado con CV adaptado y guía de entrevista
```

---

### 7. Nodo "Telegram Score Bajo" (ID: b0c06bba-440e-4fa9-84c8-5566ba2da6a1)

**Actualiza el texto del mensaje a:**

```
=❌ *Oferta con score bajo*

*Puesto:* {{ $json.title }}
*Empresa:* {{ $json.company }}
*Score:* {{ $json.score }}%

No se envió email (score < 50)
```

---

## Diagrama de flujo correcto

```
Merge Ofertas
    ↓
AI Scoring Rápido
    ↓
Parse Scoring Rápido (preserva datos + agrega score)
    ↓
Filtrar Top 5 (selecciona top 5, preserva datos)
    ↓
Agregar CV Text ⭐ NUEVO (inyecta cvText)
    ↓
AI Agent Analizar (usa datos completos)
    ↓
Parse Análisis Completo (combina todo)
    ↓
Guardar en Sheet
    ↓
Score Filter ≥50
    ↓
Preparar Email y CV (tiene acceso a todos los datos)
```

---

## Pasos para aplicar:

1. Abre tu workflow en n8n
2. Aplica cada cambio en el nodo correspondiente
3. Crea el nuevo nodo "Agregar CV Text"
4. Conecta los nodos según el diagrama
5. Guarda y prueba

¿Necesitas ayuda con algún paso específico?
