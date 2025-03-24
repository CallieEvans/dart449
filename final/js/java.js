//Chatgpt
function updateTime() {
    const dateNow = new Date();
    const timeShow = document.getElementById('time-date');

    const currentTime = dateNow.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    timeShow.innerHTML = currentTime;
}

// Update time every second
setInterval(updateTime, 1000);

// Call once to set the time immediately
updateTime();


const browserSafariTog = document.querySelector('.safari');
const browserSafari = document.querySelector('.safari-pop-up');
const browserSafariClose = document.querySelector('.safari-close');


// const popupLoginPop = document.querySelector('.users');
// const popupCreAccPop = document.querySelector('.create-acc');
// const popupCreAccTog = document.querySelector('.account-popup');
// const popupLoginTog = document.querySelector('.login-popup');

// const browserTorTog = document.querySelector('.tor');
// const browserTor = document.querySelector('.tor-pop-up');
// const browserTorClose = document.querySelector('.tor-close');

// //login vars
let userSignedIn;

/**
 * Modal Openings, browsers and logins
 */
// function openSafari() {
//     browserSafari.style.display = 'flex';
// }
// browserSafariTog.addEventListener('click', openSafari);
// browserSafariTog.addEventListener('mouseover', safariHover);
// browserSafariTog.addEventListener('mouseout', safariUnhover);

// function safariHover() {
//     browserSafariTog.src = "/img/safari-hover.png";
// }

// function safariUnhover() {
//     browserSafariTog.src = "/img/safari-og.png"; // Replace with your default image
// }

// browserSafariTog.addEventListener("mouseover", safariHover);

// function closeSafari() {
//     browserSafari.style.display = 'none';
// }
// browserSafariClose.addEventListener('click', closeSafari);

// //Tor
// function openTor() {
//     browserTor.style.display = 'flex';
// }
// browserTorTog.addEventListener('click', openTor);
// browserTorTog.addEventListener('mouseover', torHover);
// browserTorTog.addEventListener('mouseout', torUnhover);

// function torHover() {
//     browserTorTog.src = "/img/tor-hover.png";
// }

// function torUnhover() {
//     browserTorTog.src = "/img/tor-og.png"; // Replace with your default image
// }

// browserTorTog.addEventListener("mouseover", torHover);

// function closeTor() {
//     browserTor.style.display = 'none';
// }
// browserTorClose.addEventListener('click', closeTor);
// //logins
// function loginPopUp() {
//     popupCreAccPop.style.display = 'block';
//     popupLoginPop.style.display = 'none';
// }

// popupCreAccTog.addEventListener('click', loginPopUp);

// function accPopUp() {
//     popupCreAccPop.style.display = 'none';
//     popupLoginPop.style.display = 'block';
// }

// popupLoginTog.addEventListener('click', accPopUp);