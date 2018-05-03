const inquirer = require("inquirer");
const isLetter = require('is-letter');
const word = require("./Word");
const letter = require("./Letter");

let newWord = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
let gameDisplay = newWord.hangmanGame;

let hangmanGame = {
	words: newWord,
	guessesRemaining: 5,
	display: 0,
	currentWord: null,

	startGame: function() {
		inquirer.prompt([
			{
				type: "Confirm",
				message: "Are you ready to play hangman? (y/n)",
				name: "playGame"
			}
		]).then(function(answer){
			if(answer.playGame == "y") {
				hangmanGame.playGame();
			} else{
				console.log("Come back when you're ready...")
			}
		})
	},

	playGame: function(guesses) {
		if (this.guessesRemaining = 5) {
			var randomNumber = Math.floor(Math.random() * newWord.length);
			this.currentWord = new word(newWord[randomNumber]);
			this.currentWord.getLetter();
			this.guesses = [];
			console.log(this.currentWord.showWord());
			this.promptUser();
		} else {
			this.resetGuessesRemaining();
			this.playGame();
		}
	},

	resetGuessesRemaining: function() {
		guessesRemaining = 5;
	},

	promptUser: function() {
		const that = this;

		inquirer.prompt([
			{
				name: "chooseLetter",
				message: "Guess a letter",
				validate: function(value) {
					if (isLetter(value)) {
						return true;
					} else {
						return false;
					}
				}
			}
		]).then(function(letter) {
			let letterSelected = letter.chooseLetter.toUpperCase();
			let alreadyGuessed = false;

			for (var i = 0; i < that.guesses.length; i ++) {
				if (letterSelected === that.guesses[i]) {
					alreadyGuessed = true;
				}
			}
			if (alreadyGuessed === false) {

				that.guesses.push(letterSelected);
				console.log("Guesses: " + that.guesses);
				let input = that.currentWord.checkInput(letterSelected);
				if (input === 0) {
					console.log("Incorrect! Guess again!");
					that.guessesRemaining--;
					that.display++
					console.log("Guesses remaining: " + that.guessesRemaining);

					console.log("\n-------------------------")
					console.log(that.currentWord.showWord());
					console.log("\n-------------------------")
					console.log("Letters guessed: " + that.guesses);
				} else {
					console.log("Correct!");
					if (that.currentWord.wordMatch() === true) {
						console.log(that.currentWord.showWord());
						console.log("Congrats! You won!");
						hangmanGame.startGame();
					} else {
						console.log("Guesses remaining: " + that.guessesRemaining);
						console.log(that.currentWord.showWord());
						console.log("Letters guessed: " + that.guesses);
					}
				}

				if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
					that.promptUser();
				} else if (that.guessesRemaining === 0) {
					console.log("GAME OVER! YOU LOSE!");
					console.log("The correct word was: " +  that.currentWord.word);
					hangmanGame.startGame();
				}
			} else {
				console.log("Letter has already been guessed. Guess again.");
				that.promptUser();
			}
		})
	}
}

hangmanGame.startGame();