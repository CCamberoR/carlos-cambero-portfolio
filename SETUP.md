# 🔧 Guía de Personalización

## Pasos para personalizar tu portfolio:

### 1. 📝 Información Personal (index.html)

Busca y reemplaza todos los `[PLACEHOLDER]` con tu información:

#### Hero Section:
- Cambia "Carlos" por tu nombre
- Actualiza "Desarrollador Full Stack" por tu título profesional
- Modifica la descripción personal

#### About Section:
- Escribe tu biografía profesional
- Actualiza las tecnologías en la sección de skills

#### Education Section:
- Agrega tu formación académica
- Incluye certificaciones relevantes

#### Experience Section:
- Añade tus trabajos y experiencias
- Describe tus logros y responsabilidades

#### Contact Section:
- Actualiza tu email, teléfono y ubicación

### 2. 🔗 Enlaces y Redes Sociales

Reemplaza estos enlaces en todo el archivo:
- `https://github.com/tu-usuario` → tu perfil de GitHub real
- `https://linkedin.com/in/tu-perfil` → tu perfil de LinkedIn
- `tu-email@ejemplo.com` → tu email real

### 3. ⚙️ Configuración de GitHub API (script.js)

Actualiza la configuración:
```javascript
const GITHUB_CONFIG = {
    username: 'TU_USUARIO_GITHUB',  // ⚠️ IMPORTANTE: Cambia esto
    excludeRepos: ['TU_USUARIO_GITHUB'], // Repos a excluir
    maxRepos: 6 // Número de proyectos a mostrar
};
```

### 4. 🎨 Personalización Visual

#### Colores (styles.css):
```css
:root {
    --primary-color: #2563eb;    /* Color principal */
    --secondary-color: #64748b;  /* Color secundario */
    --accent-color: #f59e0b;     /* Color de acento */
}
```

#### Fuentes:
Puedes cambiar la fuente en el CSS o agregar nuevas desde Google Fonts.

### 5. 📸 Imágenes y Assets

Crea una carpeta `assets/images/` y agrega:
- Tu foto de perfil
- Favicon
- Open Graph image para redes sociales

### 6. 📄 Meta Tags SEO

Actualiza en `<head>`:
- Title tag
- Meta description
- Open Graph URLs
- Structured data

### 7. 🚀 Despliegue en GitHub Pages

#### Opción A: Manual
1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings > Pages
4. Selecciona source: "Deploy from a branch"
5. Branch: main, folder: / (root)

#### Opción B: Con Git
```bash
git init
git add .
git commit -m "Initial commit: Personal portfolio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/PersonalWeb.git
git push -u origin main
```

### 8. 🌐 Dominio Personalizado (Opcional)

Si tienes un dominio:
1. Crea archivo `CNAME` con tu dominio
2. Configura DNS para apuntar a GitHub Pages
3. Espera propagación DNS (24-48 horas)

### 9. 📧 Formulario de Contacto Funcional

Para que el formulario envíe emails reales:

#### Opción A: EmailJS
1. Regístrate en emailjs.com
2. Configura un servicio de email
3. Reemplaza el código del formulario en script.js

#### Opción B: Formspree
1. Regístrate en formspree.io
2. Cambia la action del formulario:
```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

### 10. 📊 Analytics (Opcional)

Agrega Google Analytics antes del `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## ✅ Checklist de Personalización

- [ ] Cambiar nombre y título profesional
- [ ] Actualizar biografía y descripción
- [ ] Añadir educación y experiencia
- [ ] Configurar username de GitHub en script.js
- [ ] Actualizar enlaces de redes sociales
- [ ] Cambiar información de contacto
- [ ] Personalizar colores y estilos
- [ ] Agregar foto de perfil
- [ ] Configurar dominio (si tienes)
- [ ] Testear formulario de contacto
- [ ] Verificar que los proyectos de GitHub cargan
- [ ] Revisar responsive design en móvil
- [ ] Configurar Analytics (opcional)

## 🐛 Problemas Comunes

### Los proyectos de GitHub no cargan:
- Verifica que el username en `GITHUB_CONFIG` sea correcto
- Asegúrate de tener repositorios públicos
- Revisa la consola del navegador para errores

### El sitio no se ve bien en móvil:
- Verifica el viewport meta tag
- Testa en diferentes dispositivos
- Usa las herramientas de desarrollador

### El formulario no funciona:
- Configura un servicio de email (EmailJS/Formspree)
- Verifica la configuración del formulario
- Revisa los logs de errores

## 📞 Soporte

Si necesitas ayuda:
1. Revisa esta guía completa
2. Consulta la documentación en README.md
3. Verifica la consola del navegador para errores
4. Busca en la documentación de GitHub Pages

¡Buena suerte con tu nuevo portfolio! 🚀
