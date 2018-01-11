//Hangman CLI Game

//Load Requires
var inquirer = require('inquirer');

var prompt = require('prompt');

const chalk = require('chalk');

var figlet = require('figlet');

var displayLetter = require('./letter.js');

var checkLetter = require('./word.js');

var wordList = require('./dictionary.js');

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

                console.log(chalk.blueBright.bgYellowBright.bold("        Can You Guess the Name of the POTUS?           "));

                console.log(chalk.blueBright.bgYellowBright.bold("       10 Guesses Permitted *** You May Begin          "));
            });
        });
    });
});

//Vars - set permitted letters, arrays for guesses and display 'gallows' 
var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var guessedLetters = [];
var correctGuesses = [];
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

    // Insert colored, stylized break between responses
    console.log(chalk.yellowBright.bgCyanBright.bold("++++++++++++++++++++++++++++++++++++++++++++++"));

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
                console.log(chalk.yellow.bgRed.bold('     You entered "' + playersGuess + '" which is not a letter, Einstien!      '));
                // console.log('Guesses Remaining: ' + game.remainingGuesses);
                console.log(chalk.yellow.bgRed.bold(game.remainingGuesses + ' Guesses Remaining. Try sticking to the Alphabet, Doofus!!'));
                console.log('Letters already guessed: ' + guessedLetters);
                guessAgain();

            }
            else if (letter.indexOf(playersGuess) != -1 && guessedLetters.indexOf(playersGuess) != -1) {

                //already guessed that letter response
                console.log(chalk.yellow.bgRed.bold('    You already guessed "' + playersGuess + '", Captain Brainiac.        \n      Zombies eat Brains...so you are Safe!           '));
                // console.log('Guesses Remaining: ' + game.remainingGuesses);
                console.log(chalk.yellow.bgRed.bold(game.remainingGuesses + ' Guesses Remaining. Choose A NEW LETTER, BumbleBrain!'));
                console.log('Letters already guessed: ' + guessedLetters);
                guessAgain();

            }
            else {

                guessedLetters.push(playersGuess);

                //check for letter in random word
                var checkWord = checkLetter(playersGuess, game.currentWord);

                //update word
                if (checkWord) {

                    correctGuesses.push(playersGuess);

                    displayGallows = new displayLetter(game.currentWord, correctGuesses);
                    displayGallows.parseDisplay();


                    //winner??
                    if (displayGallows.winner) {

                        console.log(chalk.redBright.bgWhite.bold('    ***WINNER WINNER!! CHICKEN DINNER!!***     '));
                        console.log(chalk.blueBright.bgWhite.bold('       You are a True American Patriot!        '));
                        console.log(chalk.blueBright.bgWhite.bold('Celebrate with a Hotdog & a Slice of Apple Pie!'))
                        return;
                    }
                    //if not, decrement guesses and call guessAgain
                    else {
                        //console.log('Guesses Remaining: ' + game.remainingGuesses);
                        console.log(game.remainingGuesses + ' Guesses Remaining. Choose Wisely!');
                        console.log('Letters already guessed: ' + guessedLetters);
                        guessAgain();
                    }
                }
                //otherwise, decrement guesses and parse gallows
                else {
                    game.remainingGuesses--;

                    displayGallows.parseDisplay();
                    //console.log('Guesses Remaining: ' + game.remainingGuesses);
                    console.log(game.remainingGuesses + ' Guesses Remaining. Choose Wisely!');
                    console.log('Letters already guessed: ' + guessedLetters);
                    guessAgain();
                }
            }
        });
    }
    //player losses when out of guesses 
    else {

        console.log(chalk.white.bgRedBright.bold('  You Lose...and the Trap-Door Swings Open!  '));
        console.log(chalk.yellowBright.bgRedBright.bold('By the way, The POTUS was President "' + game.currentWord + '"'));
    }
}

//call the setupGame function
game.setupGame();