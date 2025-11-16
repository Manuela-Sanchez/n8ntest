# 📖 Guía de Instalación en WordPress - IA Avanza

Esta guía te explica **3 formas** de instalar la web de IA Avanza en WordPress, desde la más fácil hasta la más profesional.

---

## 🎯 Opciones de Instalación

| Opción | Dificultad | Tiempo | Recomendado para |
|--------|------------|--------|------------------|
| **A) Plugin Page Builder** | ⭐ Fácil | 1-2 horas | Principiantes |
| **B) Tema Hijo (Child Theme)** | ⭐⭐ Media | 3-4 horas | Usuarios intermedios |
| **C) Tema Personalizado** | ⭐⭐⭐ Avanzada | 6-8 horas | Desarrolladores |

---

## 🚀 OPCIÓN A: Usando Page Builder (MÁS FÁCIL)

### Plugins Recomendados:
1. **Elementor** (Gratis) ⭐ RECOMENDADO
2. **WPBakery Page Builder** (Pago)
3. **Divi Builder** (Pago)

### Pasos con Elementor:

#### 1️⃣ Instalar WordPress
```bash
# Si usas hosting compartido, WordPress ya estará instalado
# Si usas VPS/servidor propio:
wget https://wordpress.org/latest.zip
unzip latest.zip
# Configura base de datos y wp-config.php
```

#### 2️⃣ Instalar Elementor
1. **WordPress Admin** → Plugins → Añadir nuevo
2. Buscar: **"Elementor"**
3. Instalar y Activar
4. También instalar: **"Elementor Header & Footer Builder"** (gratis)

#### 3️⃣ Instalar Tema Ligero
Usa un tema compatible con Elementor:
- **Hello Elementor** (oficial, gratis) ⭐ RECOMENDADO
- **Astra** (gratis)
- **OceanWP** (gratis)

**Instalación:**
1. Apariencia → Temas → Añadir nuevo
2. Buscar "Hello Elementor"
3. Instalar y Activar

#### 4️⃣ Crear la Página con Elementor

**a) Crear nueva página:**
1. Páginas → Añadir nueva
2. Título: "Inicio" o "Home"
3. Click en **"Editar con Elementor"**

**b) Configurar como página de inicio:**
1. Ajustes → Lectura
2. Seleccionar "Una página estática"
3. Página de inicio: Elegir "Inicio"

**c) Recrear las secciones:**

##### NAVEGACIÓN:
- Usar widget: **"Nav Menu"**
- Configurar menú en: Apariencia → Menús
- Enlaces:
  - Inicio → `#inicio`
  - Servicios → `#servicios`
  - Precios → `#precios`
  - Casos de Éxito → `#casos-exito`
  - Contacto → `#contacto`

##### HERO SECTION:
1. Añadir **Sección** → 1 columna
2. Widget **"Heading"** para el título: "Libera tu tiempo. Enfócate en crecer."
3. Widget **"Text Editor"** para descripción
4. Widget **"Button"** → 2 botones (CTA)
5. Widget **"Counter"** para estadísticas (+50 clientes, etc.)

**Estilos del Hero:**
- Background: `#FFFFFF`
- Padding: Top 120px, Bottom 80px
- Título: Font size 48px, Weight 700, Color `#0A0A0A`

##### SERVICIOS:
1. Añadir **Sección** → 1 columna
2. Background: `#F7FAFC`
3. Widget **"Heading"**: "¿En qué puedo ayudarte?"
4. Añadir **Inner Section** → 3 columnas (repetir 3 veces)
5. En cada columna: Widget **"Icon Box"**
   - Iconos: 📧 📅 💬 📱 💰 📊 ✍️ 🎨 🔍
   - Títulos y descripciones según `index.html`

**Estilos de las tarjetas:**
- Background: `#FFFFFF`
- Border Radius: 8px
- Padding: 32px
- Border: 1px solid `#E2E8F0`
- Hover: translateY(-4px)

##### PRECIOS:
1. Añadir **Sección** → 1 columna
2. Widget **"Heading"**: "Planes y Precios"
3. Añadir **Inner Section** → 5 columnas
4. Widget **"Pricing Table"** en cada columna:
   - Por Horas: 25€/hora
   - Starter: 240€/mes
   - Profesional: 450€/mes (Featured)
   - Business: 840€/mes
   - Premium: 1,600€/mes

**Destacar "Profesional":**
- Border: 2px solid `#3B82F6`
- Box Shadow: 0 8px 24px rgba(59, 130, 246, 0.15)
- Badge: "Más Popular"

##### CASOS DE ÉXITO:
1. Widget **"Testimonial"** o **"Testimonial Carousel"**
2. Añadir 3 testimonios:
   - María González (Consultora)
   - Carlos Ruiz (E-commerce)
   - Laura Martínez (Coach)
3. Incluir foto (placeholder), nombre, rol, testimonio

##### PROCESO:
1. Widget **"Icon Box"** en 3 columnas
2. Números circulares con CSS personalizado
3. Títulos: "Agenda una llamada", "Plan personalizado", "Empieza a delegar"

##### CONTACTO:
1. Formulario: Widget **"Form"** de Elementor Pro (o usar Contact Form 7)
2. Campos:
   - Nombre completo*
   - Email*
   - Teléfono
   - Servicio (dropdown)*
   - Mensaje*
3. Información de contacto:
   - Widget **"Icon List"**
   - Email: contacto@iaavanza.com
   - Teléfono: +34 645 407 994
   - Ubicación: En remoto (Madrid / Toledo)

**Configurar envío de formulario:**
- Si usas Elementor Pro: integración directa
- Si usas Contact Form 7:
  1. Instalar plugin "Contact Form 7"
  2. Crear formulario en WordPress Admin
  3. Copiar shortcode
  4. Pegar en widget "Shortcode" de Elementor

##### FOOTER:
1. Usar plugin: **"Elementor Header & Footer Builder"**
2. Plantillas → Añadir nueva → Tipo: Footer
3. Diseñar con Elementor:
   - Logo "IA Avanza"
   - Columnas: Servicios, Empresa, Legal
   - Copyright: © 2025 IA Avanza

#### 5️⃣ Añadir CSS Personalizado

**Apariencia → Personalizar → CSS Adicional:**

```css
/* Variables de colores IA Avanza */
:root {
    --color-primary: #0A0A0A;
    --color-secondary: #4A5568;
    --color-accent: #3B82F6;
    --color-background: #FFFFFF;
    --color-surface: #F7FAFC;
}

/* Smooth scroll */
html {
    scroll-behavior: smooth;
}

/* Fuente Inter */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Botones hover */
.elementor-button:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

/* Tarjetas hover */
.elementor-icon-box-wrapper:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}
```

#### 6️⃣ Configurar Fuente Inter

**Google Fonts en Elementor:**
1. Elementor → Ajustes → Fuentes personalizadas
2. Añadir: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap

O usar plugin: **"Easy Google Fonts"**

#### 7️⃣ Optimización SEO

**Plugin recomendado: Yoast SEO o Rank Math**

1. Instalar **"Yoast SEO"**
2. Configurar:
   - Título del sitio: "IA Avanza | Asistente Virtual Profesional"
   - Descripción: "Asistente Virtual profesional para emprendedores y empresas. Gestión de emails, agenda, redes sociales y más."
   - Keywords: asistente virtual, gestión administrativa, productividad
3. Rellenar meta description en cada página

#### 8️⃣ Configurar Analytics

**Google Analytics 4:**
1. Crear cuenta en: https://analytics.google.com
2. Obtener ID de seguimiento (G-XXXXXXXXXX)
3. Instalar plugin: **"Site Kit by Google"**
4. Conectar Analytics

---

## 🛠️ OPCIÓN B: Tema Hijo (Child Theme)

### Ventajas:
- Más control sobre el código
- Mejor rendimiento que Page Builders
- Actualizaciones del tema padre sin perder cambios

### Pasos:

#### 1️⃣ Elegir Tema Padre
Recomendados:
- **Twenty Twenty-Four** (oficial WordPress)
- **Astra** (ligero, gratis)
- **GeneratePress** (rápido, gratis)

#### 2️⃣ Crear Carpeta del Tema Hijo

```bash
cd wp-content/themes/
mkdir iaavanza-child
cd iaavanza-child
```

#### 3️⃣ Crear `style.css`

```css
/*
Theme Name: IA Avanza Child
Theme URI: https://iaavanza.com
Description: Tema personalizado para IA Avanza
Author: Tu Nombre
Template: astra
Version: 1.0.0
*/

/* Importar estilos del tema padre */
@import url('../astra/style.css');

/* COPIAR TODO EL CONTENIDO DE styles.css AQUÍ */
/* ... (pegar contenido completo del archivo styles.css) ... */
```

#### 4️⃣ Crear `functions.php`

```php
<?php
/**
 * IA Avanza Child Theme Functions
 */

// Encolar estilos del tema padre e hijo
function iaavanza_enqueue_styles() {
    // Estilo del tema padre
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    // Estilo del tema hijo
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));

    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', false);
}
add_action('wp_enqueue_scripts', 'iaavanza_enqueue_styles');

// Encolar JavaScript personalizado
function iaavanza_enqueue_scripts() {
    wp_enqueue_script('iaavanza-script', get_stylesheet_directory_uri() . '/script.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'iaavanza_enqueue_scripts');

// Registrar áreas de widgets
function iaavanza_widgets_init() {
    register_sidebar(array(
        'name'          => 'Footer 1',
        'id'            => 'footer-1',
        'before_widget' => '<div class="footer-column">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'iaavanza_widgets_init');

// Soporte para menús
function iaavanza_setup() {
    register_nav_menus(array(
        'primary' => __('Menú Principal', 'iaavanza'),
        'footer'  => __('Menú Footer', 'iaavanza'),
    ));
}
add_action('after_setup_theme', 'iaavanza_setup');
?>
```

#### 5️⃣ Copiar JavaScript

Copiar `script.js` a la carpeta del tema hijo:
```bash
cp /ruta/a/script.js wp-content/themes/iaavanza-child/script.js
```

#### 6️⃣ Crear Página Personalizada

Crear `page-home.php`:

```php
<?php
/**
 * Template Name: IA Avanza Home
 */

get_header();
?>

<!-- COPIAR TODO EL CONTENIDO HTML DESDE <section id="inicio"> HASTA ANTES DE </body> -->

<?php get_footer(); ?>
```

#### 7️⃣ Activar Tema

1. WordPress Admin → Apariencia → Temas
2. Activar "IA Avanza Child"
3. Crear página "Inicio" → Plantilla: "IA Avanza Home"
4. Ajustes → Lectura → Página de inicio: Inicio

---

## 🎨 OPCIÓN C: Tema Personalizado Completo

### Para desarrolladores profesionales

#### Estructura del Tema:

```
iaavanza-theme/
├── style.css
├── functions.php
├── index.php
├── header.php
├── footer.php
├── page-home.php
├── screenshot.png
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── inc/
│   ├── customizer.php
│   └── enqueue.php
└── template-parts/
    ├── hero.php
    ├── services.php
    ├── pricing.php
    ├── cases.php
    └── contact.php
```

**Documentación completa en:** https://developer.wordpress.org/themes/

---

## 📧 Configurar Formulario de Contacto

### Opción 1: Contact Form 7 (Gratis)

1. **Instalar plugin** "Contact Form 7"
2. **Crear formulario:**

```
<label> Nombre completo *
    [text* name] </label>

<label> Email *
    [email* email] </label>

<label> Teléfono
    [tel phone] </label>

<label> ¿Qué servicio necesitas? *
    [select* service "Gestión de Correos" "Agenda y Citas" "Atención al Cliente" "Redes Sociales" "Facturación" "Otro"] </label>

<label> Cuéntame más sobre tu proyecto *
    [textarea* message] </label>

[submit "Enviar mensaje"]
```

3. **Configurar email:**
   - Para: contacto@iaavanza.com
   - Asunto: Nueva consulta desde web IA Avanza
   - Plantilla de mensaje personalizable

### Opción 2: WPForms (Gratis + Pro)

1. Instalar "WPForms Lite"
2. Usar plantilla "Contact Form"
3. Arrastrar y soltar campos
4. Más visual e intuitivo

### Opción 3: Forminator (Gratis)

De WPMU DEV, muy completo y gratuito.

---

## 🚀 Hosting y Deployment

### Hosting Recomendado para WordPress:

#### Opción 1: SiteGround (⭐ RECOMENDADO)
- **Precio:** Desde 2.99€/mes
- **Ventajas:** WordPress optimizado, SSL gratis, soporte excelente
- **Link:** https://www.siteground.com

#### Opción 2: Webempresa
- **Precio:** Desde 6€/mes
- **Ventajas:** Hosting español, soporte en español
- **Link:** https://www.webempresa.com

#### Opción 3: Raiola Networks
- **Precio:** Desde 5.95€/mes
- **Ventajas:** Español, rendimiento premium
- **Link:** https://raiolanetworks.es

### Pasos para Deployment:

#### 1️⃣ Configurar Dominio
1. Comprar dominio: **iaavanza.com**
2. Apuntar DNS al hosting (nameservers)
3. Esperar propagación (24-48h)

#### 2️⃣ Instalar WordPress
- Desde cPanel → Softaculous
- O instalación manual (FTP)

#### 3️⃣ Configurar SSL (HTTPS)
- Let's Encrypt (gratis en SiteGround/Webempresa)
- Certificado automático

#### 4️⃣ Subir Archivos
```bash
# Vía FTP (FileZilla):
wp-content/themes/iaavanza-child/
├── style.css
├── functions.php
├── script.js
└── page-home.php
```

#### 5️⃣ Configurar Permalinks
- Ajustes → Enlaces permanentes
- Seleccionar: "Nombre de la entrada"
- Guardar

---

## 🔧 Plugins Esenciales

### Seguridad:
- **Wordfence Security** (gratis)
- **iThemes Security** (gratis)

### Rendimiento:
- **WP Rocket** (pago, 49$/año) ⭐ MEJOR
- **W3 Total Cache** (gratis)
- **Autoptimize** (gratis)

### SEO:
- **Yoast SEO** (gratis) ⭐ RECOMENDADO
- **Rank Math** (gratis)

### Backup:
- **UpdraftPlus** (gratis)
- **BackupBuddy** (pago)

### Formularios:
- **Contact Form 7** (gratis)
- **WPForms** (gratis/pro)

### RGPD/Cookies:
- **Complianz** (gratis)
- **Cookie Notice** (gratis)

---

## 📊 Configuración Post-Instalación

### 1. Google Search Console
1. Verificar propiedad del sitio
2. Enviar sitemap: `https://iaavanza.com/sitemap.xml`
3. Monitorear indexación

### 2. Google My Business
- Crear perfil de empresa
- Añadir ubicación (Madrid/Toledo)
- Horarios de atención

### 3. Redes Sociales
Crear perfiles en:
- LinkedIn (profesional)
- Instagram (visual)
- Twitter/X (actualizaciones)

Añadir enlaces en el footer de la web

---

## ✅ Checklist Final

Antes de lanzar:

- [ ] SSL configurado (HTTPS)
- [ ] Favicon añadido
- [ ] Logo en alta resolución
- [ ] Imágenes optimizadas (WebP)
- [ ] Formulario de contacto funcionando
- [ ] Email configurado (contacto@iaavanza.com)
- [ ] Google Analytics instalado
- [ ] Yoast SEO configurado
- [ ] Sitemap generado
- [ ] Robots.txt correcto
- [ ] Enlaces de redes sociales
- [ ] Política de privacidad
- [ ] Términos y condiciones
- [ ] Aviso de cookies
- [ ] Velocidad de carga < 3 segundos
- [ ] Responsive (móvil, tablet, desktop)
- [ ] Navegadores compatibles (Chrome, Firefox, Safari, Edge)
- [ ] Backup configurado

---

## 🎯 Próximos Pasos

### Semana 1-2:
1. Instalar WordPress en hosting
2. Configurar tema con Elementor
3. Crear todas las secciones
4. Probar formulario de contacto

### Semana 3:
1. Optimizar SEO
2. Configurar Analytics
3. Instalar plugins esenciales
4. Testing en dispositivos

### Semana 4:
1. Crear contenido de blog (opcional)
2. Configurar redes sociales
3. Lanzamiento oficial
4. Campaña de lanzamiento

---

## 📞 Soporte

Si tienes dudas durante la instalación:

- **Email:** contacto@iaavanza.com
- **Teléfono:** +34 645 407 994
- **Documentación WordPress:** https://wordpress.org/support/
- **Foro Elementor:** https://elementor.com/help/

---

## 📝 Notas Importantes

### Imágenes:
Los placeholders (`https://via.placeholder.com/60`) deben ser reemplazados por imágenes reales:
- Fotos de clientes (con permiso)
- Logo de IA Avanza
- Imágenes ilustrativas de servicios

Usa bancos de imágenes gratuitos:
- **Unsplash** (https://unsplash.com)
- **Pexels** (https://pexels.com)
- **Pixabay** (https://pixabay.com)

### Email Corporativo:
Configurar `contacto@iaavanza.com`:
1. Desde cPanel → Cuentas de correo
2. Crear: contacto@iaavanza.com
3. Configurar en Gmail/Outlook (SMTP)

### RGPD (Protección de Datos):
Como negocio en España, necesitas:
1. Política de Privacidad
2. Aviso Legal
3. Política de Cookies
4. Formulario de contacto con checkbox de consentimiento

Generadores gratuitos:
- https://protecciondatos-lopd.com/
- https://www.tuabogadodefensor.com/

---

## 🎉 ¡Listo!

Tu web de IA Avanza estará lista para ayudar a emprendedores y empresas a liberar su tiempo.

**Última actualización:** 2025-11-16
**Versión:** 1.0
