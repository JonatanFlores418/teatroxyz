# Teatro XYZ - Venta de Entradas

Un sitio web moderno y responsivo para la venta de entradas de teatro, desarrollado con HTML, CSS y JavaScript.

## 🎭 Características

- **Diseño Moderno**: Interfaz limpia y atractiva con gradientes y animaciones
- **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Navegación Intuitiva**: Menú hamburguesa para móviles y navegación fija
- **Formularios Interactivos**: Validación en tiempo real y feedback visual
- **Google Analytics**: Integrado para seguimiento de visitantes
- **Optimizado para SEO**: Estructura semántica y meta tags

## 📁 Estructura del Proyecto

```
teatro-xyz/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos principales
├── js/
│   └── script.js          # Funcionalidad JavaScript
├── pages/
│   ├── salas.html          # Información de salas
│   ├── cartelera.html    # Programación de espectáculos
│   ├── registro.html     # Formulario de registro
│   └── compra.html       # Proceso de compra
└── README.md             # Este archivo
```

## 🚀 Páginas Incluidas

### 1. **Inicio** (`index.html`)
- Hero section con call-to-action
- Espectáculos destacados
- Características del teatro
- Footer completo

### 2. **Salas** (`pages/salas.html`)
- Información detallada de cada sala
- Capacidad y características
- Amenidades del teatro
- Precios por sala

### 3. **Cartelera** (`pages/cartelera.html`)
- Listado de todos los espectáculos
- Filtros por categoría (Drama, Musical, Comedia, Infantil)
- Búsqueda de espectáculos
- Newsletter signup

### 4. **Registro** (`pages/registro.html`)
- Formulario de registro completo
- Validación de campos
- Beneficios de registrarse
- Términos y condiciones

### 5. **Compra** (`pages/compra.html`)
- Selección de espectáculo
- Tipos de entradas (VIP, Platea, General, Estudiante)
- Información del cliente
- Resumen de compra
- Métodos de pago

## 🎨 Características de Diseño

- **Paleta de Colores**: Gradientes azul-púrpura con acentos dorados
- **Tipografía**: Inter (Google Fonts) para mejor legibilidad
- **Iconos**: Font Awesome para iconografía consistente
- **Animaciones**: Transiciones suaves y efectos hover
- **Grid Layout**: Diseño flexible y responsivo

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: 768px y 480px para tablets y móviles
- **Navegación Móvil**: Menú hamburguesa deslizable
- **Formularios**: Adaptados para pantallas táctiles

## 🔧 Funcionalidades JavaScript

- **Navegación Móvil**: Toggle del menú hamburguesa
- **Validación de Formularios**: Validación en tiempo real
- **Filtros de Búsqueda**: Para cartelera y espectáculos
- **Selección de Entradas**: Sistema de carrito de compras
- **Animaciones**: Scroll animations con Intersection Observer
- **Notificaciones**: Toast messages para feedback

## 📊 Google Analytics

El sitio incluye Google Analytics configurado. Para activarlo:

1. Reemplaza `G-XXXXXXXXXX` con tu ID de Google Analytics
2. Actualiza el código en todas las páginas HTML

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Web Interface
1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos del proyecto
3. Ve a Settings > Pages
4. Selecciona "Deploy from a branch"
5. Elige "main" branch y "/ (root)"
6. Guarda los cambios

### Opción 2: GitHub CLI
```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit: Teatro XYZ website"

# Conectar con GitHub
gh repo create teatro-xyz --public
git remote add origin https://github.com/tu-usuario/teatro-xyz.git
git push -u origin main

# Habilitar GitHub Pages
gh api repos/tu-usuario/teatro-xyz/pages -X POST -f source[branch]=main -f source[path]=/
```

## 🎯 Contenido Ficticio

El sitio incluye contenido realista para:
- **Espectáculos**: Hamlet, El Fantasma de la Ópera, Romeo y Julieta, etc.
- **Salas**: Sala Principal, Sala Íntima, Sala Experimental, Sala de Conciertos
- **Precios**: Desde $8.000 hasta $45.000
- **Imágenes**: Utiliza Unsplash para imágenes de alta calidad
- **Información de Contacto**: Datos ficticios pero realistas

## 🛠️ Personalización

### Cambiar Colores
Edita las variables CSS en `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
```

### Agregar Nuevos Espectáculos
1. Edita `pages/cartelera.html`
2. Agrega nuevas tarjetas de espectáculos
3. Actualiza los filtros si es necesario

### Modificar Formularios
1. Edita los archivos HTML correspondientes
2. Actualiza la validación en `js/script.js`
3. Ajusta los estilos en `css/style.css`

## 📞 Soporte

Para preguntas o soporte técnico:
- **Email**: info@teatroxyz.com
- **Teléfono**: +1 (555) 123-4567
- **Dirección**: Av. Principal 123, Centro

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales o comerciales.

---

**Desarrollado con ❤️ para Teatro XYZ**
