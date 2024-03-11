import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay');
const fieldset = document.querySelector('fieldset');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const delay = evt.currentTarget.elements.delay.value;
  const promiseState = evt.currentTarget.elements.state.value;

  createPromise(promiseState, delay)
    .then(res =>
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${res.delay}ms`,
        position: 'topRight',
        color: '#B5EA7C',
        messageColor: '#ffffff',
        close: false,
        closeOnClick: true,
        progressBar: false,
      })
    )
    .catch(error =>
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${error.delay}ms`,
        position: 'topRight',
        color: '#FFBEBE',
        messageColor: '#ffffff',
        close: false,
        closeOnClick: true,
        progressBar: false,
      })
    );

  evt.currentTarget.reset();
}

function createPromise(promiseState, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        res({ delay });
      } else {
        rej({ delay });
      }
    }, delay);
  });
}
