function getPassword(password) {
    return function(pwd) {
        if (pwd === password) {
            return 'Correct password';
        }
        else {
            return 'Incorrect password';
        }
    } 
}

const checker1 = getPassword('hello_world');

console.log(checker1('hello_world'));
console.log(checker1('hello_word'));