import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('input', onData);
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

let data = {};
function onData() {
  data = {
    delay: form.elements.delay.value,
    step: form.elements.step.value,
    amount: form.elements.amount.value,
  };
  localStorage.setItem('form-data', JSON.stringify(data));
}

function onSubmit(event) {
  event.preventDefault();
  let localStorData = JSON.parse(localStorage.getItem('form-data'));
  let delay = Number(localStorData.delay);
  let step = Number(localStorData.step);
  let amount = Number(localStorData.amount);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
    delay += step;
  }
}
