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
