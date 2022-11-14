const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

let timerId = null;

btnStop.setAttribute('disabled', 'false');

function onStart() {
  btnStart.setAttribute('disabled', 'false');
  btnStop.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  btnStop.setAttribute('disabled', 'false');
  btnStart.removeAttribute('disabled');
  clearInterval(timerId);
}
