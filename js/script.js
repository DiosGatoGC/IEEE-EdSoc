const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');
const historyBox = document.querySelector('.history-box');
const historyToggle = document.querySelector('.history-toggle');
const historyPanel = document.getElementById('historyContent');
const areaModal = document.getElementById('areaModal');
const areaModalPanel = areaModal?.querySelector('.area-modal');
const areaModalClose = areaModal?.querySelector('.area-modal-close');
const areaModalTitle = document.getElementById('areaModalTitle');
const areaModalDescription = document.getElementById('areaModalDescription');
const areaModalProfile = document.getElementById('areaModalProfile');
const areaModalResponsibilities = document.getElementById('areaModalResponsibilities');
const areaModalPerformance = document.getElementById('areaModalPerformance');
let activeAreaButton = null;
let modalCloseTimer = null;

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

function updateHistoryHeight() {
  if (!historyBox || !historyPanel || !historyBox.classList.contains('is-open')) return;
  historyPanel.style.maxHeight = `${historyPanel.scrollHeight}px`;
}

if (historyBox && historyToggle && historyPanel) {
  historyToggle.addEventListener('click', () => {
    const isOpen = historyBox.classList.toggle('is-open');
    historyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    historyPanel.style.maxHeight = isOpen ? `${historyPanel.scrollHeight}px` : '0';
  });

  window.addEventListener('resize', updateHistoryHeight);
  historyPanel.querySelectorAll('img').forEach(image => {
    image.addEventListener('load', updateHistoryHeight);
  });
}

const areaDetails = {
  'marketing-publicidad': {
    name: 'Marketing y Publicidad',
    description: 'Área responsable de la comunicación visual y digital del capítulo. Difunde talleres, proyectos, convocatorias y actividades, manteniendo una identidad gráfica coherente en todos los canales.',
    profile: 'Persona creativa, organizada y responsable, con interés en redes sociales, diseño gráfico, creación de contenido o redacción. Es deseable tener conocimientos básicos de Canva, Figma, Adobe u otras herramientas de edición, aunque también se valora la disposición para aprender.',
    responsibilities: [
      'Diseñar piezas gráficas para publicaciones y eventos.',
      'Apoyar en la planificación del calendario de contenidos.',
      'Redactar textos para redes sociales y convocatorias.',
      'Realizar cobertura y difusión de las actividades del capítulo.',
      'Mantener una comunicación visual coherente con la identidad de IEEE EdSoc.'
    ],
    performance: 'Cumplir con las fechas de publicación, mantener una buena calidad visual, comunicar oportunamente los avances y proponer nuevas ideas de contenido. Se espera participación activa y disposición para recibir retroalimentación.'
  },
  'eventos-logistica': {
    name: 'Eventos y Logística',
    description: 'Área encargada de planificar, organizar y ejecutar talleres, ponencias y actividades del capítulo, coordinando los recursos necesarios antes, durante y después de cada evento.',
    profile: 'Persona puntual, organizada, comunicativa y capaz de resolver problemas. Debe mostrar disposición para trabajar en equipo y disponibilidad para apoyar presencialmente cuando se realicen actividades.',
    responsibilities: [
      'Elaborar cronogramas y listas de tareas.',
      'Coordinar espacios, materiales y recursos.',
      'Apoyar en el registro y orientación de participantes.',
      'Coordinar con ponentes y demás áreas involucradas.',
      'Supervisar el desarrollo del evento.',
      'Recopilar observaciones y resultados después de cada actividad.'
    ],
    performance: 'Cumplir las tareas asignadas dentro de los plazos, anticipar posibles dificultades y mantener una comunicación rápida con el equipo. Se espera orden y compromiso durante todas las etapas del evento.'
  },
  'recursos-humanos': {
    name: 'Recursos Humanos',
    description: 'Área que promueve la integración, organización y bienestar de los miembros del capítulo. También apoya los procesos de convocatoria, incorporación y seguimiento de voluntarios.',
    profile: 'Persona empática, respetuosa, organizada y con capacidad de escucha. Debe manejar la información interna con discreción y mostrar interés por fortalecer el trabajo en equipo.',
    responsibilities: [
      'Apoyar en convocatorias y procesos de incorporación.',
      'Orientar a los nuevos voluntarios.',
      'Llevar un seguimiento de la participación de los miembros.',
      'Organizar actividades de integración.',
      'Apoyar la comunicación interna.',
      'Colaborar en la resolución respetuosa de inconvenientes dentro del equipo.'
    ],
    performance: 'Mantener un seguimiento constante y respetuoso, registrar correctamente la información necesaria y contribuir a un ambiente colaborativo. Se espera confidencialidad, iniciativa y buena comunicación.'
  },
  'proyectos-investigacion': {
    name: 'Proyectos e Investigación',
    description: 'Área dedicada a proponer y desarrollar iniciativas académicas y tecnológicas relacionadas con educación, innovación e investigación.',
    profile: 'Persona curiosa, analítica y responsable, con interés en programación, electrónica, investigación, redacción técnica o desarrollo de prototipos. No es obligatorio dominar todas estas áreas, pero sí tener disposición para investigar y aprender.',
    responsibilities: [
      'Proponer nuevas ideas de proyectos.',
      'Investigar antecedentes y tecnologías relacionadas.',
      'Definir objetivos, etapas y entregables.',
      'Participar en el desarrollo de prototipos.',
      'Documentar avances y resultados.',
      'Elaborar informes y presentaciones técnicas.',
      'Coordinar pruebas y mejoras de los proyectos.'
    ],
    performance: 'Mostrar avances periódicos, cumplir los entregables acordados y documentar el trabajo realizado. Se espera apertura a la retroalimentación, colaboración con otras especialidades y compromiso hasta completar resultados funcionales.'
  },
  'relaciones-publicas': {
    name: 'Relaciones Públicas',
    description: 'Área encargada de crear y mantener vínculos con ponentes, organizaciones, capítulos estudiantiles, empresas e instituciones que puedan colaborar con IEEE EdSoc.',
    profile: 'Persona comunicativa, profesional, cordial y organizada, con facilidad para redactar mensajes formales, establecer contactos y realizar seguimientos.',
    responsibilities: [
      'Identificar posibles aliados y ponentes.',
      'Contactar organizaciones e invitados.',
      'Redactar propuestas y mensajes institucionales.',
      'Coordinar reuniones y colaboraciones.',
      'Dar seguimiento a solicitudes y acuerdos.',
      'Buscar oportunidades, beneficios y alianzas para el capítulo.'
    ],
    performance: 'Mantener una comunicación formal y oportuna, registrar correctamente los contactos y realizar seguimientos constantes. Se espera cuidar la imagen institucional del capítulo y representar adecuadamente a IEEE EdSoc.'
  },
  'directiva-general': {
    name: 'Directiva General',
    description: 'Equipo encargado de dirigir el capítulo, coordinar sus áreas y garantizar el cumplimiento de los objetivos, actividades y proyectos planificados.',
    profile: 'Persona responsable, organizada y con capacidad de liderazgo, toma de decisiones y resolución de problemas. Debe tener una visión general del capítulo y mantener una comunicación constante con los líderes y voluntarios.',
    responsibilities: [
      'Definir objetivos y prioridades.',
      'Coordinar el trabajo entre las diferentes áreas.',
      'Supervisar actividades, proyectos y cronogramas.',
      'Apoyar en la resolución de bloqueos o dificultades.',
      'Representar institucionalmente al capítulo.',
      'Evaluar resultados y proponer mejoras.'
    ],
    performance: 'Ejercer un liderazgo constante, transparente y respetuoso. Se espera realizar seguimientos periódicos, tomar decisiones justificadas y asegurar que las áreas trabajen de manera coordinada para alcanzar resultados medibles.'
  }
};

function renderAreaDetails(area) {
  if (
    !areaModalTitle ||
    !areaModalDescription ||
    !areaModalProfile ||
    !areaModalResponsibilities ||
    !areaModalPerformance
  ) return;

  areaModalTitle.textContent = area.name;
  areaModalDescription.textContent = area.description;
  areaModalProfile.textContent = area.profile;
  areaModalPerformance.textContent = area.performance;
  areaModalResponsibilities.innerHTML = '';

  area.responsibilities.forEach(responsibility => {
    const item = document.createElement('li');
    item.textContent = responsibility;
    areaModalResponsibilities.appendChild(item);
  });
}

function getFocusableModalItems() {
  if (!areaModalPanel) return [];

  return Array.from(
    areaModalPanel.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
  ).filter(item => {
    const styles = window.getComputedStyle(item);
    return !item.disabled && styles.visibility !== 'hidden' && styles.display !== 'none';
  });
}

function openAreaModal(areaId, trigger) {
  const area = areaDetails[areaId];
  if (!area || !areaModal || !areaModalPanel) return;

  const focusModal = () => {
    areaModalClose?.focus({ preventScroll: true });
    if (document.activeElement !== areaModalClose) {
      areaModalPanel.focus({ preventScroll: true });
    }
  };

  activeAreaButton = trigger;
  renderAreaDetails(area);
  clearTimeout(modalCloseTimer);
  areaModal.hidden = false;
  body.classList.add('modal-open');

  requestAnimationFrame(() => {
    areaModal.classList.add('is-open');
    focusModal();
    setTimeout(focusModal, 80);
  });
}

function closeAreaModal() {
  if (!areaModal || areaModal.hidden) return;

  areaModal.classList.remove('is-open');
  body.classList.remove('modal-open');
  modalCloseTimer = setTimeout(() => {
    areaModal.hidden = true;
    activeAreaButton?.focus();
    activeAreaButton = null;
  }, 240);
}

document.querySelectorAll('.btn-area[data-area]').forEach(button => {
  button.addEventListener('click', () => {
    openAreaModal(button.dataset.area, button);
  });
});

areaModalClose?.addEventListener('click', closeAreaModal);

areaModal?.addEventListener('click', event => {
  if (event.target === areaModal) closeAreaModal();
});

areaModalPanel?.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;

  const focusableItems = getFocusableModalItems();
  if (!focusableItems.length) return;

  const firstItem = focusableItems[0];
  const lastItem = focusableItems[focusableItems.length - 1];

  if (event.shiftKey && document.activeElement === firstItem) {
    event.preventDefault();
    lastItem.focus();
  } else if (!event.shiftKey && document.activeElement === lastItem) {
    event.preventDefault();
    firstItem.focus();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && areaModal && !areaModal.hidden) {
    closeAreaModal();
  }
});

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
