//Available game words
var words = [
		["Y", "E", "L", "L", "O", "W", "T", "A", "I", "L"], 
		["T", "U", "N", "A"], 
		["S", "A", "L", "M", "O", "N"], 
		["S", "N", "A", "P", "P", "E", "R"], 
		["T", "O", "R", "O"], 
		["G", "R", "U", "N", "T"], 
		["S", "H", "R", "I", "M", "P"], 
		["C", "L", "A", "M"], 
		["O", "C", "T", "O", "P", "U", "S"], 
		["M", "A", "C", "K", "E", "R", "E", "L"], 
		["S", "C", "A", "L", "L", "O", "P"]
];
//Random word generator
var randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);
var life = 6;
//Generates the same number of blanks spaces for the random word
var hiddenWord = Array(randomWord.length);
//Array of letters the user guesses
var guessedLetters = [];

//onkeyup function
document.onkeyup = function(event) {
	//Determines what key was pressed
	var userGuess = event.key;
	userGuess = userGuess.toUpperCase();
	guessedLetters.push(userGuess);

	console.log(guessedLetters);
	console.log(userGuess);
	//checks if user guess is correct or not 
	for (var i = 0; i < randomWord.length; i++){
		if(randomWord[i] === userGuess){
			var correct = true;
			alert("That's it!");
		} else {
			correct = false;
		}
		if (!correct) {
			usedLetters.textContent = guessedLetters;
		}
	}
	//Disable repeated guesses
	for (var i = 0; i < guessedLetters.length-1; i++){
		if (userGuess === guessedLetters[i]){
			alert("STOP pressing that!");
		}
	}
} //end of onkeyup function
