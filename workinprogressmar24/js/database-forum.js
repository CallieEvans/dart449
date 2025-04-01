

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
    const db = getFirestore(app, '(default)');


    //code generated from AI, references from this tutorial: https://shamsfiroz.medium.com/capturing-photos-with-javascriptusing-accessing-the-camera-8aefb5e6fa5f
    const forumNameDisplay = document.querySelector('.username-display');
    let currentforum = document.querySelector('#topic');
    const btnForum = document.querySelector('.forum-sub');

    //login vars
    let userSignedIn = 'uSER234354';


    //Connect to Database - Firebase


    //Await has to be combine with async, to issue the js knows to wait
    async function addforum(forum) {
        //Try = try to call the collection, Await tells to wait until the docs are found
        try {
            const forumsRef = collection(db, 'Forums');
            const docRef = doc(forumsRef, forum);
            await setDoc(docRef, {
                forum: forum
            });
            console.log("Document written with ID: ", docRef.id);
            // Catch = to log the error  or 'catch' it so it doesnt break code
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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

            // Create the HTML elements dynamically
            const forumDiv = document.createElement('li');
            forumDiv.classList.add('forum-item'); // Add a class for styling

            // Create forum name (p element)
            const forumName = document.createElement('p');
            forumName.textContent = forumData.forum;
            forumName.classList.add('forum-post'); // Add dynamic class for forum

            //Create user log
            const curretUserForum = document.createElement('p');
            curretUserForum.textContent = `Forum by ${userSignedIn}`;
            curretUserForum.classList.add(userSignedIn); // Add dynamic class for forum

            // Append forum name and password input to the forum container
            forumDiv.appendChild(curretUserForum);
            forumDiv.appendChild(forumName);
            forumList.appendChild(forumDiv);
        });
    }

    triggerForum(); // Call the function to initialize the functionality



};


