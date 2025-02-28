const dateNow = new Date();
const timeShow = document.getElementById('time-date');

//Chatgpt (only for the tiune sectuin)
const currentTime = dateNow.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

timeShow.innerHTML = currentTime;