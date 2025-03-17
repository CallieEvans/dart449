

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/firestore/quickstart
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { collection, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration


const firebaseConfig = {

    apiKey: "AIzaSyDDaAYFwy-Wu6FL75taosaIbMzkl2UiCh8",

    authDomain: "dart-449.firebaseapp.com",

    projectId: "dart-449",

    storageBucket: "dart-449.firebasestorage.app",

    messagingSenderId: "663886236750",

    appId: "1:663886236750:web:38debd42f1475ea52f871f"

};

window.onload = function () {
    // Initialize Firebase & firebase storage
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const db = getFirestore(app, '(default)');


    //code generated from AI, references from this tutorial: https://shamsfiroz.medium.com/capturing-photos-with-javascriptusing-accessing-the-camera-8aefb5e6fa5f
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');

    const userNameDisplay = document.querySelector('.username-display');

    const userPassDisplay = document.querySelector('.userpass');
    let currentUser = document.querySelector('#user-input');
    let currentPass = document.querySelector('#user-pass');
    const btn = document.querySelector('.submit');
    const forumNameDisplay = document.querySelector('.username-display');
    let currentforum = document.querySelector('#topic');
    const btnForum = document.querySelector('.forum-sub');

    const loginBtn = document.querySelector('.login');

    const popupLoginPop = document.querySelector('.users');
    const popupCreAccPop = document.querySelector('.create-acc');
    const popupCreAccTog = document.querySelector('.account-popup');
    const popupLoginTog = document.querySelector('.login-popup');

    const browserSafariTog = document.querySelector('.safari');
    const browserSafari = document.querySelector('.Tor-pop-up');
    const browserSafariClose = document.querySelector('.safari-close');

    /**
     * Modal Openings, browsers and logins
     */
    function openSafari() {
        browserSafari.style.display = 'flex';
    }
    browserSafariTog.addEventListener('click', openSafari);

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



    //login vars
    let userSignedIn;


    //Connect to Database - Firebase

    /**
     * Add user function
     */
    //Await has to be combine with async, to issue the js knows to wait
    async function addUser(user, pass) {
        //Try = try to call the collection, Await tells to wait until the docs are found
        try {
            //add a document to our collection of users
            // const docRef = await addDoc(collection(db, "Users"), {
            //     //The different fields
            //     user: user,
            //     pass: pass
            // });
            const usersRef = collection(db, 'Users');
            const docRef = doc(usersRef, user);
            await setDoc(docRef, {
                user: user,
                pass: pass
            });
            console.log("Document written with ID: ", docRef.id);
            // Catch = to log the error  or 'catch' it so it doesnt break code
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    /**
     * Retreive users when create button is clicked
     */
    async function getUser(user) {
        try {
            //get a document to our collection of users
            const docRef = doc(db, "Users", user);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            console.log("Document retrieved with ID: ", docRef.id);
            // Catch = to log the error  or 'catch' it so it doesnt break code
        } catch (e) {
            console.error("Error getting document: ", e);
        }
    }
    /**
 * Update the user name & password
 */
    function updateUser() {
        let user = currentUser.value;
        let pass = currentPass.value;
        userNameDisplay.textContent = user;
        userPassDisplay.textContent = pass;

        //Calling from database.js
        startWebcam(user, pass);
    }

    btn.addEventListener('click', updateUser);

    /**
 * Start the webcam and streama video , came partly from Chatgpt
 */
    async function startWebcam(user, pass) {
        //Check and log errors? (try and catch)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            video.onloadedmetadata = () => {
                setTimeout(() => takePhoto(user, pass), 500);
            };
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    }

    /**
 * take photo of user and upload the the database
 */
    function takePhoto(user, pass) {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to image and display
        photo.src = canvas.toDataURL('users/png');
        //get canvas display to save image to firestorage
        let blob = canvas.toBlob((blob) => {
            const storageRef = ref(storage, `users/${user}.png`);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                addUser(user, pass);
            });

        });
        photo.style.display = 'block';
    }

    /**
      * Retreive forums when create button is clicked
      */
    async function getforum(forum) {
        try {
            //get a document to our collection of forums
            const docRef = doc(db, "Forums", forum);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            console.log("Document retrieved with ID: ", docRef.id);
            // Catch = to log the error  or 'catch' it so it doesnt break code
        } catch (e) {
            console.error("Error getting document: ", e);
        }
    }

    /**
 * Add forum post
 */
    async function addforum(forum) {
        //This was AI, I couldn't figure it out
        if (!userSignedIn) {
            console.error("No user signed in.");
            return;
        }
        try {
            const forumsRef = collection(db, 'Forums');
            const docRef = doc(forumsRef, forum);

            // Add forum with user reference
            await setDoc(docRef, {
                forum: forum,
                currentUser: userSignedIn // Associate with signed-in user
            });

            console.log("Forum written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding forum: ", e);
        }
    }

    /**
   * Update the forum name & password
   */
    function updateforum() {
        let forum = currentforum.value;
        forumNameDisplay.textContent = forum;

        //Calling from database.js
        addforum(forum);
        getforum(forum);

    }

    btnForum.addEventListener('click', updateforum);

    /**
    * Update the user name & password
    */

    async function triggerUser() {
        const usersRef = collection(db, "Users"); // Reference to the "Users" collection
        const userLoginList = await getDocs(usersRef); // Fetch all documents

        const userList = document.querySelector('.user-list'); // Get the container
        userList.innerHTML = ''; // Clear previous users

        //ChatGPT
        // Loop through each user in the database
        userLoginList.forEach((doc) => {
            const userData = doc.data();
            const loginPopup = document.querySelector('.login-pop-up');

            // Create the HTML elements dynamically
            const userDiv = document.createElement('li');
            userDiv.classList.add('user-item'); // Add a class for styling

            // Create user name (p element)
            const userName = document.createElement('p');
            userName.textContent = userData.user;
            //ai for the replace function
            userName.classList.add(userData.user.trim().replace(/\s+/g, '-')); // Add dynamic class for user

            // Create password input (initially hidden)
            const passInput = document.createElement('input');
            passInput.type = 'text';
            passInput.classList.add(userData.user.trim().replace(/\s+/g, '-'), 'user-sign-in');
            passInput.placeholder = 'Enter password';
            passInput.style.display = 'none'; // Hide by default

            // Append user name and password input to the user container
            userDiv.appendChild(userName);
            userDiv.appendChild(passInput);
            userList.appendChild(userDiv);

            const currentInput = userDiv.querySelector('.user-sign-in');
            // Add event listener to the user name
            userName.addEventListener('click', function () {
                currentInput.style.display = currentInput.style.display === 'none' ? 'block' : 'none';

                // Directly update userSignedIn here
                userSignedIn = userData.user;  // This should correctly assign the signed-in user to the global variable
                console.log(`Welcome ${userSignedIn}`);


                // Trigger any further actions (like showing password input, etc.)
                loginBtn.addEventListener('click', function () {
                    // if (currentInput.value === userData.pass) {
                    //     userSignedIn = userData.user;  // Update again if necessary
                    //     console.log(`${userData.user} signed in successfully`);
                    // } else {
                    //     console.log('Incorrect password');
                    // }
                    loginPopup.style.display = 'none';
                    getUser(userSignedIn);
                    triggerForum();

                });
            });
        });
    }

    triggerUser(); // Call the function to initialize the functionality

    /**
    * Update the forum entry
    */

    async function triggerForum() {
        const forumsRef = collection(db, "Forums"); // Reference to the "forums" collection
        const forumLoginList = await getDocs(forumsRef); // Fetch all documents


        const forumList = document.querySelector('.forum-list'); // Get the container
        forumList.innerHTML = ''; // Clear previous forums

        // Loop through each forum in the database
        forumLoginList.forEach((doc) => {
            const forumData = doc.data();

            // Create container for forum post
            const forumDiv = document.createElement('li');
            forumDiv.classList.add('forum-item');

            const welcomeUser = document.querySelector('.welcome-user');
            welcomeUser.textContent = `Welcome ${userSignedIn}`;

            // Forum text
            const forumName = document.createElement('p');
            forumName.textContent = forumData.forum;
            forumName.classList.add('forum-post');

            // Display the user who created the forum post
            const currentUser = document.createElement('p');
            currentUser.textContent = `// ${forumData.currentUser || 'Unknown'}`;
            currentUser.classList.add('forum-creator');

            // Append to forum container
            forumDiv.appendChild(currentUser);
            forumDiv.appendChild(forumName);
            forumList.appendChild(forumDiv);
        });
    }



    console.log(userSignedIn);

};


