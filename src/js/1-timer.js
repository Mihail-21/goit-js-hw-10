import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let userSelectedDate;
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return renderTimer(days, hours, minutes, seconds);
};
const renderTimer = (days, hours, minutes, seconds) => {
  const daysTarget = document.querySelector('[data-days]');
  const hoursTarget = document.querySelector('[data-hours]');
  const minutesTarget = document.querySelector('[data-minutes]');
  const secondsTarget = document.querySelector('[data-seconds]');
  daysTarget.textContent = days.toString().padStart(2, '0');
  hoursTarget.textContent = hours.toString().padStart(2, '0');
  minutesTarget.textContent = minutes.toString().padStart(2, '0');
  secondsTarget.textContent = seconds.toString().padStart(2, '0');
};
const errorMessage = () => {
  iziToast.error({
    class: 'popup-message',
    theme: 'dark',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    position: 'topRight',
    pauseOnHover: true,
    timeout: 3000,
    message: 'Please choose a date in the future',
  });
};
startBtn.addEventListener('click', () => {
  input.disabled = true;
  startBtn.disabled = true;
  const intervalID = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    convertMs(diff);
    if (diff <= 1000) {
      clearInterval(intervalID);
      input.disabled = false;
    }
  }, 1000);
});
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      errorMessage();
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);
