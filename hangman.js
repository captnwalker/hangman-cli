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

//Vars - set permitted letters, arrays for guesses and display
var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessed = [];
var correctGuess = [];
var letterDisplay;
//Set game var
var game = {
    //Fetch words, set # of guesses, start null
    wordBank: dictionary,
    guessesRemaining: 10,
    currentWord: null,


    setupGame: function () {
        //Initial guess count
        this.remainingGuesses = 10;

        //Generate random POTUS name from dictionary.js
        var pres = Math.floor(Math.random() * this.dictionary.length);
        this.currentWord = this.dictionary[pres];

        //Display letters placeholders and any correctly guessed letters here
        letterDisplay = new displayLetters(this.currentWord);
        letterDisplay.parseDisplay();
        console.log("Guesses Remaining: " + game.remainingGuesses);

        //Prompt for another letter
        guessAgain();
    }
};

function guessAgain() {

    //prompt player for a new letter unless 0
    if (game.remainingGuesses > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess another Letter: "
            }
        ]).then(function (userInput) {

            // Collect Letter Input
            var letterGuessed = userInput.letter.toLowerCase();

            // Valid input
            if (dictionary.indexOf(letterGuessed) == -1) {