const letter = require("./Letter");

const Word = function(word) {
	this.word = word;
	this.letters = [];
	this.wordFound = false;

	this.getLetter = function () {
		for (let i = 0; i < word.length; i++) {
			let newLetter = new letter(word[i]);
			this.letters.push(newLetter);
		}
	}

	this.wordMatch = function() {
		if (this.letters.every(function(letter){
			return letter.showLetter === true;
		})){
			this.wordFound = true;
			return true;
		}
	}

	this.checkInput = function(guessedLetter) {
		let count = 0;
		this.letters.forEach(function(lttr){
			if (lttr.letter.toUpperCase() === guessedLetter){
				lttr.showLetter = true;
				count++;
			}
		})
		return count;
	}

	this.showWord = function(){
		let display = " ";
		this.letters.forEach(function(letter){
			let currentLetter = letter.letterShow();
			display += currentLetter;
		})
		return display;
	}
}

module.exports = Word;