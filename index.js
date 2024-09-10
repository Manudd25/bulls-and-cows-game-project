// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input
import promptSync from "prompt-sync";



const prompt= promptSync()

const answer = prompt("what's your name?")
console.log("Welcome to 'Bulls and Cows'", answer)



function generateSecretNumber() {
    let digits = [];

    let availableNumbers = [...Array(10).keys()];

    while (digits.length < 4) {
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        let digit = availableNumbers.splice(randomIndex, 1)[0];
        digits.push(digit);
    }

    return digits.join('');
}


function getUserGuess() {
    let guess;

    while(true) {
        guess = prompt("Enter a 4-digit number with unique digits:")

        if(guess.length !== 4 || isNaN(guess)) {
            console.log("Please enter exactly 4 digits.")
            continue;
        }

        let guessDigits = new Set(guess);
        if(guessDigits.size !== 4) {
            console.log("Digits must be unique.")
            continue;
        }

        return guess;
    }

}

function calculateBullsAndCows(secret, guess) {
    let bulls = 0; 
    let cows = 0;

    for(let i = 0; i < 4; i++) {
        if(secret[i] === guess[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return {bulls, cows}
}


function playGame() {
    let secretNumber = generateSecretNumber();
    let attempts = 0;
    let maxAttempts = 10;


    while (attempts < maxAttempts) {
        let guess = getUserGuess();
        attempts++;

        let {bulls, cows} = calculateBullsAndCows(secretNumber, guess);

        if (bulls === 4) {
            console.log(`Congratulations! The number ${secretNumber} is correct!`)
            break;
        } else {
            console.log(`Bulls: ${bulls}, Cows: ${cows}. Try again!`);
        }
        if (attempts === maxAttempts) {
            console.log(`Sorry, you've used all your attempts. The correct number was ${secretNumber}`);
        }
    }
}

playGame()