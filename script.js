let score = 0;
let lives = 5;
let answerButtons = [];
let timer;
let timeLeft = 10; // 10 seconds per question

// Load sound effects
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const timeoutSound = new Audio('timeout.mp3'); // New timeout sound

// Function to update the HUD (Score, Lives, Timer)
function updateHUD() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('lives').textContent = `Lives: ${'❤️'.repeat(lives)}`;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
}

// Function to start the countdown timer
function startTimer() {
    clearInterval(timer); // Reset any previous timer
    timeLeft = 10; // Reset timer to 10 seconds
    updateHUD();

    timer = setInterval(() => {
        timeLeft--;
        updateHUD();

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Function to handle timeout (player loses a life)
function handleTimeOut() {
    timeoutSound.play(); // Play timeout sound
    lives--; // Lose a life

    if (lives <= 0) {
        alert("Game Over! Restarting...");
        startGame();
        return;
    }

    displayNextQuestion(); // Move to the next question
}

// Function to generate a random multiplication question (1 to 12)
function getRandomMultiplicationQuestion() {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    return { question: `${num1} x ${num2}`, correctAnswer: num1 * num2 };
}

// Function to generate 9 unique answers (including the correct one)
function generateAnswers(correctAnswer) {
    const answers = new Set([correctAnswer]);

    while (answers.size < 9) {
        const randomAnswer = Math.floor(Math.random() * 144) + 1; // 1 to 144
        answers.add(randomAnswer);
    }

    return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle answers
}

// Function to handle answer selection (mouse & keyboard)
function handleAnswerSelection(selectedButton, answer, correctAnswer) {
    clearInterval(timer); // Stop the timer when the user selects an answer

    if (answer === correctAnswer) {
        selectedButton.style.backgroundColor = 'green';
        correctSound.play();
        score++;
    } else {
        selectedButton.style.backgroundColor = 'red';
        wrongSound.play();
        lives--;

        if (lives <= 0) {
            alert("Game Over! Restarting...");
            startGame();
            return;
        }
    }

    updateHUD();

    setTimeout(() => {
        if (lives > 0) {
            displayNextQuestion();
        }
    }, 700);
}

// Function to display the next question and reset the timer
function displayNextQuestion() {
    const { question, correctAnswer } = getRandomMultiplicationQuestion();

    document.getElementById('question').textContent = question;

    const answers = generateAnswers(correctAnswer);

    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    answerButtons = [];

    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.style.transition = 'background-color 0.3s';

        button.addEventListener('click', () => handleAnswerSelection(button, answer, correctAnswer));

        gridContainer.appendChild(button);
        answerButtons.push({ button, answer });
    });

    startTimer(); // Start timer for the new question
}

// Function to start the game (resets score, lives, and timer)
function startGame() {
    score = 0;
    lives = 5;
    updateHUD();
    displayNextQuestion();
}

// Function to handle keyboard input
function handleKeyPress(event) {
    const keyMap = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];
    const keyIndex = keyMap.indexOf(event.key.toLowerCase());

    if (keyIndex !== -1 && answerButtons[keyIndex]) {
        answerButtons[keyIndex].button.click();
    }
}

// Attach event listener to the start button
document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);

// Initialize the HUD on page load
updateHUD();
