document.addEventListener('DOMContentLoaded', function () {
    // Grab buttons
    const desktopBtn = document.querySelector('.desktop2');
    const documentsBtn = document.querySelector('.documents');
    const photosBtn = document.querySelector('.photos');
    const downloadBtn = document.querySelector('.download');
    const programBtn = document.querySelector('.programmer');

    // Grab popups
    const deskPop = document.querySelector('.desk-pop');
    const docPop = document.querySelector('.doc-pop');
    const docPopFirst = document.querySelector('.doc-pop-first');
    const photosPop = document.querySelector('.photo-pop');
    const downloadPop = document.querySelector('.download-pop');
    const proPop = document.querySelector('.program-pop');

    // Put all popups in an array for easy clearing
    const allPopups = [deskPop, docPop, docPopFirst, photosPop, downloadPop, proPop];

    // Helper function to hide all and show one
    function showOnly(targetPopup) {
        allPopups.forEach(p => p.classList.remove('active-fold'));
        targetPopup.classList.add('active-fold');
    }

    // Set default on load
    showOnly(docPopFirst);

    // Event listeners for each button
    desktopBtn?.addEventListener('click', () => showOnly(deskPop));
    documentsBtn?.addEventListener('click', () => showOnly(docPop));
    photosBtn?.addEventListener('click', () => showOnly(photosPop));
    downloadBtn?.addEventListener('click', () => showOnly(downloadPop));
    programBtn?.addEventListener('click', () => showOnly(proPop));
});
