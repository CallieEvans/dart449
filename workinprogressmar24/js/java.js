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


    // Set up the event listener to call decryptText when login is clicked
    //login.addEventListener('click', decryptText);  // Do not call decryptText() here


    const browserTorTog = document.querySelector('.tor');
    const browserSafariTog = document.querySelector('.safari');
    const browserFolderTog = document.querySelector('.folder');


    const popupLoginPop = document.querySelector('.users');
    const popupCreAccPop = document.querySelector('.create-acc');
    const popupCreAccTog = document.querySelector('.account-popup');
    const popupLoginTog = document.querySelector('.login-popup');


    const browserSafari = document.querySelector('.safari-b-pop-up');
    const browserSafariClose = document.querySelector('.safari-close');


    const browserTor = document.querySelector('.tor-pop-up');
    const browserTorClose = document.querySelector('.tor-close');

    const browserFolder = document.querySelector('.folder-pop-up');
    const browserFolderClose = document.querySelector('.folder-close');


    /**
     * Map the transition 
     */


    /**
     * shuffle icons - chatgpt
     */
    function shuffleIconsSmoothly() {
        function moveIcon(icon, maxOffset) {
            let randomX = (Math.random() - 0.5) * maxOffset; // Random movement in X direction
            let randomY = (Math.random() - 0.5) * maxOffset; // Random movement in Y direction

            let currentTop = parseFloat(icon.style.top) || 0;
            let currentLeft = parseFloat(icon.style.left) || 0;

            // Apply movement smoothly
            icon.style.top = `${Math.min(Math.max(currentTop + randomY, 5), 80)}vh`;
            icon.style.left = `${Math.min(Math.max(currentLeft + randomX, 5), 90)}vw`;
        }

        function animate() {
            moveIcon(browserTorTog, 3);  // Moves slightly
            moveIcon(browserSafariTog, 3);
            moveIcon(browserFolderTog, 3);
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Start shuffling after icons appear
    // login.addEventListener('click', () => {
    //     bringInIcons();
    //     setTimeout(shuffleIconsSmoothly, 00); // Delay before shuffling starts
    // });





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
            //console.log('Public IP address:', ip);
            ipDisplay.textContent = `${ip}`;

            // Now fetch the geolocation info based on the IP
            return fetch(`https://ipinfo.io/${ip}/json`);
        })
        .then(response => response.json())
        .then(locationData => {
            //console.log('Location Data:', locationData);

            // Extract city, region (province/state), and country
            const city = locationData.city;
            const region = locationData.region; // This will typically be the province or state
            const country = locationData.country;

            cityDisplay.textContent = `${city} //`;
            provDisplay.textContent = `${region} //`;

            // console.log(`City: ${city}, Province/State: ${region}, Country: ${country}`);
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });



    const torImg = document.querySelector('.tor-img');
    const safariImg = document.querySelector('.safari-img');
    const folderImg = document.querySelector('.folder-img');
    /**
  * Modal Openings, browsers and logins
  */
    //Folder
    function openFolder() {
        browserFolder.style.display = 'flex';
    }
    browserFolderTog.addEventListener('click', openFolder);
    browserFolderTog.addEventListener('mouseout', folderUnhover);

    function folderHover() {
        folderImg.src = "img/folder-hover.png";
    }

    function folderUnhover() {
        folderImg.src = "img/folder-og.png"; // Replace with your default image
    }

    folderImg.addEventListener("mouseover", folderHover);

    function closeFolder() {
        browserFolder.style.display = 'none';
    }
    browserFolderClose.addEventListener('click', closeFolder);



    //tor
    function openTor() {
        browserTor.style.display = 'flex';
    }
    browserTorTog.addEventListener('click', openTor);
    browserTorTog.addEventListener('mouseout', torUnhover);

    function torHover() {
        torImg.src = "img/tor-hover.png";
    }

    function torUnhover() {
        torImg.src = "img/tor-og.png"; // Replace with your default image
    }

    torImg.addEventListener("mouseover", torHover);

    function closeTor() {
        browserTor.style.display = 'none';
    }
    browserTorClose.addEventListener('click', closeTor);


    //safari
    function openSafari() {
        browserSafari.style.display = 'flex';
    }
    browserSafariTog.addEventListener('click', openSafari);
    browserSafariTog.addEventListener('mouseout', safariUnhover);

    function safariHover() {
        safariImg.src = "img/safari-hover.png";
    }

    function safariUnhover() {
        safariImg.src = "img/safari-og.png"; // Replace with your default image
    }

    safariImg.addEventListener("mouseover", safariHover);

    function closeSafari() {
        browserSafari.style.display = 'none';
    }
    browserSafariClose.addEventListener('click', closeSafari);

    function loginPopUp() {
        popupCreAccPop.style.display = 'block';
        popupLoginPop.style.display = 'none';
    }

    popupCreAccTog.addEventListener('click', loginPopUp);

    function accPopUp() {
        popupCreAccPop.style.display = 'none';
        popupLoginPop.style.display = 'block';
    }

    popupLoginTog.addEventListener('click', accPopUp);


    //Show scroll bar always

    let sc;

    // Constantly update the scroll position
    sc = setInterval(scrollDown, 200);

    // Optional: Stop the updating if the user clicks
    document.querySelector('.scroll-bar').addEventListener('mousedown', function () {
        clearInterval(sc);
    });

    function scrollDown() {
        // Find every div with the class "mydiv" and apply the fix
        let mydivs = document.querySelectorAll('.scroll-bar');
        mydivs.forEach(function (g) {
            try {
                g.scrollTop += 1;
                g.scrollTop -= 1;
            } catch (e) {
                // Eliminates errors when no scroll is needed
            }
        });
    }

    //window loaded
});



