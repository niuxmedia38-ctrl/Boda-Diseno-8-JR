const entrance = document.querySelector('#entrance');
const openButton = document.querySelector('#openInvitation');
const invitation = document.querySelector('#invitation');

function openInvitation() {
  if (entrance.classList.contains('opening')) return;
  entrance.classList.add('opening');
  openButton.disabled = true;

  window.setTimeout(() => {
    invitation.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('locked');
    entrance.classList.add('dismissed');
    invitation.focus({ preventScroll: true });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 1450);
}

openButton.addEventListener('click', openInvitation);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });

// Vista de control local: permite capturar el póster completo sin alterar la experiencia normal.
if (new URLSearchParams(window.location.search).has('preview')) {
  entrance.classList.add('dismissed');
  invitation.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

const weddingDate = new Date('2026-09-18T16:30:00-06:00');
const units = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const day = 86400000;
  units.days.textContent = String(Math.floor(remaining / day)).padStart(3, '0');
  units.hours.textContent = String(Math.floor((remaining % day) / 3600000)).padStart(2, '0');
  units.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
  units.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelector('#rsvpForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Hola, soy ${data.get('name')}. ${data.get('attendance')} a la boda de Georgiy y Arina.`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

