

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

    //login vars
    let userSignedIn = undefined;


    //Connect to Database - Firebase


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
                getUser(user);
            });

        });
        photo.style.display = 'block';
    }
    /**
     * Display the list of created users
    //  */
    // async function displayUsers() {
    //     const usersRef = collection(db, "Users"); // Reference to the "Users" collection
    //     const userLoginList = await getDocs(usersRef); // Fetch all documents

    //     // const userList = document.querySelector('.user-list'); // Get the container
    //     // userList.innerHTML = ''; // Clear previous users
    //     // // const loginBtn = document.querySelector('.login');

    //     // //Used ChatGPT for the adding in html elements
    //     // userLoginList.forEach((doc) => {
    //     //     const userData = doc.data();
    //     //     const userDiv = document.createElement('li');
    //     //     userDiv.classList.add('user-item'); // Add a class for styling
    //     //     userDiv.innerHTML = `<p class="${userData.user}">${userData.user}</p>   <input type="text" class="user-sign-in" name="password" placeholder="Enter password"> `;
    //     //     userList.appendChild(userDiv);
    //     // });
    // }

    // displayUsers();

    /**
    * Update the user name & password
    */

    async function triggerPass() {
        const usersRef = collection(db, "Users"); // Reference to the "Users" collection
        const userLoginList = await getDocs(usersRef); // Fetch all documents

        const userList = document.querySelector('.user-list'); // Get the container
        userList.innerHTML = ''; // Clear previous users

        //ChatGPT
        // Loop through each user in the database
        userLoginList.forEach((doc) => {
            const loginBtn = document.querySelector('.login');
            const userData = doc.data();

            // Create the HTML elements dynamically
            const userDiv = document.createElement('li');
            userDiv.classList.add('user-item'); // Add a class for styling

            // Create user name (p element)
            const userName = document.createElement('p');
            userName.textContent = userData.user;
            userName.classList.add(userData.user); // Add dynamic class for user

            // Create password input (initially hidden)
            const passInput = document.createElement('input');
            passInput.type = 'text';
            passInput.classList.add(userData.user, 'user-sign-in');
            passInput.placeholder = 'Enter password';
            passInput.style.display = 'none'; // Hide by default

            // Append user name and password input to the user container
            userDiv.appendChild(userName);
            userDiv.appendChild(passInput);
            userList.appendChild(userDiv);

            const currentInput = userDiv.querySelector('.user-sign-in');
            // Add event listener to the user name
            userName.addEventListener('click', function () {
                // Toggle password input visibility when the user name is clicked

                currentInput.style.display = currentInput.style.display === 'none' ? 'block' : 'none';

                loginBtn.addEventListener('click', function () {
                    if (currentInput.value === `${userData.pass}`) {
                        userSignedIn = userData.user;
                        console.log(`${userData.user} signed in`);
                    } else {
                        console.log('incorrect password');
                    }

                });
            });
        });
    }

    triggerPass(); // Call the function to initialize the functionality


    // async function addForumPost(forum) {
    //     //Try = try to call the collection, Await tells to wait until the docs are found
    //     try {
    //         const usersRef = collection(db, 'Forum');
    //         const docRef = doc(usersRef, forum);
    //         await setDoc(docRef, {
    //             forum: forum
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //         // Catch = to log the error  or 'catch' it so it doesnt break code
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }
    // const btnForum = document.querySelector('.forum-sub');
    // btnForum.addEventListener('click', addForumPost());

};


