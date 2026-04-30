const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');
const historyBox = document.querySelector('.history-box');
const historyToggle = document.querySelector('.history-toggle');

const savedTheme = localStorage.getItem('ieeeedsoc-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem(
    'ieeeedsoc-theme',
    body.classList.contains('dark') ? 'dark' : 'light'
  );
});

menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

if (historyBox && historyToggle) {
  historyToggle.addEventListener('click', () => {
    const isOpen = historyBox.classList.toggle('is-open');
    historyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const projects = [
  {
    id: 'landing-page',
    image: 'https://www.hostingplus.com.es/wp-content/uploads/2020/04/crear-web.jpg',
    imageAlt: 'Proyecto landing page',
    badge: 'Proyecto principal',
    title: 'Landing Page informativa del cap\u00edtulo',
    description: 'Creaci\u00f3n de una p\u00e1gina web para facilitar la toma de informaci\u00f3n de las personas interesadas y mantenerlas al tanto de las \u00e1reas del cap\u00edtulo, proyectos en trabajo, eventos, postulaciones a voluntariado e informaci\u00f3n de los integrantes.',
    objective: 'Dar visibilidad al cap\u00edtulo',
    focus: 'Centro de informaci\u00f3n y convocatoria de nuevos miembros',
    use: 'Estudiantes interesados y miembros',
    label: 'Web \u00b7 Comunicaci\u00f3n',
    progress: 95
  },
  {
    id: 'impresion-3d',
    image: 'https://cursos-sepe.net/wp-content/uploads/2024/07/curso-modelado-impresion-3d.jpg',
    imageAlt: 'Taller de impresi\u00f3n 3D',
    badge: 'Proyecto destacado',
    title: 'Taller de impresi\u00f3n 3D',
    description: 'Iniciativa orientada a fortalecer el aprendizaje pr\u00e1ctico mediante tecnolog\u00edas de fabricaci\u00f3n y prototipado.',
    objective: 'Acercar a los estudiantes al dise\u00f1o y fabricaci\u00f3n digital',
    focus: 'Aprendizaje pr\u00e1ctico con prototipos funcionales',
    use: 'Talleres, demostraciones y proyectos acad\u00e9micos',
    label: 'Impresi\u00f3n 3D \u00b7 Taller',
    progress: 100
  },
  {
    id: 'brazo-robotico',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Brazo rob\u00f3tico',
    badge: 'Proyecto destacado',
    title: 'Brazo rob\u00f3tico',
    description: 'Creaci\u00f3n de un brazo rob\u00f3tico como proyecto en desarrollo, pendiente de definir con mayor precisi\u00f3n la acci\u00f3n espec\u00edfica que realizar\u00e1.',
    objective: 'Desarrollar una base experimental para automatizaci\u00f3n',
    focus: 'Rob\u00f3tica educativa, control y validaci\u00f3n de movimiento',
    use: 'Pr\u00e1cticas de laboratorio y presentaciones t\u00e9cnicas',
    label: 'Rob\u00f3tica \u00b7 Desarrollo',
    progress: 30
  }
];

const projectFeature = document.getElementById('projectFeature');
const projectsGrid = document.getElementById('projectsGrid');
let featuredProjectId = 'landing-page';

function createProgressBar(progress) {
  return `
    <div class="progress-bar">
      <span style="width: ${progress}%"></span>
    </div>
  `;
}

function renderFeaturedProject(project) {
  projectFeature.innerHTML = `
    <div class="project-feature-media">
      <img src="${project.image}" alt="${project.imageAlt}" />
    </div>
    <div class="project-feature-copy">
      <span class="pill pill-success">${project.badge}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${createProgressBar(project.progress)}
      <ul class="meta-list compact">
        <li>Objetivo: ${project.objective}</li>
        <li>Enfoque: ${project.focus}</li>
        <li>Uso: ${project.use}</li>
      </ul>
    </div>
  `;
}

function renderProjectCards() {
  projectsGrid.innerHTML = projects
    .filter(project => project.id !== featuredProjectId)
    .map((project, index) => `
      <article
        class="info-card reveal ${index % 2 === 0 ? 'reveal-delay-2' : 'reveal-delay-1'}"
        role="button"
        tabindex="0"
        data-project-id="${project.id}"
      >
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="small-label">${project.label}</span>
        ${createProgressBar(project.progress)}
      </article>
    `)
    .join('');
}

function renderProjects() {
  const featuredProject = projects.find(project => project.id === featuredProjectId);
  if (!projectFeature || !projectsGrid || !featuredProject) return;

  renderFeaturedProject(featuredProject);
  renderProjectCards();
}

function selectProject(projectId) {
  featuredProjectId = projectId;
  renderProjects();

  document.querySelectorAll('.projects-grid .reveal').forEach(item => {
    item.classList.add('is-visible');
  });
}

if (projectFeature && projectsGrid) {
  renderProjects();

  projectsGrid.addEventListener('click', event => {
    const card = event.target.closest('[data-project-id]');
    if (card) selectProject(card.dataset.projectId);
  });

  projectsGrid.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const card = event.target.closest('[data-project-id]');
    if (!card) return;

    event.preventDefault();
    selectProject(card.dataset.projectId);
  });
}

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(item => revealObserver.observe(item));

const track = document.getElementById('carouselTrack');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsWrap = document.getElementById('carouselDots');

let currentIndex = 0;
let autoplay;
let startX = 0;
let endX = 0;
let isSwiping = false;

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === currentIndex);
  });

  [...dotsWrap.children].forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateCarousel();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplay = setInterval(nextSlide, 4500);
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
}

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  endX = startX;
  isSwiping = true;
  stopAutoplay();
}

function handleTouchMove(e) {
  if (!isSwiping) return;
  endX = e.touches[0].clientX;
}

function handleTouchEnd() {
  if (!isSwiping) return;

  const diffX = startX - endX;
  const minSwipeDistance = 50;

  if (Math.abs(diffX) > minSwipeDistance) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  isSwiping = false;
  startAutoplay();
}

if (track && slides.length) {
  buildDots();
  updateCarousel();
  startAutoplay();

  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);

  const carousel = track.closest('.carousel');

  carousel?.addEventListener('mouseenter', stopAutoplay);
  carousel?.addEventListener('mouseleave', startAutoplay);

  carousel?.addEventListener('touchstart', handleTouchStart, { passive: true });
  carousel?.addEventListener('touchmove', handleTouchMove, { passive: true });
  carousel?.addEventListener('touchend', handleTouchEnd);
}

joinForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Tu interés fue registrado. Luego puedes conectarlo a Formspree, Netlify Forms o tu backend.';
  formMessage.classList.add('success');
  joinForm.reset();
});
