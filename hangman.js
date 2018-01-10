//Hangman CLI Game

//Load Requires
var inquirer = require('inquirer');

var prompt = require('prompt');

const chalk = require('chalk');

var figlet = require('figlet');

var displayLetter = require('./letter.js');

var playersGuess = require('./word.js');

var playersGuess = require('./dictionary.js');

//Game Splash Intro Screen and instructions
figlet('', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bgYellowBright.hidden(data))

figlet('Welcome to ', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bgYellowBright.bold(data))

    figlet('Presidential', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bgYellowBright.bold(data))

        figlet(' Hangman!!  ', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.red.bgYellowBright.bold(data))

            console.log(chalk.blueBright.bgYellowBright.bold("        10 Guesses Permitted *** You May Begin         "));
        });
    });
});
});

//Vars - set permitted letters, arrays for guesses and display 'gallows'
var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessed = [];
var correctGuess = [];
var displayGallows;

//Set game var
var game = {
    //Fetch words, set # of guesses, start null
    potus: wordList,
    guessesRemaining: 10,
    currentWord: null,


    setupGame: function () {
        //Initial guess count
        this.remainingGuesses = 10;

        //Generate random POTUS name from dictionary.js
        var i = Math.floor(Math.random() * this.potus.length);
        this.currentWord = this.potus[i];

        //Display letters placeholders and any correctly guessed letters here
        displayGallows = new displayLetter(this.currentWord);
        displayGallows.parseDisplay();
        console.log("Guesses Remaining: " + game.remainingGuesses);

        //Prompt for another guess
        guessAgain();
    }
};

function guessAgain() {

    // Insert colored break between responses
    console.log(chalk.yellowBright.bgCyanBright.bold("+++++++++++++++++++++++++++++++++"));

    //prompt player for a new letter unless 0
    if (game.remainingGuesses > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess another Letter: "
            }
        ]).then(function (userInput) {

            //take in players letter
            var playersGuess = userInput.letter.toLowerCase();

            //validate players input
            if (letter.indexOf(playersGuess) == -1) {

                //not a letter response
                console.log('You entered "' + playersGuess + '" which is not a letter. Please try again!');
                console.log('Guesses Remaining: ' + game.remainingGuesses);
                console.log('Letters already guessed: ' + guessedLetters);
                guessAgain();

            }
            else if (letter.indexOf(playersGuess) != -1 && guessedLetters.indexOf(playersGuess) != -1) {

                //already guessed that letter response
                console.log('You already guessed "' + playersGuess + '". Please try again!');
                console.log('Guesses Remaining: ' + game.remainingGuesses);
                console.log('Letters already guessed: ' + guessedLetters);
                guessAgain();

            }
            else {

                guessedLetters.push(playersGuess);

            }
        }

