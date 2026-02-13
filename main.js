// -------------------------------
// Game State Variables
// -------------------------------
let attempt = 0;          // Total guesses
let score = 0;            // Correct guesses
let currentStreak = 0;    // Current consecutive correct answers
let highestStreak = 0;    // Maximum streak achieved
let wrongAnswer = 0;      // Total wrong answers

let timeLeft = 10;        // Countdown seconds per guess
let timerRunning = false; // Flag to prevent multiple timers

// -------------------------------
// Recursive Timer Function
// -------------------------------
function startTimerRecursive() {
    if (timerRunning) return; // prevent multiple timers
    timerRunning = true;
    timeLeft = 10;
    document.getElementById("time").innerHTML = timeLeft;

    function countdown() {
        document.getElementById("time").innerHTML = timeLeft;

        if (timeLeft <= 0) {
            timerRunning = false;

            // Automatically count as wrong answer
            wrongAnswer++;
            document.getElementById("wrongCount").innerHTML = wrongAnswer;

            // Reset streak
            currentStreak = 0;
            document.getElementById("current").innerHTML = currentStreak;

            document.getElementById("display").innerHTML = "Time's up!";

            // Play wrong sound
            const wrongAudio = document.getElementById("wrongSound");
            wrongAudio.currentTime = 0;
            wrongAudio.play();

            // Check Game Over
            if (wrongAnswer >= 5) {
                document.getElementById("display").innerHTML =
                    "Game Over! Final Score: " + score;
                document.getElementById("playAgainBtn").style.display = "block";
            }
            return;
        }

        timeLeft--; // decrease time
        setTimeout(countdown, 1000); // call recursively after 1 sec
    }

    countdown(); // Start countdown
}

// -------------------------------
// Main Game Function
// -------------------------------
function guess(userGuess) {
    if (wrongAnswer >= 5) return; // Stop game if already lost

    startTimerRecursive(); // start countdown timer

    // Increase attempt counter
    attempt++;
    document.getElementById("attempt").innerHTML = attempt;

    // Generate random number and check even/odd
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const correctAnswer = randomNumber % 2 === 0 ? "even" : "odd";

    // Sound function
    function playSound(isCorrect) {
        const audio = isCorrect
            ? document.getElementById("correct")
            : document.getElementById("wrongSound");
        audio.currentTime = 0;
        audio.play();
    }

    // Correct guess
    if (correctAnswer === userGuess) {
        timerRunning = false; // stop timer
        document.getElementById("display").innerHTML =
            "Correct! Number was " + randomNumber;

        score++;
        document.getElementById("score").innerHTML = score;

        currentStreak++;
        document.getElementById("current").innerHTML = currentStreak;

        if (currentStreak > highestStreak) {
            highestStreak = currentStreak;
            document.getElementById("highest").innerHTML = highestStreak;
        }

        playSound(true);
    } 
    // Wrong guess
    else {
        timerRunning = false; // stop timer
        wrongAnswer++;
        document.getElementById("wrongCount").innerHTML = wrongAnswer;

        document.getElementById("display").innerHTML =
            "Wrong! Number was " + randomNumber;

        currentStreak = 0;
        document.getElementById("current").innerHTML = currentStreak;

        playSound(false);

        if (wrongAnswer >= 5) {
            document.getElementById("display").innerHTML =
                "Game Over! Final Score: " + score;
            document.getElementById("playAgainBtn").style.display = "block";
        }
    }
}

// -------------------------------
// Restart Game Function
// -------------------------------
function restartGame() {
    attempt = 0;
    score = 0;
    currentStreak = 0;
    wrongAnswer = 0;
    timerRunning = false;
    timeLeft = 10;

    document.getElementById("attempt").innerHTML = attempt;
    document.getElementById("score").innerHTML = score;
    document.getElementById("current").innerHTML = currentStreak;
    document.getElementById("highest").innerHTML = highestStreak;
    document.getElementById("wrongCount").innerHTML = wrongAnswer;
    document.getElementById("display").innerHTML = "Even or Odd Game";
    document.getElementById("time").innerHTML = timeLeft;

    document.getElementById("playAgainBtn").style.display = "none";
}
