
const changeText = document.querySelector('.text');
const btn = document.querySelector('.changer');

const day = document.querySelector('#day');
const night = document.querySelector('#night');

btn.addEventListener('click', function () {
    changeText.textContent = 'You changed the text';
});


day.addEventListener('click', function () {
    //This. is calling on the day variable
    this.classList.add('change');
    // this.style.opacity = '.2';
});
day.addEventListener('dblclick', function () {
    this.classList.remove('change');
});
night.addEventListener('click', function () {
    //toggle to make it on / off
    this.classList.toggle('change-night');
});

