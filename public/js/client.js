document.addEventListener('DOMContentLoaded', () => {
  const flashMessage = document.querySelector('.alert');
  if (flashMessage) {
    setTimeout(()=> {
      flashMessage.style.display = 'none';
    }, 3000);
  }
});

const myLink = document.querySelectorAll('.history-link');

myLink.forEach(link => {
    $clamp(link, {clamp: 1});
})