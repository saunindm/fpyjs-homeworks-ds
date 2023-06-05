const numberToGuess = Math.floor(Math.random() * 1000);
console.log('Загаданное число:', numberToGuess)

while (true) {
    const numberFromUser = prompt('Введите число:')
    console.log('Вы ввели:', numberFromUser)

    if (numberFromUser === 'q') {
        break;
    }
    if (isNaN(+numberFromUser)) {
        alert('Вы ввели не число')
    } else if (+numberFromUser > numberToGuess) {
        alert('Меньше')
    } else if (+numberFromUser < numberToGuess) {
        alert('Больше')
    } else {
        alert('Вы угадали!');
        break;
    }
}