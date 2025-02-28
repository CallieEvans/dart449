let counter = document.querySelector('#counter');
let number = 0;

const cursor = document.querySelector('.cursor');
const ripple = document.querySelector('.rippled');
const links = document.querySelectorAll('a');
const img = document.querySelectorAll('.img-thumb');
const previews = document.querySelector('.preview');
const closed = document.querySelector('.close');
const modal = document.querySelector('.modal');




//I shamelessly got this snow from chatgpt (It's actually not bad js)
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Set random position and size
    let size = Math.random() * 6 + 2; // Size between 2px and 10px
    let startPosX = Math.random() * window.innerWidth; // Random horizontal position
    let duration = Math.random() * 3 + 4; // Fall speed between 2s and 5s
    let opacity = Math.random() * 0.4 + 0.2; // Opacity between 0.5 and 1

    // Apply styles
    snowflake.style.left = `${startPosX}px`;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;

    // Remove snowflake when it reaches bottom
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });

    document.body.appendChild(snowflake);
}

function generateSnowfall() {
    setInterval(createSnowflake, 100); // Create a new snowflake every 100ms
}

generateSnowfall();

document.addEventListener('mousemove', (e) => {
    //Client = mouseX
    const x = e.clientX;
    // console.log(`the x pos= ${x}`);
    const y = e.clientY;
    //Adjust offset from cursor
    cursor.style.transform = `translate3d(calc(${x}px - 20%), calc(${y}px - 20%), 0)`;

    ripple.style.left = `calc(${x}px + 10px)`;
    ripple.style.top = `calc(${y}px + 10px)`;

    previews.style.left = `calc(${x}px + 50px)`;
    previews.style.top = `${y}px`;


});

// When clicked make inner bigger with css
document.addEventListener('mousedown', () => {
    ripple.classList.add('ripple');
});

//Get rid of previous style
document.addEventListener('mouseup', () => {
    ripple.classList.remove('ripple');

});


//Styles for if you over over the link
links.forEach(item => {
    // console.log(item);
    item.addEventListener('mouseover', () => {
        cursor.classList.add('cursor-pressed');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-pressed');
    });
    item.addEventListener('mousedown', () => {
        modal.classList.add('show');
    });
});
closed.addEventListener('mousedown', () => {
    modal.classList.remove('show');

});

//Styles for if you over over the image
img.forEach(item => {
    // console.log(item);
    item.addEventListener('mouseover', () => {
        previews.classList.add('opacity');
    });
    item.addEventListener('mouseleave', () => {
        previews.classList.remove('opacity');
    });
});


