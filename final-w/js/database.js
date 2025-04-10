

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/firestore/quickstart
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";
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

    // const userPassDisplay = document.querySelector('.userpass');
    let currentUser = document.querySelector('#user-input');
    //let currentPass = document.querySelector('#user-pass');
    const btn = document.querySelector('.submit');
    const forumNameDisplay = document.querySelector('.username-display');
    let currentforum = document.querySelector('.topic');
    let currentforumTor = document.querySelector('.topic-tor');
    const btnForum = document.querySelector('.forum-sub');
    const btnForumTor = document.querySelector('.forum-sub-tor');

    const loginBtn = document.querySelector('.login');


    const userTextImage = document.querySelector('.img-user-signed-in');


    //login vars
    let userSignedIn;
    let lastUserElement = null;




    //Connect to Database - Firebase

    /**
     * Add user function
     */
    //Await has to be combine with async, to issue the js knows to wait
    async function addUser(user, icon) {
        try {
            const usersRef = collection(db, "Users");
            const docRef = doc(usersRef, user);

            await setDoc(docRef, {
                user: user,
                icon: icon
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    //const user = userSignedIn;  // Replace this with the actual user or get it dynamically
    //fetchUserData();


    /**
 * Update the user name & password
 */
    async function updateUser() {
        let confirm = document.querySelector('.login-conf');
        let user = currentUser.value;

        const images = ['img/users-random/user-1.png', 'img/users-random/user-2.png', 'img/users-random/user-3.png'];
        let randomImgNum = Math.floor(Math.random() * images.length);
        let icon = images[randomImgNum];

        startWebcam(user, icon);
        appendToUser(user, icon);

        if (user != null) {
            confirm.style.display = 'block';
        }

        // Add user icon to Firebase
        await addUser(user, icon);  // Save to Firebase
        fetchUserData(user);  // Fetch the updated icon and display it
    }



    btn.addEventListener('click', updateUser);

    /**
 * Start the webcam and streama video , came partly from Chatgpt
 */
    async function startWebcam(user, icon) {
        //Check and log errors? (try and catch)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            video.onloadedmetadata = () => {
                setTimeout(() => takePhoto(user, icon), 500);
            };
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    }

    /**
 * take photo of user and upload the the database
 */
    function takePhoto(user, icon) {
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
                addUser(user, icon);
            });

        });
        //photo.style.display = 'block';
    }

    /**
   * Update the user name & password
   */

    async function triggerUser() {
        const usersRef = collection(db, "Users"); // Reference to the "Users" collection
        const userLoginList = await getDocs(usersRef); // Fetch all documents

        const userList = document.querySelector('.user-list'); // Get the container
        userList.innerHTML = ''; // Clear previous users

        // Loop through each user in the database
        userLoginList.forEach((doc) => {
            const userData = doc.data();
            const loginPopup = document.querySelector('.login-pop-up');

            // Create the HTML elements dynamically
            const userDiv = document.createElement('li');
            userDiv.classList.add('user-item'); // Add a class for styling

            // Create user icon (initially set to placeholder)
            const userIcon = document.createElement('img');
            userIcon.src = userData.icon; // Use a default icon if none is found
            userIcon.classList.add('user-icon');
            // Add dynamic class for user

            // Create user name (p element)
            const userName = document.createElement('p');
            userName.textContent = userData.user;
            userName.classList.add(userData.user.trim().replace(/\s+/g, '-')); // Add dynamic class for user
            // Append user name and password input to the user container
            userDiv.appendChild(userIcon);
            userDiv.appendChild(userName);
            userList.appendChild(userDiv);

            bindUserClick(userName, userData.user);
        });
    }
    /**
     * Calling the login popup here so it doesnt trigger our forum , Timeout is from chatgpt
     *  */
    const loginPopup = document.querySelector('.login-pop-up');
    loginBtn.addEventListener('click', function () {
        if (!userSignedIn) {
            console.log('No user selected.');
            return; // Prevent proceeding if no user is selected
        }

        loginPopup.style.display = 'none';
        retrieveImage(userSignedIn);
        fetchUserData(userSignedIn);

        // Delay triggerForum to ensure data is set
        setTimeout(() => {
            triggerForum(userSignedIn);
        }, 500);
    });


    async function appendToUser(doc, icon) {
        // const userData = doc;
        // const loginPopup = document.querySelector('.login-pop-up');
        const userList = document.querySelector('.user-list'); // Get the container

        // Create the HTML elements dynamically
        const userDiv = document.createElement('li');
        userDiv.classList.add('user-item'); // Add a class for styling

        const userIcon = document.createElement('img');
        userIcon.src = icon;
        userIcon.classList.add('user-icon'); // Add dynamic class for user

        // Create user name (p element)
        const userName = document.createElement('p');
        userName.textContent = doc;
        //ai for the replace function
        userName.classList.add(doc.trim().replace(/\s+/g, '-')); // Add dynamic class for user

        // Create password input (initially hidden)
        // const passInput = document.createElement('input');
        // passInput.type = 'text';
        // passInput.classList.add(doc.trim().replace(/\s+/g, '-'), 'user-sign-in');
        // passInput.placeholder = 'Enter password';
        // passInput.style.display = 'none'; // Hide by default

        // Append user name and password input to the user container
        userDiv.appendChild(userIcon);
        userDiv.appendChild(userName);
        // userDiv.appendChild(passInput);
        userList.appendChild(userDiv);


        // = userDiv.querySelector('.user-sign-in');

        bindUserClick(userName, doc);
    }

    triggerUser(); // Call the function to initialize the functionality


    /**
     * Works to make the toggle trigger and track both new users and existing ones, this was generated by chatGpt
     */
    function bindUserClick(userNameElement, username) {
        userNameElement.addEventListener('click', function () {
            // Remove highlight from the last user if it's different
            if (lastUserElement && lastUserElement !== userNameElement) {
                lastUserElement.classList.remove('user-highlight');
            }

            // Toggle highlight
            if (lastUserElement === userNameElement) {
                userNameElement.classList.remove('user-highlight');
                lastUserElement = null;
                userSignedIn = null;
            } else {
                userNameElement.classList.add('user-highlight');
                lastUserElement = userNameElement;
                userSignedIn = username;
                console.log(`Welcome ${userSignedIn}`);
            }
            const browserTorTog = document.querySelector('.tor');
            const browserSafariTog = document.querySelector('.safari');
            const browserFolderTog = document.querySelector('.folder');
            let login = document.querySelector('.login');
            function bringInIcons() {
                browserTorTog.style.top = '25vh';
                browserTorTog.style.left = '70vw';
                browserTorTog.style.opacity = '1';

                browserSafariTog.style.top = '50%';
                browserSafariTog.style.left = '35vw';
                browserSafariTog.style.opacity = '1';

                browserFolderTog.style.top = '20%';
                browserFolderTog.style.left = '10vw';
                browserFolderTog.style.opacity = '1';
            }
            login.addEventListener('click', bringInIcons);
        });
    }


    // Fetch user data (including the icon) before the user logs in
    async function fetchUserData(user) {
        const usersRef = collection(db, "Users");
        const docRef = doc(usersRef, user);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userIcon = userData.icon;
                console.log('User Icon:', userIcon);
                // Update the user icon on the page
                // updateUserIcon(userIcon);
            } else {
                console.log("No such user!");
            }
        } catch (e) {
            console.error("Error fetching user data: ", e);
        }
    }

    // Update the user icon in the frontend
    // function updateUserIcon(icon) {
    //     const userIconElement = document.querySelector('.user-icon'); // Make sure the selector matches your actual HTML
    //     if (userIconElement) {
    //         userIconElement.src = icon;
    //     }
    // }


    async function retrieveImage(userSignedIn) {

        const storage = getStorage();
        const photoRef = ref(storage, `users/${userSignedIn}.png`);


        getDownloadURL(photoRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                photo.src = url;
                photo.style.display = 'block';
                // Append user name here!!!
                //Add username to the bottom underneath image
                userTextImage.textContent = `${userSignedIn}`;
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });

    }

    /**
 * Add forum post
 */
    async function addforum(forum, i) {
        // Check if a user is signed in
        if (!userSignedIn) {
            console.error("No user signed in.");
            return;
        }
        try {
            const forumsRef = collection(db, 'Forums');
            const docRef = doc(forumsRef); // Generate a document reference without passing the forum as the ID

            // Add forum with user reference
            await setDoc(docRef, {
                forum: forum,
                currentUser: userSignedIn // Associate with signed-in user
            });
            triggerForum(userSignedIn);

            console.log("Forum written with ID: ", docRef.id);


            // Now pass the forum data object, including the document ID
            const forumData = {
                id: docRef.id,
                forum: forum,
                currentUser: userSignedIn
            };

            // Pass the forumData object to appendToForum
            appendToForum(forumData, i, 0);

        } catch (e) {
            console.error("Error adding forum: ", e);
        }
    }


    /**
   * Update the forum name & password
   */
    function updateforum(i) {
        let forum = currentforum.value;
        i = document.querySelectorAll('.safari-b-pop-up .forum-item').length + 1; // Calculate new index
        //forumNameDisplay.textContent = forum;

        //Calling from database.js
        addforum(forum, i);
        // getforum(forum);


    }

    btnForum.addEventListener('click', updateforum);

    /**
* Update the forum name & password
*/
    function updateforumTor(i) {
        let forum = currentforumTor.value;
        i = document.querySelectorAll('.tor-pop-up .forum-item').length + 1; // Calculate new index
        //forumNameDisplay.textContent = forum;

        //Calling from database.js
        addforum(forum, i);
        // getforum(forum);


    }

    btnForumTor.addEventListener('click', updateforumTor);



    /**
    * Update the forum entry
    */

    async function triggerForum(user) {
        const forumsRef = collection(db, "Forums"); // Reference to the "forums" collection
        const forumLoginList = await getDocs(forumsRef); // Fetch all documents

        const forumLists = document.querySelectorAll('.forum-list'); // Get all forum containers

        forumLists.forEach(forumList => {
            forumList.innerHTML = ''; // Clear previous forums
        });

        let i = 0;

        for (const forumDoc of forumLoginList.docs) { // Renamed 'doc' to 'forumDoc'
            i++;
            const forumData = forumDoc.data();
            const repliesRef = collection(db, "Replies");
            const queryReplies = query(repliesRef,
                where('forumPost', '==', forumData.forum)
            );
            const results = await getDocs(queryReplies);


            // Create container for forum post
            const forumDiv = document.createElement('li');
            forumDiv.classList.add('forum-item');

            // Forum text container 
            const forumContainer = document.createElement('div');
            forumContainer.classList.add('forum-container');

            // inner forum text container 
            const innerForum = document.createElement('div');
            innerForum.classList.add('inner');

            // reply text container 
            const replyContainer = document.createElement('div');
            replyContainer.classList.add('reply-container');
            replyContainer.style.display = 'none'; // Initially hidden


            // reply btn
            const replyBtn = document.createElement('button'); // Changed from 'btn' to 'button'
            replyBtn.textContent = 'Reply';
            replyBtn.classList.add('reply-btn');

            //Add delete section
            const delBtn = document.createElement('button'); // Changed from 'btn' to 'button'
            delBtn.textContent = 'Delete';
            delBtn.classList.add('delete-btn');

            //Add comments section
            let comI = results.size; // Count the number of replies
            const comments = document.createElement('p');
            //Got help from chatGPT
            comments.textContent = `${comI} comment${comI === 1 ? '' : 's'}`;
            comments.classList.add('comment-count');

            const symbol = document.createElement('p');
            symbol.classList.add('symbol-slash');
            symbol.textContent = `//`;


            // Forum text
            const forumName = document.createElement('p');
            forumName.textContent = forumData.forum;
            forumName.classList.add('forum-post');

            // Display the user who created the forum post
            const currentUser = document.createElement('p');
            currentUser.textContent = ` ${String(i).padStart(2, '0')} // ${forumData.currentUser}`;
            currentUser.classList.add('forum-creator');

            // Reply input field
            const replyInputs = document.createElement('input');
            replyInputs.type = 'text';
            replyInputs.placeholder = 'Add your reply';
            replyInputs.classList.add('reply-input');

            // Reply submit button
            const replySubmit = document.createElement('button');
            replySubmit.classList.add('reply-submit');
            replySubmit.textContent = 'Submit';


            // Append elements
            replyContainer.appendChild(replyInputs);
            replyContainer.appendChild(replySubmit);
            innerForum.appendChild(currentUser);
            innerForum.appendChild(forumName);
            forumContainer.appendChild(innerForum);
            forumContainer.appendChild(comments);
            forumContainer.appendChild(symbol);
            forumContainer.appendChild(replyBtn);
            forumContainer.appendChild(delBtn);
            forumDiv.appendChild(forumContainer);
            forumDiv.appendChild(replyContainer);

            // Update welcome message
            const welcomeUser = document.querySelectorAll('.welcome-user');
            //userSignedIn = forumDoc.data().currentUser;
            //console.log(userSignedIn);
            welcomeUser.forEach(element => {
                element.textContent = `Welcome ${user}`;

            });

            // Add event listener for reply button
            replyBtn.addEventListener('click', function () {
                replyContainer.classList.toggle('toggle-reply');
            });

            //delete function but only for first forum
            delBtn.addEventListener('click', async function () {
                try {
                    // Get the forum ID from the current document (forumDoc)
                    const forumId = forumDoc.id; // Now using forumDoc.id

                    // Get a reference to the document
                    const docRef = doc(db, "Forums", forumId);

                    // Delete the document from Firestore
                    await deleteDoc(docRef);


                    // Remove the forum item from both the original and cloned forum lists
                    forumLists[0].removeChild(forumDiv);
                    forumLists[1].removeChild(clonedForumDiv); // Remove the cloned forum from the second list

                    console.log(`Forum post with ID ${forumId} has been deleted.`);
                    triggerForum(user)

                } catch (error) {
                    console.error("Error deleting forum post: ", error);
                }
            });

            replySubmit.addEventListener('click', function () { updateReply(replyInputs); triggerForum(user); });

            forumLists[0].appendChild(forumDiv);


            const clonedForumDiv = forumDiv.cloneNode(true);


            clonedForumDiv.id = `cloned-forun-div-${forumData.currentUser}-${i}`;
            forumDiv.setAttribute("cloneRef", clonedForumDiv.id);

            forumDiv.id = `orig-forun-div-${forumData.currentUser}-${i}`;
            clonedForumDiv.setAttribute("origRef", forumDiv.id);



            // add event listener to the cloned reply button
            clonedForumDiv.querySelector('.reply-btn').addEventListener('click', function () {
                clonedForumDiv.querySelector('.reply-container').classList.toggle('toggle-reply');
            });

            clonedForumDiv.querySelector('.reply-submit').addEventListener('click', function () { updateReply(clonedForumDiv.querySelector('.reply-input')); triggerForum(user); });

            forumLists[1].appendChild(clonedForumDiv);

            results.forEach((doc) => {
                appendToReply(doc.data().reply, forumName, doc.data().currentUser, comI);


            });
        };



        decryptText();
    }

    triggerForum();
    /**
     * Decrypting ther text
     */
    function decryptText() {
        let forumText = document.querySelectorAll('.safari-b-pop-up .forum-post, .safari-b-pop-up .reply-post');

        // Sorted list of symbols
        const symbols = ['!', '#', '@', '^', '█', '5', '93', '2', '0', '█', '4', '67', '8'];

        // Map each letter to a symbol
        const letterToSymbolMap = {};

        // Create a mapping from letters to symbols
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Add any other characters you need to map
        alphabet.split('').forEach((letter, index) => {
            letterToSymbolMap[letter] = symbols[index % symbols.length]; // If you run out of symbols, loop back around
        });

        // Function to replace each letter with its corresponding symbol
        function replaceWithMappedSymbols(text) {
            let replacedText = '';

            // Loop through each character of the text and replace it with the corresponding symbol
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const symbol = letterToSymbolMap[char] || char; // If there's no mapped symbol, keep the original character (e.g., punctuation)
                replacedText += symbol;
            }

            return replacedText;
        }

        // Example usage
        forumText.forEach(element => {
            const inputText = element.textContent;
            const outputText = replaceWithMappedSymbols(inputText);
            element.textContent = outputText;
        });
    }


    /**
     * Append to forum
     */
    async function appendToForum(forumData, i, comI) {
        const forumLists = document.querySelectorAll('.forum-list');

        const forumDiv = document.createElement('li');
        forumDiv.classList.add('forum-item');

        const forumContainer = document.createElement('div');
        forumContainer.classList.add('forum-container');

        const innerForum = document.createElement('div');
        innerForum.classList.add('inner');

        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-container');
        replyContainer.style.display = 'none';

        const replyBtn = document.createElement('button');
        replyBtn.textContent = 'Reply';
        replyBtn.classList.add('reply-btn');

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delete-btn');

        const forumName = document.createElement('p');
        forumName.textContent = forumData.forum;
        forumName.classList.add('forum-post');

        // Display comment count
        const comments = document.createElement('p');
        comments.textContent = `${comI} comment${comI === 1 ? '' : 's'}`;
        comments.classList.add('comment-count');

        const symbol = document.createElement('p');
        symbol.classList.add('symbol-slash');
        symbol.textContent = `//`;

        const currentUser = document.createElement('p');
        currentUser.textContent = `${String(i).padStart(2, '0')} // ${forumData.currentUser}`;
        currentUser.classList.add('forum-creator');

        const replyInputs = document.createElement('input');
        replyInputs.type = 'text';
        replyInputs.classList.add('reply-input');

        const replySubmit = document.createElement('button');
        replySubmit.classList.add('reply-submit');
        replySubmit.textContent = 'Submit';

        replyContainer.appendChild(replyInputs);
        replyContainer.appendChild(replySubmit);
        innerForum.appendChild(currentUser);
        innerForum.appendChild(forumName);
        forumContainer.appendChild(innerForum);
        forumContainer.appendChild(comments);
        forumContainer.appendChild(symbol);
        forumContainer.appendChild(replyBtn);
        forumContainer.appendChild(delBtn);
        forumDiv.appendChild(forumContainer);
        forumDiv.appendChild(replyContainer);

        replyBtn.addEventListener('click', function () {
            replyContainer.classList.toggle('toggle-reply');
        });

        delBtn.addEventListener('click', async function () {
            try {
                const forumId = forumData.id;
                const docRef = doc(db, "Forums", forumId);

                await deleteDoc(docRef);

                forumLists[0].removeChild(forumDiv);

                const clonedForumDivId = forumDiv.getAttribute("cloneRef");
                const clonedForumDiv = document.getElementById(clonedForumDivId);

                if (clonedForumDiv) {
                    forumLists[1].removeChild(clonedForumDiv);
                }

                console.log(`Forum post with ID ${forumId} has been deleted.`);

            } catch (error) {
                console.error("Error deleting forum post: ", error);
            }
        });

        forumLists[0].appendChild(forumDiv);

    }





    /**
    * Add replies
    */
    async function addreply(reply, forumPostContainer) {
        try {
            const repliesRef = collection(db, 'Replies');
            const docRef = doc(repliesRef, reply);


            await setDoc(docRef, {
                reply: reply,
                forumPost: forumPostContainer.textContent,
                currentUser: userSignedIn
            });

            console.log("reply written with ID: ", docRef.id);
            appendToReply(reply, forumPostContainer, userSignedIn);

        } catch (e) {
            console.error("Error adding reply: ", e);
        }
    }

    /**
    * Update the reply
    */
    function updateReply(replyInputs) {
        // e.preventDefault();
        console.log('updating reply');
        const currentreply = replyInputs
        let reply = currentreply.value;
        let forumPostContainer = currentreply.parentElement.parentElement.querySelector('.forum-post');


        //Calling from database.js
        addreply(reply, forumPostContainer);



    }




    /**
     * Appending to reply
     */
    async function appendToReply(doc, forumContainer, userReplied) {
        let forumItem = forumContainer.parentElement.parentElement.parentElement;
        let replyContainer = forumItem.querySelector('.reply-container');

        const replyData = doc;

        // Create container for forum post
        const replyDiv = document.createElement('li');
        replyDiv.classList.add('reply-item');

        // Forum text
        const replyName = document.createElement('p');
        replyName.textContent = replyData;
        replyName.classList.add('reply-post');

        const symbol = document.createElement('p');
        symbol.classList.add('symbol-slash-child');
        symbol.textContent = `//`;

        // Display the user who created the forum post
        const currentUser = document.createElement('p');
        currentUser.textContent = `${userReplied}`;
        currentUser.classList.add('reply-creator');

        // Append elements to forum container
        replyDiv.appendChild(replyName);
        replyDiv.appendChild(symbol);
        replyDiv.appendChild(currentUser);
        replyContainer.appendChild(replyDiv);

        let cloneReply = replyDiv.cloneNode(true);
        let refId = forumItem.getAttribute("cloneRef");
        if (refId === null) {
            let origId = forumItem.getAttribute("origRef");

            let replyContainer_clone = document.querySelector(`#${origId}`).querySelector('.reply-container');
            replyContainer_clone.appendChild(cloneReply);
        }
        else {
            let replyContainer_clone = document.querySelector(`#${refId}`).querySelector('.reply-container');

            replyContainer_clone.appendChild(cloneReply);
        }

        decryptText();

    }

}