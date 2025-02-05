
const btn = document.querySelector('.btn');
const hiddenSect = document.querySelector('.hidden-sect');
const pointDisplay = document.querySelector('.point');
const inputTextOne = document.querySelector('.best-album');
const answerOne = document.querySelector('.quiz-message');
const quizSubmitOne = document.querySelector('.submit');
const nextBtn = document.querySelector('.btn-next');
const bgImg = document.querySelector('.bg');
const questions = document.querySelector('.question');
const questionPrompt = document.querySelector('.question-prompt');
//Set tracker for if statements
let tracker = 'unanswered';
//Define points
let points = 0;
/**
 * Check if the first button is clicked then unhide section
 */
btn.addEventListener('click', function () {
    hiddenSect.style.display = 'flex';
    //Scroll to section
    setTimeout(() => {
        hiddenSect.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    //lil chatgpt with the timeout
});
/**
 * Check the quizzes and update the answers and colours
 */
function checkQuiz() {
    const quizOne = inputTextOne.value;
    if ((quizOne === 'Collide With The Sky') && (tracker === 'unanswered')) {
        //Update answers
        answerOne.textContent = `Congrats you are cultured!`;
        //Set points
        points += 10;
        pointDisplay.textContent = points;

        //Change colours
        document.documentElement.style.setProperty("--light", "var(--dark)");
        bgImg.style.backgroundImage = "url(img/cwts.webp)"

        // Move to next question
        nextBtn.style.display = 'block';
        tracker = 'answered';

    } else if ((tracker === 'answered') && (quizOne === 'A Little Piece of Heaven')) {
        questions.textContent = `Congrats you answered all my questions & are cultured :p`;
        //Hide the text
        nextBtn.style.display = 'none';
        answerOne.style.display = 'none';
        inputTextOne.style.display = 'none';
        quizSubmitOne.style.display = 'none';
        //Update the score
        questionPrompt.textContent = `Score: ${points}`;
        //Change the colours
        document.documentElement.style.setProperty("--light", "var(--finish)");
        bgImg.style.backgroundImage = "url(img/alexandru-acea-RQgKM1h2agA-unsplash.jpg)";
        bgImg.style.backgroundPosition = "center";



    } else {
        //Update answers
        answerOne.textContent = `Wrong! Go read a book or smth >:(`;
        answerOne.style.display = 'block';
        //Set points
        points -= 1;
        pointDisplay.textContent = points;


    }


}

function nextQuiz() {
    questions.textContent = `What is Avenged Sevenfold's most controversial song(Hint: ... ... ... ... Heaven)`;
    answerOne.style.display = 'none';
    nextBtn.style.display = 'none';
    setTimeout(() => {
        hiddenSect.scrollIntoView({ behavior: 'smooth' });
    }, 50);

}
nextBtn.addEventListener('click', nextQuiz);

quizSubmitOne.addEventListener('click', checkQuiz);