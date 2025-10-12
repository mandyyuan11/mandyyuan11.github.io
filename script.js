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

// ---- Noticing Page ----
const images = [
  {
    src: "sunlight.jpg",
    caption: "Light flitting through blinds, a classic token of nostalgia"
  },
  {
    src: "bluewindows.jpg",
    caption: "Glass windows with a blue hue."
  }
];

let currentIndex = 0;
const imgEl = document.getElementById('notice-img');
const captionEl = document.getElementById('notice-caption');

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

if (imgEl && captionEl) { // only run if on the Noticing page
  document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePhoto();
  });

  document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updatePhoto();
  });
}
