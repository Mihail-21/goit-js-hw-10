const form = document.querySelector('.feedback-form');
form.addEventListener('submit', handleSubmit);

const LS_Key = 'feedback-form-state';

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('All form fields must be filled in');
    return;
  }

  const formData = { email, message };
  console.log(formData);
  form.reset();
  localStorage.removeItem(LS_Key);
}

form.addEventListener('input', evt => {
  const email = evt.currentTarget.elements.email.value;
  const message = evt.currentTarget.elements.message.value;
  const userData = { email, message };

  localStorage.setItem(LS_Key, JSON.stringify(userData));
});

function renderPage() {
  const lsData = JSON.parse(localStorage.getItem(LS_Key));
  console.log(lsData);

  if (lsData) {
    const { email, message } = form.elements;
    message.value = lsData.message;
    email.value = lsData.email;
  }
}
renderPage();
