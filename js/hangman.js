window.addEventListener( "load", function( windowLoadE ) {
    var p, letter, button, holder;
    holder = document.getElementById( "buttonsHolder" );
    for ( var i = 65; i <= 90; i++ ) {
        // if ( i == 65 || i == 75 || i == 84 ) {
            // p = document.createElement( "p" );
        // }
        letter = String.fromCharCode( i );
		button = document.createElement( "button" );
		button.classList.add( "letter", "clearBtn" );
        button.innerHTML = letter;
        button.setAttribute( "data-letter", letter );
        button.onclick = function( e ) { setLetter( this.getAttribute( "data-letter" ) ); };
        // p.appendChild( button );
        // if ( i == 74 || i == 83 || i == 90 ) {
            holder.appendChild( button );
        // }
	}
	function setLetter( letter ) {
		checkuserGuess(letter);
	}
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
	
	//Generates the same number of blanks spaces for the random word
	var yay = document.getElementById("yay");
	var victory = document.getElementById("victory");
	var usedLetters = document.getElementById("usedLetters");
	var wins = document.getElementById("wins");
	var sushi = document.getElementById("lives");
	var guessField = document.getElementById("currentWord");
	var startBtn = document.getElementById("startBtn");
	var wrongLetters = [];
	var winsCount = 0;
	var newWord = new Array(randomWord.length);
	var life = 6;
	var correct = false;
	var gameIsFinished = false;
	var inProgress = false;
	var chompAudio = new Audio("assets/sounds/chomp.mp3");
	var winAudio = new Audio("assets/sounds/fanfare.mp3");
	
	wins.textContent = winsCount;
	// init();
	//Pressing Enter initializes the game
	// function init() {
		startBtn.onclick = function() {
			inProgress = true;
			startGame();
		};
		// document.onkeyup = function(event) {
			
		// 	if (event.keyCode == 13) {
		// 		inProgress = true;
		// 		startGame();
		// 	}
		// }
		
	// }
	//function to start game
	function startGame() {
		yay.textContent = ""
		life = 6;
		// victory.src = "assets/images/sushi.png";
		sushi.src = "assets/images/lives" + life + ".png";
		usedLetters.textContent = "";
		printNewWord();
	}
	//function to print new word
	function printNewWord(){
		guessField.innerHTML = "";
		wrongLetters = [];
		randomWord = words[Math.floor(Math.random() * words.length)];
		newWord = new Array(randomWord.length);
		holder.style.display = "block";
		for (var i = 0; i < newWord.length; i++){
			newWord[i] = "_ ";
			guessField = document.getElementById("currentWord");
			var blank = document.createTextNode(newWord[i]);
			guessField.appendChild(blank);
		}
		listenForKey();
	}
	function listenForKey() {
		document.onkeyup = function(event) {
			//checks if user guess is correct or not
			if (event.keyCode >= 65 && event.keyCode <= 90) {
				checkuserGuess(event.key);
			}
		}
	}
	function checkuserGuess(userGuess) {
		var currentGuess = userGuess.toUpperCase();
		// Checks each letter in chosen word against current guessed letter
		for (var i = 0; i < randomWord.length; i++){
			// if guess matches in the word
			if(randomWord[i] === currentGuess){
				newWord[i] = currentGuess + " ";
				correct = true;
				guessField.innerHTML = newWord.join("");
			}
		}
		// if guess is incorrect
		if (!correct && wrongLetters.indexOf(currentGuess) < 0) {
			wrongLetters.push(currentGuess);
			usedLetters.textContent = wrongLetters.join(" ");
			life--;
			chompAudio.play();
			sushi.src = "assets/images/lives" + life + ".png";
			
			if(life === 0) {
				yay.textContent = "You Lose!"
				inProgress = false;
				holder.style.display = "none";
				init();
			}
		} else {
			// Reset back to false
			correct = false;
		}
		
		if(finishGame()) {
			if (inProgress) {
				listenForKey();
			} else {
				// victory.src = "assets/images/victory.png";
				yay.textContent = "You Win!"
				winsCount++;
				wins.textContent = winsCount;
				winAudio.play();
				inProgress = false;
				holder.style.display = "none";
				init();
			}
		}
	}
	function finishGame() {
		gameIsFinished = true;
		// Checks if there are any blank spaces left in game word
		for (var i = 0; i < newWord.length; i++){
			if(newWord[i] === "_ "){
				gameIsFinished = false;
			}
		}
		if(gameIsFinished) {
			inProgress = false;
			return true;
		} else {
			inProgress = true;
			return false;
		}
	}



} );



