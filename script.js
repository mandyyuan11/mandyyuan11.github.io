// =====================
// Terminal Interaction
// =====================
const input = document.querySelector('#terminal input');
const output = document.querySelector('#terminal .output');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const line = document.createElement('p');
    line.textContent = `> ${input.value}`;
    output.appendChild(line);
    input.value = '';
  }
});

// =====================
// Noticing Page Carousel
// =====================
const images = [
  {
    src: "sunlight.jpg",
    caption: "Light flitting through blinds, a classic rememberence of nostalgia"
  },
  {
    src: "bluewindows.jpg",
    caption: "Glass windows with a blue hue."
  }
];

let currentIndex = 0;
const imgEl = document.getElementById('notice-img');
const captionEl = document.getElementById('notice-caption');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function updatePhoto() {
  if (!imgEl || !captionEl) return;
  imgEl.style.opacity = 0;
  captionEl.style.opacity = 0;

  setTimeout(() => {
    imgEl.src = images[currentIndex].src;
    captionEl.textContent = images[currentIndex].caption;
    imgEl.style.opacity = 1;
    captionEl.style.opacity = 1;
  }, 200);
}

if (imgEl && captionEl && nextBtn && prevBtn) {
  updatePhoto();
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePhoto();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updatePhoto();
  });
}

// =====================
// Header Offset Fix
// =====================
const header = document.querySelector('header');
const main = document.querySelector('main');
if (header && main) {
  main.style.marginTop = `${header.offsetHeight}px`;
}
