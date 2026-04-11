const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

const savedTheme = localStorage.getItem('ieeeedsoc-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('ieeeedsoc-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

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

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function startAutoplay() {
  stopAutoplay();
  autoplay = setInterval(nextSlide, 4500);
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
}

if (track && slides.length) {
  buildDots();
  updateCarousel();
  startAutoplay();
  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);
  track.closest('.carousel')?.addEventListener('mouseenter', stopAutoplay);
  track.closest('.carousel')?.addEventListener('mouseleave', startAutoplay);
}

joinForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Tu interés fue registrado. Luego puedes conectarlo a Formspree, Netlify Forms o tu backend.';
  formMessage.classList.add('success');
  joinForm.reset();
});
