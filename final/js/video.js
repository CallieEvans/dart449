
//code generated from AI, references from this tutorial: https://shamsfiroz.medium.com/capturing-photos-with-javascriptusing-accessing-the-camera-8aefb5e6fa5f
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

async function startWebcam() {
    //Check and log errors? (try and catch)
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            setTimeout(takePhoto, 500); // Give camera a second to adjust
        };
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
}

function takePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to image and display
    photo.src = canvas.toDataURL('image/png');
    photo.style.display = 'block';
}

startWebcam();