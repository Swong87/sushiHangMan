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
console.log(words[1]);
//Generates the same number of blanks spaces for the random word
var hiddenWord = Array(randomWord.length);
//Array of letters the user guesses
var yay = document.getElementById("yay");
var wrongLetters = [];
var wins = document.getElementById("wins");
var winsCount = 0;
var newWord = new Array(randomWord.length);
var finish = true;
var guessField = document.getElementById("currentWord");
var correct = false;


//function to print new word
function printNewWord(){
	for (var i = 0; i < newWord.length; i++){
	var blank = document.createTextNode(newWord[i]);
	guessField.appendChild(blank);
	}
}

function init(){
	var life = 6;
	var wrongLetters = 0;	

	printNewWord();

	// Make blank word equal to game word
	for (var i = 0; i < newWord.length; i++){
		newWord[i] = "_ ";
	}

	//once you get six wrong letters, you lose
	if(life === 0){
		yay.textContent = "You Lose!"
	}

	if(finish){
		var victory = document.getElementById("victory");
	    victory.src = "assets/images/victory.png";
	    
	    yay.textContent = "You Win!"
		winsCount++;
		wins.textContent = winsCount;
		var audio = new Audio("assets/sounds/fanfare.mp3");
		audio.play();
	}

	

	//onkeyup function
	document.onkeyup = function(event) {
		//Determines what key was pressed
		var userGuess = event.key;
		userGuess = userGuess.toUpperCase();

		for (var i = 0; i < randomWord.length; i++){
			if(randomWord[i] === userGuess){
				newWord[i] = userGuess + " ";
				correct = true;
				guessField.innerHTML = newWord + " ";
			}
		}

		if (!correct && wrongLetters.indexOf(userGuess) < 0) {
				wrongLetters.push(userGuess);
				usedLetters.textContent = wrongLetters;
				life = life - 1;
				var audio = new Audio("assets/sounds/chomp.mp3");
				audio.play();
				//lives.textContent = life;
				var sushi = document.getElementById("lives");
			    sushi.src = "assets/images/lives" + life + ".png";
			}
		for (var x = 0; x < wrongLetters.length-1; x++){
			if (userGuess === wrongLetters[x]){
				life = life + 0;
				lives.textContent = life;
			}
		}

		for (var i = 0; i < newWord.length; i++){
			if(newWord[i] === "_ "){
				finish = false;
			} else {
				finish = true;
			}
		}
	} //end of onkeyup function
	
}



//Pressing Enter initializes the game
document.onkeyup = function(event) {
    if (event.keyCode == 13) {
        init();
	}
}
