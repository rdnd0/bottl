document.addEventListener('DOMContentLoaded', () => {
  const flashMessage = document.querySelector('.alert');
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.style.display = 'none';
    }, 3000);
  }

});

const myLink = document.querySelectorAll('.history-link');

myLink.forEach(link => {
  $clamp(link, {
    clamp: 1
  });
});
const backMap = document.getElementById("button-click");

backMap.addEventListener('click', () => {
  window.history.back();
});

const qAnswer = document.getElementById('q-answer');
const qNew = document.getElementById('q-bottle');
const qHistory = document.getElementById('q-history');

if (qAnswer === null || qNew === null || qHistory === null) {} else {
  qAnswer.addEventListener('click', () => {
    const help1 = document.querySelector('.help1');
    help1.classList.toggle("hide");
  });

  qNew.addEventListener('click', () => {
    const help2 = document.querySelector('.help2');
    help2.classList.toggle("hide");
  });

  qHistory.addEventListener('click', () => {
    const help3 = document.querySelector('.help3');
    help3.classList.toggle('hide');
  })


}