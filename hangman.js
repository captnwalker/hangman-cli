//Hangman CLI Game

//Load Requires
var inquirer = require('inquirer');

var prompt = require('prompt');

const chalk = require('chalk');

var figlet = require('figlet');


//Game Intro and instructions

//console.log(chalk.blue('Hello world!'));

//console.log(chalk.blueBright.bgYellowBright.bold("Hangman is Loaded. Good luck!"));
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

        //Generate random POTUS name
        var pres = Math.floor(Math.random() * this.dictionary.length);
        this.currentWord = this.dictionary[pres];

        //Display letters placeholders ( _ _ _ _ _ ) and any correctly guessed letters here
        letterDisplay = new displayLetters(this.currentWord);
        letterDisplay.parseDisplay();
        console.log("Guesses Remaining: " + game.remainingGuesses);

        //Prompt for another letter
        keepPromptingUser();
    }


};