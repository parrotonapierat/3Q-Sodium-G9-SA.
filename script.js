let word;
let answerArray;
let remainingLetters;
let attempts = 5;
let guessedLetters = [];

function startGame() {
    let words = ["blind", "daily", "craft", "crime", "human", "sugar", "grant", "newly", "noise", "reach", "ocean", "magic", "match", "music", 'radio', 'raise', 'taxes', 'tower', 'track', 'trial', 'treat', 'trend', 'fries', 'trend', 'fries', 'undue', 'threw', 'blank', 'waste', 'watch', 'wound', 'write', 'vital', 'voice', 'virus', 'white', 'worst', 'value', 'valid', 'usual', 'woman', 'unity', 'plant', 'manes', 'leads', 'reads', 'parse', 'clean'];
    let randoIndex = Math.floor(Math.random() * words.length);
    word = words[randoIndex];
    remainingLetters = word.length;
    answerArray = new Array(word.length).fill("_");
    guessedLetters = [];
    attempts = 5;
    document.getElementById("chooseRandom").innerHTML = answerArray.join(" ");
    document.getElementById("guessedLetters").innerHTML = "Guessed letters: " + guessedLetters.join(", ");
    document.getElementById("lifeCount").innerHTML = "Lives: " + attempts;
    document.getElementById("letterInput").value = "";
    document.getElementById("letterInput").focus();
}

function handleGuess() {
    let guess = document.getElementById("letterInput").value.toLowerCase();

    
    document.getElementById("letterInput").value = "";

    if (guessedLetters.indexOf(guess) !== -1) {
        alert("You already guessed that letter.");
        return;
    }

    guessedLetters[guessedLetters.length] = guess;
    let correctGuess = false;
    let updatedArray = word.split('').map((char, index) => {
        if ((char === guess.charAt(0) || char === guess.charAt(1)) && answerArray[index] === "_") {
            remainingLetters--;
            correctGuess = true;
            return char;
        }
        return answerArray[index];
    });

    answerArray = updatedArray;
    document.getElementById("chooseRandom").innerHTML = answerArray.join(" ");
    document.getElementById("guessedLetters").innerHTML = "Guessed letters: " + guessedLetters.join(", ");

    attempts--;
    document.getElementById("lifeCount").innerHTML = "Lives: " + attempts;
    if (!correctGuess) {
        showIncorrectGuessImage();
    }
    checkGameStatus();
}

let imageIndex = 0;
let wrongGuessImages = [
    "path1.png",
    "path2.png",
    "path3.png",
    "path4.png",
    "path5.png"
];

function showIncorrectGuessImage() {
    console.log(`<img src="${wrongGuessImages[imageIndex]} alt="Incorrect Guess Image ${imageIndex + 1}"/>`);
    console.log(imageIndex);
    console.log(wrongGuessImages.length);
    if (imageIndex < wrongGuessImages.length) {
        let imageC = document.getElementById("imageC");
        imageC.innerHTML += `<img src="${wrongGuessImages[imageIndex]}" alt="Incorrect Guess Image ${imageIndex + 1}" class="puzzle${imageIndex+1}"  />`;
        imageIndex++;
    }
}

function checkGameStatus() {
    if (remainingLetters === 0) {
        alert("Good job! The word was " + word);
        startGame();
    } else if (attempts === 0) {
        alert("Sorry, you've run out of attempts. The word was " + word);
        startGame();
    }
}

startGame();
