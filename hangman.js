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
//Vars - set permitted letters and arrays for guesses
var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessed = [];
var correctGuess = [];

var game = {
    //fetch words, set # of guesses, start null
    wordBank: dictionary,
    guessesRemaining: 10,
    currentWrd: null,


    setupGame: function () {
        //initial guess count
        this.guessesRemaining = 10;

        //generate random POTUS name
        var pres = Math.floor(Math.random() * this.dictionary.length);
        this.currentWord = this.dictionary[pres];

    }
}