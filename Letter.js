const Letter = function(letter) {
	this.letter = letter;
	this.showLetter = false;

	this.letterShow = function() {
		return !(this.showLetter) ? "_" : this.letter;
	}
}

module.exports = Letter;