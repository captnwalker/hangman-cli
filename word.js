//constructor used to check letters that the player guesses against letters in the random word

function playersGuess(letter, word) {

    //loop to check if guessed letter is in the random word
    if (word.indexOf(letter) != -1) {
        return true;
    }
    else {
        return false;
    }
};

//function exporter
module.exports = playersGuess;