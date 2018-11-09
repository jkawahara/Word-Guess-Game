// VARIABLES
// =========


// Declare word related variables
var words = ["JavaScript", "Variable", "Function", "Array", "HTML", "CSS"]; // Original word array
var wordsRemain = words.slice(); // Sliced array of remaining words after each game starts
var currentWord; // Current word to be guessed
var lastWord; // Display word after game completes

// Declare game related variables
var wins = 0; // Start at 0 wins when game app refreshes
var numGuess = 12; // Start at 12 guesses
var letterGuess;
var guessedLetters = []; // Guessed letters array
var guessedWord = []; // Guessed word array showing correctly guessed letters


// FUNCTIONS
// =========


// Display word function


// Start new game function
function newGame() {
  lastWord = currentWord; // Display after game completes

  // Pick word from array at start of each game
  wordsIndex = Math.floor(Math.random() * wordsRemain.length);
  currentWord = wordsRemain.splice(wordsIndex, 1).toString();
  
  // Initialize variables
  guessedLetters = [];
  guessedWord = [];
  numGuess = 12;
}

// Update wins score function
function winsScore() {
  wins++;
  newGame();
}

// Main game function
newGame();

var firstGuess = true; // Flag for first letter guess of each game
var prevGuess = false; // Flag for letter previously guessed

// Event listener for user key press
document.onkeyup = function(event) {
  var userKey = event.key;

  // Check if key pressed is letter
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  for (var i = 0; i < alphabet.length; i++) {
    if (userKey === alphabet[i]) {
      // Set letter from checked key press
      letterGuess = userKey;

      // Check if first guess of game
      if (firstGuess) {
        // Add letter to guessed letters array
        guessedLetters.push(letterGuess);
        numGuess--;
        firstGuess = false;
      }
      
      // Check if letter not guessed previously
      for (var j = 0; j < guessedLetters.length; j++) {
        if (letterGuess === guessedLetters[j]) {
          prevGuess = true;
        }
      }
      if (!prevGuess) {        
        // Add letter to guessed letters array
        guessedLetters.push(letterGuess);
        numGuess--;
        console.log("guessedLetters-" + guessedLetters);
      }

      // Check if letter is in current word
      for (var k = 0; k < currentWord.length; k++) {
        if (letterGuess === currentWord[k].toLowerCase()) {
          guessedWord[k] = letterGuess;
          console.log("guessedWord-" + guessedWord);
          
          // Check if all letters in word have been guessed
          if (guessedWord.join('') === currentWord.toLowerCase()) {
            console.log("you win");
            winsScore();
            return;
          }

        // Check if number of guesses is 0
        } else if (numGuess === 0) {
          // start new game
          console.log("you lose");
          newGame();
          return;
        }
      }
      prevGuess = false;
    }
  } 
}