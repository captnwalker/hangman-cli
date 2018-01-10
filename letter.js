//constructor that determines if letter appears as a "_" or as itself in the display
var displayLetter = function (word, correctGuess) {

    this.randomWord = word;
    this.goodLetter = correctGuess;
    this.displayText = '';

    //set winner false initially
    this.winner = false;

    //function displays word to player
    this.parseDisplay = function () {

        //show player the word
        var show = '';

        //loop if bad guess
        if (this.goodLetter == undefined) {
            for (var i = 0; i < this.randomWord.length; i++) {
                show += ' _ ';
            }
        }
        // else check all letters
        else {

            //loop through the word and each possible correct letter
            for (var i = 0; i < this.randomWord.length; i++) {

                var letterFound = false;
                for (var j = 0; j < this.goodLetter.length; j++) {
                    
                    if (this.randomWord[i] == this.goodLetter[j]) {
                        show += this.goodLetter[j];
                        letterFound = true;
                    }
                }
                //if letter not found
                if (!letterFound) {
                    show += ' _ ';
                }
            }
        }

        //trim first&last space
        this.displayText = show.trim();
        console.log(this.displayText);

        //check for win
        if (this.displayText == this.randomWord) {
            this.winner = true;
        }

    }
};

//exporter
module.exports = displayLetter;