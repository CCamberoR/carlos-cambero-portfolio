# Carlos - Portfolio Personal

Una web personal moderna y profesional diseñada para mostrar mi portfolio de proyectos y experiencia profesional.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional optimizada para reclutadores
- **Responsive**: Compatible con todos los dispositivos (móvil, tablet, desktop)
- **Integración con GitHub**: Carga automática de proyectos desde tu perfil de GitHub
- **Secciones Completas**: 
  - Información personal
  - Experiencia laboral
  - Educación
  - Portfolio de proyectos
  - Formulario de contacto
- **Optimizada para SEO**: Meta tags y estructura optimizada para buscadores
- **GitHub Pages Ready**: Lista para desplegar en GitHub Pages

## 🛠️ Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables personalizadas y Grid/Flexbox
- JavaScript vanilla (ES6+)
- Font Awesome para iconos
- Google Fonts (Inter)
- GitHub API para proyectos

## 📦 Instalación y Configuración

### 1. Clona o descarga el repositorio

```bash
git clone https://github.com/tu-usuario/PersonalWeb.git
cd PersonalWeb
```

### 2. Personaliza la información

#### Archivo `index.html`:
- Cambia el título de la página
- Actualiza la información personal en todas las secciones marcadas con `[PLACEHOLDER]`
- Modifica los enlaces de redes sociales
- Agrega tu información de contacto

#### Archivo `script.js`:
- Actualiza la configuración de GitHub:
```javascript
const GITHUB_CONFIG = {
    username: 'tu-usuario-github',
    excludeRepos: ['tu-usuario-github'],
    maxRepos: 6
};
```

#### Archivo `styles.css`:
- Personaliza los colores modificando las variables CSS en `:root`
- Ajusta el diseño según tus preferencias

### 3. Agrega tu foto de perfil

Reemplaza el placeholder de imagen en la sección hero con tu foto:
```html
<div class="hero-image">
    <img src="path/to/your/photo.jpg" alt="Tu nombre">
</div>
```

## 🚀 Despliegue en GitHub Pages

### Opción 1: Desde la interfaz web de GitHub

1. Sube todos los archivos a un nuevo repositorio en GitHub
2. Ve a Settings > Pages
3. En "Source", selecciona "Deploy from a branch"
4. Selecciona la rama "main" y la carpeta "/ (root)"
5. Haz clic en "Save"

### Opción 2: Usando GitHub CLI

```bash
# Crear repositorio
gh repo create PersonalWeb --public

# Agregar archivos
git add .
git commit -m "Initial commit: Personal portfolio website"
git push origin main

# Habilitar GitHub Pages
gh api repos/:owner/:repo/pages -X POST -F source[branch]=main -F source[path]=/
```

### 3. Configura el dominio personalizado (opcional)

Si tienes un dominio propio:
1. Crea un archivo `CNAME` con tu dominio
2. Configura los DNS de tu dominio para apuntar a GitHub Pages

## 📁 Estructura del Proyecto

```
PersonalWeb/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Documentación
├── CNAME              # Dominio personalizado (opcional)
└── assets/            # Recursos adicionales
    ├── images/        # Imágenes
    ├── docs/          # Documentos (CV, etc.)
    └── favicon.ico    # Favicon
```

## 🎨 Personalización

### Colores
Modifica las variables CSS en `:root` para cambiar la paleta de colores:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... más variables */
}
```

### Secciones
Puedes agregar nuevas secciones o modificar las existentes:
- Certificaciones
- Habilidades adicionales
- Blog
- Testimonios

### Funcionalidades Adicionales
- Integración con servicios de email (EmailJS, Formspree)
- Google Analytics
- Modo oscuro automático
- Animaciones adicionales

## 📧 Integración del Formulario de Contacto

Para que el formulario funcione, puedes usar servicios como:

### EmailJS
```javascript
// En script.js, reemplaza la función del formulario
emailjs.send('service_id', 'template_id', {
    name: name,
    email: email,
    message: message
});
```

### Formspree
```html
<form action="https://formspree.io/f/tu-form-id" method="POST">
    <!-- campos del formulario -->
</form>
```

## 🔧 Mantenimiento

### Actualizar Proyectos
Los proyectos se cargan automáticamente desde GitHub. Para forzar una actualización:
1. Modifica la configuración en `script.js`
2. Los cambios se reflejarán en la próxima visita

### Backup
Mantén siempre una copia de seguridad de:
- Tu código personalizado
- Imágenes y documentos
- Configuración de dominio

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu portfolio personal.

## 🤝 Contribuciones

Si encuentras errores o tienes sugerencias de mejora:
1. Abre un Issue
2. Crea un Pull Request
3. Comparte tu feedback

## 📞 Contacto

- **Email**: [tu-email@ejemplo.com]
- **LinkedIn**: [tu-perfil-linkedin]
- **GitHub**: [tu-usuario-github]

---

⭐ ¡No olvides darle una estrella al repositorio si te ha sido útil!
