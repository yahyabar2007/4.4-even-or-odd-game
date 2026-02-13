let attempets = 0;
let score = 0;
let currentStreak = 0;
let highestStreak = 0;
function guess(userGuess) {
    attempets++;
    document.getElementById("attempts").innerHTML = attempets;
    //randomNumber
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    //correctAnswer
    const correctAnswer = randomNumber % 2 == 0 ? "even" : "odd";
    //SFXsound
    function sfx(isCorrect) {
        let audio = isCorrect
            ? document.getElementById("correct")
            : document.getElementById("wrong");
        audio.play();
        audio.currntTime = 0;
        audio.puase();
    }
    if (correctAnswer === userGuess) {
        //update display
        document.getElementById("display").innerHTML = "correct answer is " + randomNumber;
        //increase score
        score++;
        document.getElementById("Score").innerHTML = score;
        //sound
        sfx(true);
    } else {
        //update display
        document.getElementById("display").innerHTML = "false answer  "
            + randomNumber;
        //sound
        sfx(false);
    }

}