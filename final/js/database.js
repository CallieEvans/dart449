

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/firestore/quickstart
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
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



    //Connect to Database - Firebase
    const db = getFirestore(app, '(default)');

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
     * Photo
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

    function takePhoto(user, pass) {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to image and display
        photo.src = canvas.toDataURL('image/png');
        //get canvas display to save image to firestorage
        let blob = canvas.toBlob((blob) => {
            const storageRef = ref(storage, `images/${user}.png`);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                addUser(user, pass);
                getUser(user);
            });

        });
        photo.style.display = 'block';


    }

    async function displayUsers() {
        const usersRef = collection(db, "Users"); // Reference to the "Users" collection
        const userLoginList = await getDocs(usersRef); // Fetch all documents

        const userList = document.querySelector('.user-list'); // Get the container
        userList.innerHTML = ''; // Clear previous users
        // const loginBtn = document.querySelector('.login');

        userLoginList.forEach((doc) => {
            const userData = doc.data();
            const userDiv = document.createElement('li');
            userDiv.classList.add('user-item'); // Add a class for styling
            userDiv.innerHTML = `<p>${userData.user}</p> `;
            userList.appendChild(userDiv);
        });
    }
    displayUsers();

};