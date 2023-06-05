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

// while (true) {
//     const numberToGuess = Math.round(Math.random())
//     console.log('Я загадал:', numberToGuess)
//     /* Метод Math.random() возвращает псевдослучайное число с плавающей запятой из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1), которое затем можно 
//     отмасштабировать до нужного диапазона. Реализация сама выбирает начальное зерно для алгоритма генерации случайных чисел; оно не может быть выбрано или сброшено пользователем. */
    
//     const numberFromUser = prompt('Введите число 0 или 1:')
//     console.log('Вы ввели:', numberFromUser)

//     if (numberFromUser === 'q') {
//         break;
//     }
//     if (isNaN(+numberFromUser) || (+numberFromUser != 0 && +numberFromUser != 1)) {
//         alert('Вы ввели не число 0 или 1')
//     } else if (+numberFromUser === numberToGuess) {
//         alert('Вы угадали!')
//     } else {
//         alert('Вы не угадали!')
//     }
// }
