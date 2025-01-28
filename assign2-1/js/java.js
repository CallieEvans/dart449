
const changeText = document.querySelector('.text-change');
const btn = document.querySelector('.btn');
const appear = document.querySelector('.appear');
const hiddenSect = document.querySelector('.hidden-sect');


btn.addEventListener('click', function () {
    changeText.textContent = 'Pickles & Bananas';
    appear.classList.add('appeared');
});


window.addEventListener("keydown", function () {
    hiddenSect.style.display = 'block';
    window.scrollTo(0, 1000);
});