
const dateNow = new Date();
const timeShow = document.getElementById('time-date');
const userNameDisplay = document.querySelector('.username-display');
const userPassDisplay = document.querySelector('.userpass');
let currentUser = document.querySelector('#user-input');
let currentPass = document.querySelector('#user-pass');
const btn = document.querySelector('.submit');

//Chatgpt (only for the time section)
const currentTime = dateNow.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

timeShow.innerHTML = currentTime;

/**
 * Update the user name & password
 */
function updateUser() {
    user = currentUser.value;
    pass = currentPass.value;
    userNameDisplay.textContent = user;
    userPassDisplay.textContent = pass;
}

btn.addEventListener('click', updateUser);