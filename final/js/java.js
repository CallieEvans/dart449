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

document.addEventListener('DOMContentLoaded', function () {
    let login = document.querySelector('.login');

    function decryptText() {
        let forumText = document.querySelectorAll('.forum-post');

        // Sorted list of symbols
        const symbols = ['!', '#', '@', '^', '█', '5', '93', '2', '0', '█'];

        function replaceWithRandomSymbols(text) {
            let replacedText = '';

            // Loop through each character of the text and replace it with a random symbol
            for (let i = 0; i < text.length; i++) {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                replacedText += randomSymbol;
            }

            return replacedText;
        }

        // Example usage
        forumText.forEach(element => {
            const inputText = element.textContent;
            const outputText = replaceWithRandomSymbols(inputText);
            console.log(outputText);

            // Update the text content of the element with random symbols
            element.textContent = `${outputText}`;
        });
    }

    // Set up the event listener to call decryptText when login is clicked
    login.addEventListener('click', decryptText);  // Do not call decryptText() here




    const cityDisplay = document.querySelector('.city');
    const provDisplay = document.querySelector('.province');
    const ipDisplay = document.querySelector('.ip-address');

    /**
        * Get IP address / location done with ChatGPT
        */
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            console.log('Public IP address:', ip);
            ipDisplay.textContent = `${ip}`;

            // Now fetch the geolocation info based on the IP
            return fetch(`https://ipinfo.io/${ip}/json`);
        })
        .then(response => response.json())
        .then(locationData => {
            console.log('Location Data:', locationData);

            // Extract city, region (province/state), and country
            const city = locationData.city;
            const region = locationData.region; // This will typically be the province or state
            const country = locationData.country;

            cityDisplay.textContent = `${city} //`;
            provDisplay.textContent = `${region} //`;

            console.log(`City: ${city}, Province/State: ${region}, Country: ${country}`);
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });

});