const rl = require('readline').createInterface(process.stdin, process.stdout);
const numberToGuess = Math.floor(Math.random() * 1000);
const fs = require('fs');
fs.writeFile("log.txt", `Number to guess: ${numberToGuess}\n`, { flag: "a" }, () => {});

function guessGame(count = 0) {    
    rl.question('Guess the number: ', (numb) => {
        count++;
        let data;
        if(isNaN(numb)) {
            data = `Incorrect input. Tries: ${count}`
        } else if (+numb > numberToGuess) {
            data = `Try Again! You guessed too high. Tries: ${count}`
        } else if (+numb < numberToGuess) {
            data = `Try Again! You guessed too small. Tries: ${count}`
        } else if (+numb === numberToGuess) {
            data = `You guessed right! Tries: ${count}.`
            console.log(data, 'For game log check logs.txt.');
            fs.writeFile("log.txt", `${numb}\n${data}\n`, { flag: "a" }, () => {});
            rl.close();
            return
        } else if (numb === 'quit') {
            rl.close();
            return
        }
        console.log(data);
        fs.writeFile("log.txt", `${numb}\n${data}\n`, { flag: "a" }, () => {});
        guessGame(count);
    })
}

guessGame();