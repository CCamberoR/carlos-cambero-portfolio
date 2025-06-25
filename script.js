// Variables globales
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Configuración de GitHub mejorada
const GITHUB_CONFIG = {
    username: 'CCamberoR', // Tu usuario de GitHub
    excludeRepos: ['CCamberoR'], // Repos a excluir (ej: repo de perfil)
    maxRepos: 8, // Proyectos iniciales a mostrar
    allRepos: [], // Array para guardar todos los repos
    showingAll: false, // Estado de visualización
    currentSort: 'updated' // Orden actual
};

// Navegación móvil
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animación del hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });
}

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.section-title, .about-text, .skills, .timeline-item, .experience-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Funciones para proyectos de GitHub mejoradas
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=${GITHUB_CONFIG.currentSort}&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filtrar y guardar todos los repositorios
        GITHUB_CONFIG.allRepos = repos
            .filter(repo => 
                !repo.fork && 
                !GITHUB_CONFIG.excludeRepos.includes(repo.name)
            )
            .sort((a, b) => {
                switch(GITHUB_CONFIG.currentSort) {
                    case 'stars':
                        return b.stargazers_count - a.stargazers_count;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'created':
                        return new Date(b.created_at) - new Date(a.created_at);
                    default: // updated
                        return new Date(b.updated_at) - new Date(a.updated_at);
                }
            });
        
        displayProjects(GITHUB_CONFIG.showingAll ? GITHUB_CONFIG.allRepos : GITHUB_CONFIG.allRepos.slice(0, GITHUB_CONFIG.maxRepos));
        updateProjectsControls();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        displayErrorMessage();
    }
}

function updateProjectsControls() {
    const toggleButton = document.getElementById('toggle-all-projects');
    const pagination = document.getElementById('projects-pagination');
    
    if (toggleButton) {
        if (GITHUB_CONFIG.showingAll) {
            toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i> Mostrar destacados';
            if (pagination) pagination.style.display = 'none';
        } else {
            toggleButton.innerHTML = '<i class="fas fa-eye"></i> Ver todos los proyectos';
            if (pagination && GITHUB_CONFIG.allRepos.length > GITHUB_CONFIG.maxRepos) {
                pagination.style.display = 'block';
            }
        }
    }
}

function displayProjects(repos) {
    if (!projectsGrid) return;
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-info-circle"></i>
                <p>No se encontraron proyectos públicos.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = repos.map(repo => {
        const languages = getProjectCategory(repo);
        const techTags = getTechTags(repo);
        const stats = getProjectStats(repo);
        
        return `
            <div class="project-card" data-category="${languages.category}">
                <div class="project-image">
                    <i class="${languages.icon}"></i>
                </div>
                <div class="project-content">
                    <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                    <p>${repo.description || 'Proyecto desarrollado en GitHub'}</p>
                    <div class="project-stats">
                        <span class="project-stat">
                            <i class="fas fa-star"></i> ${repo.stargazers_count}
                        </span>
                        <span class="project-stat">
                            <i class="fas fa-code-branch"></i> ${repo.forks_count}
                        </span>
                        <span class="project-stat">
                            <i class="fas fa-calendar"></i> ${formatDate(repo.updated_at)}
                        </span>
                    </div>
                    <div class="project-tech">
                        ${techTags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Código
                        </a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getProjectStats(repo) {
    return {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        size: repo.size,
        updated: repo.updated_at,
        created: repo.created_at
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
        return `${diffDays}d`;
    } else if (diffDays < 30) {
        return `${Math.ceil(diffDays / 7)}sem`;
    } else if (diffDays < 365) {
        return `${Math.ceil(diffDays / 30)}m`;
    } else {
        return `${Math.ceil(diffDays / 365)}a`;
    }
}

function displayErrorMessage() {
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar los proyectos desde GitHub.</p>
            <p>Verifica que el usuario "${GITHUB_CONFIG.username}" sea correcto.</p>
        </div>
    `;
}

function getProjectCategory(repo) {
    const language = repo.language;
    const description = (repo.description || '').toLowerCase();
    const name = repo.name.toLowerCase();
    
    // Prioridad para IA y ML
    if (description.includes('machine learning') || description.includes('deep learning') || 
        description.includes('neural') || description.includes('ai') || description.includes('ml') ||
        name.includes('ml') || name.includes('ai') || name.includes('neural') ||
        description.includes('tensorflow') || description.includes('pytorch') ||
        description.includes('sklearn') || description.includes('pandas')) {
        return { category: 'ai', icon: 'fas fa-robot' };
    }
    
    // Análisis de datos
    if (description.includes('data analysis') || description.includes('analytics') ||
        description.includes('visualization') || description.includes('dashboard') ||
        description.includes('data science') || name.includes('data') ||
        description.includes('jupyter') || description.includes('notebook')) {
        return { category: 'data', icon: 'fas fa-chart-line' };
    }
    
    // Backend projects
    if (language === 'Python' || language === 'Java' || language === 'C#' || 
        description.includes('api') || description.includes('server') ||
        description.includes('backend') || description.includes('microservice') ||
        description.includes('database') || name.includes('api') ||
        description.includes('rest') || description.includes('graphql')) {
        return { category: 'backend', icon: getLanguageIcon(language) };
    }
    
    // Web projects
    if (language === 'JavaScript' || language === 'TypeScript' || language === 'HTML' ||
        description.includes('frontend') || description.includes('web') ||
        description.includes('react') || description.includes('vue') ||
        description.includes('angular') || name.includes('web')) {
        return { category: 'web', icon: getLanguageIcon(language) };
    }
    
    return { category: 'backend', icon: getLanguageIcon(language) };
}

function getLanguageIcon(language) {
    const icons = {
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'JavaScript': 'fab fa-js-square',
        'TypeScript': 'fab fa-js-square',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'C#': 'fas fa-code',
        'PHP': 'fab fa-php',
        'C++': 'fas fa-code',
        'C': 'fas fa-code'
    };
    
    return icons[language] || 'fas fa-code';
}

function getTechTags(repo) {
    const tags = [];
    
    if (repo.language) {
        tags.push(repo.language);
    }
    
    // Agregar tags basados en el contenido del proyecto
    const description = (repo.description || '').toLowerCase();
    const name = repo.name.toLowerCase();
    
    // Tecnologías de IA/ML
    if (description.includes('tensorflow') || name.includes('tensorflow')) tags.push('TensorFlow');
    if (description.includes('pytorch') || name.includes('pytorch')) tags.push('PyTorch');
    if (description.includes('sklearn') || name.includes('sklearn')) tags.push('Scikit-learn');
    if (description.includes('pandas') || name.includes('pandas')) tags.push('Pandas');
    if (description.includes('numpy') || name.includes('numpy')) tags.push('NumPy');
    if (description.includes('keras') || name.includes('keras')) tags.push('Keras');
    if (description.includes('opencv') || name.includes('opencv')) tags.push('OpenCV');
    
    // Tecnologías de análisis de datos
    if (description.includes('jupyter') || name.includes('jupyter')) tags.push('Jupyter');
    if (description.includes('matplotlib') || name.includes('matplotlib')) tags.push('Matplotlib');
    if (description.includes('seaborn') || name.includes('seaborn')) tags.push('Seaborn');
    if (description.includes('plotly') || name.includes('plotly')) tags.push('Plotly');
    
    // Tecnologías backend
    if (description.includes('flask') || name.includes('flask')) tags.push('Flask');
    if (description.includes('django') || name.includes('django')) tags.push('Django');
    if (description.includes('fastapi') || name.includes('fastapi')) tags.push('FastAPI');
    if (description.includes('spring') || name.includes('spring')) tags.push('Spring');
    if (description.includes('express') || name.includes('express')) tags.push('Express');
    if (description.includes('node') || name.includes('node')) tags.push('Node.js');
    
    // Bases de datos
    if (description.includes('mongodb') || name.includes('mongo')) tags.push('MongoDB');
    if (description.includes('mysql') || name.includes('mysql')) tags.push('MySQL');
    if (description.includes('postgresql') || name.includes('postgres')) tags.push('PostgreSQL');
    if (description.includes('sqlite') || name.includes('sqlite')) tags.push('SQLite');
    
    // Tecnologías web
    if (description.includes('react') || name.includes('react')) tags.push('React');
    if (description.includes('vue') || name.includes('vue')) tags.push('Vue');
    if (description.includes('angular') || name.includes('angular')) tags.push('Angular');
    
    // DevOps y herramientas
    if (description.includes('docker') || name.includes('docker')) tags.push('Docker');
    if (description.includes('kubernetes') || name.includes('k8s')) tags.push('Kubernetes');
    if (description.includes('api') || name.includes('api')) tags.push('API');
    if (description.includes('rest') || name.includes('rest')) tags.push('REST');
    if (description.includes('graphql') || name.includes('graphql')) tags.push('GraphQL');
    
    return [...new Set(tags)]; // Eliminar duplicados
}

// Filtros de proyectos mejorados
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Control para mostrar todos los proyectos
const toggleAllButton = document.getElementById('toggle-all-projects');
if (toggleAllButton) {
    toggleAllButton.addEventListener('click', () => {
        GITHUB_CONFIG.showingAll = !GITHUB_CONFIG.showingAll;
        const reposToShow = GITHUB_CONFIG.showingAll ? 
            GITHUB_CONFIG.allRepos : 
            GITHUB_CONFIG.allRepos.slice(0, GITHUB_CONFIG.maxRepos);
        
        displayProjects(reposToShow);
        updateProjectsControls();
    });
}

// Control de ordenamiento
const sortSelect = document.getElementById('sort-projects');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        GITHUB_CONFIG.currentSort = e.target.value;
        fetchGitHubRepos(); // Recargar con nuevo orden
    });
}

// Botón cargar más proyectos
const loadMoreButton = document.getElementById('load-more-projects');
if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
        GITHUB_CONFIG.showingAll = true;
        displayProjects(GITHUB_CONFIG.allRepos);
        updateProjectsControls();
    });
}

// Formulario de contacto
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Aquí puedes integrar con un servicio de email como EmailJS, Formspree, etc.
        // Por ahora, mostramos un mensaje de éxito
        
        // Simular envío
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('¡Mensaje enviado! Te contactaré pronto.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Efecto de typing para el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Efectos adicionales al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar proyectos de GitHub
    fetchGitHubRepos();
    
    // Efecto de typing en el título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // Contador de estadísticas (si quieres agregar)
    animateCounters();
});

// Función para animar contadores (opcional)
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Función para cambiar tema (modo oscuro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Lazy loading para imágenes (si las agregas)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
lazyLoadImages();

// Función para generar CV en PDF (opcional)
function downloadCV() {
    // Aquí puedes integrar una biblioteca como jsPDF o simplemente enlazar a un archivo PDF
    const link = document.createElement('a');
    link.href = 'path/to/your/cv.pdf'; // Ruta a tu CV
    link.download = 'Carlos_CV.pdf';
    link.click();
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});

// Mostrar/ocultar botón de scroll to top
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scroll-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Funciones de utilidad
const utils = {
    // Formatear fecha
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    
    // Debounce para optimizar eventos
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Exportar funciones si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchGitHubRepos,
        toggleTheme,
        downloadCV,
        utils
    };
}
