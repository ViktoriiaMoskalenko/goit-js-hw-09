import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

refs.btnStart.addEventListener('click', onStart);
refs.btnStart.setAttribute('disabled', 'false');

let timeDifference = 0;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const intervalDifferent = setInterval(() => {
      timeDifference = selectedDates[0] - new Date();
      console.log('timeDifference', timeDifference);
      if (timeDifference < 0) {
        Notiflix.Notify.warning('Please choose a date in the future');
        clearInterval(intervalDifferent);
      } else if (timeDifference < 1000) {
        Notiflix.Notify.success('Time is up!');
        console.log('Time is up!');
        clearInterval(intervalDifferent);
        refs.input.removeAttribute('disabled');
      } else {
        refs.btnStart.removeAttribute('disabled');
        refs.input.setAttribute('disabled', 'false');
      }
    }, 1000);
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const days = value.days.toString().padStart(2, '0');
  const hours = value.hours.toString().padStart(2, '0');
  const minutes = value.minutes.toString().padStart(2, '0');
  const seconds = value.seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}

function onStart() {
  setInterval(() => {
    const convertTime = addLeadingZero(convertMs(timeDifference));
    refs.days.textContent = convertTime.days;
    refs.hours.textContent = convertTime.hours;
    refs.minutes.textContent = convertTime.minutes;
    refs.seconds.textContent = convertTime.seconds;
  }, 1000);
}
