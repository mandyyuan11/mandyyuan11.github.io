// ---------- Terminal (on index.html) ----------
const input = document.querySelector('#terminal input');
const output = document.querySelector('#terminal .output');

if (input && output) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      const line = document.createElement('p');
      line.textContent = `> ${input.value}`;
      output.appendChild(line);
      input.value = '';
    }
  });
}

// ---------- Image Navigation (on noticing.html) ----------
const images = [
  {
    src: "images/sunlight.jpg",
    caption: "Light flitting through blinds, a classic reminder of nostalgia"
  },
  {
    src: "images/bluewindow.jpg",
    caption: "Glass windows with a blue hue."
  }
];

let currentIndex = 0;
const imgEl = document.getElementById('notice-img');
const captionEl = document.getElementById('notice-caption');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updatePhoto() {
  imgEl.style.opacity = 0;
  captionEl.style.opacity = 0;

  setTimeout(() => {
    imgEl.src = images[currentIndex].src;
    captionEl.textContent = images[currentIndex].caption;
    imgEl.style.opacity = 1;
    captionEl.style.opacity = 1;
  }, 300);
}

if (imgEl && captionEl && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updatePhoto();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePhoto();
  });
}
