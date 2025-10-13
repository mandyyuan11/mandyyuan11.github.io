/* ========== Terminal: Letters to the Void ========== */
(function() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const clearBtn = document.getElementById('clear-btn');
  const downloadBtn = document.getElementById('download-btn');
  const helpBtn = document.getElementById('help-btn');

  if (!input || !output) return; // not on this page

  // small set of poetic auto-responses
  const autoReplies = [
    "Beauty often hides in the quiet places. —Listen.",
    "Grey is where the world leaves room for question marks.",
    "We forget small things because they don't scream — they whisper.",
    "Sometimes clarity is a patient friend, not a sudden revelation.",
    "Keep asking; the light changes for those who look."
  ];

  // load saved lines from localStorage
  const STORAGE_KEY = 'mandy_void_entries_v1';
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }

  function appendLine(text, type = 'user') {
    const p = document.createElement('div');
    p.className = `line {type}`;
    p.textContent = text;
    output.appendChild(p);
    scrollToBottom();
  }

  function typeReply(text, speed = 25) {
    const container = document.createElement('div');
    container.className = 'line reply';
    output.appendChild(container);

    let i = 0;
    const caret = document.createElement('span');
    caret.className = 'typing-caret';
    container.appendChild(caret);
    scrollToBottom();

    function step() {
      if (i < text.length) {
        caret.insertAdjacentText('beforebegin', text[i]);
        i++;
        scrollToBottom();
        setTimeout(step, speed);
      } else {
        // remove caret after finish
        caret.remove();
        scrollToBottom();
      }
    }
    step();
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  function handleCommand(raw) {
    const trimmed = raw.trim();
    if (trimmed === '/clear') {
      output.innerHTML = '';
      history = [];
      saveHistory();
      appendLine('console cleared', 'reply');
      return true;
    }
    if (trimmed === '/help') {
      const helpText = [
        "Commands: /help — show this, /clear — clear console,",
        "/download — download your entries as a text file.",
        "Or just type anything to send a 'letter to the void'."
      ].join(' ');
      appendLine(helpText, 'reply');
      return true;
    }
    if (trimmed === '/download') {
      downloadHistory();
      appendLine('download started', 'reply');
      return true;
    }
    return false;
  }

  function downloadHistory() {
    const content = history.map(h => `[${h.t}] ${h.type.toUpperCase()}: ${h.text}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `letters-to-the-void-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // initial render of saved history
  if (history.length) {
    history.forEach(entry => {
      appendLine(`${entry.text}`, entry.type === 'reply' ? 'reply' : 'user');
    });
  } else {
    // initial prompt
    appendLine("Type something. It doesn't have to be perfect.", 'reply');
  }

  // event handlers
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      if (!val) return;
      // check for slash-commands first
      if (handleCommand(val)) {
        input.value = '';
        return;
      }

      // add user line to output + history
      appendLine(`$ ${val}`, 'user');
      history.push({ t: new Date().toISOString(), type: 'user', text: val });
      saveHistory();

      // small random poetic reply
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setTimeout(() => typeReply(reply), 250);

      history.push({ t: new Date().toISOString(), type: 'reply', text: reply });
      saveHistory();

      input.value = '';
    }
  });

  // control buttons
  if (clearBtn) clearBtn.addEventListener('click', () => {
    output.innerHTML = '';
    history = [];
    saveHistory();
    appendLine('console cleared', 'reply');
  });

  if (downloadBtn) downloadBtn.addEventListener('click', () => {
    downloadHistory();
  });

  if (helpBtn) helpBtn.addEventListener('click', () => {
    handleCommand('/help');
  });

})();









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
