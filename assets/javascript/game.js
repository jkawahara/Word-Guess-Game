// VARIABLES
// =========


// Declare word related variables
var words = ["JavaScript", "Variable", "Function", "Array", "HTML", "CSS", "jQuery", "Terminal", "Pseudocode", "MERN"]; // Original word array
var wordsRemain = words.slice(); // Sliced array of remaining words after each game starts
var currentWord; // Current word to be guessed
var lastWord; // Display word after game completes
var hiddenWord = []; // Hide current word for display

// Declare game related variables
var wins = 0; // Start at 0 wins when game app refreshes
var numGuess = 12; // Start at 12 guesses
var letterGuess;
var guessedLetters = []; // Guessed letters array
var guessedWord = []; // Guessed word array showing correctly guessed letters



// FUNCTIONS
// =========


// Display word function
function displayWord() {

  // Update display
  $("#wins-text").text(wins);
  $("#current-word-text").text(hiddenWord.join(' ').toUpperCase());
  $("#guess-remain-text").text(numGuess);
  $("#letters-guessed-text").text(guessedLetters.join(', ').toUpperCase());
  $("#last-word-text").text(lastWord);


  if (currentWord === "") {
    $("#instr-text").text("No more words remaining. Refresh browser to try again.") 
  }
}

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
  hiddenWord = [];

  // Hide current word with underscores "_"
  for (var i = 0; i < currentWord.length; i++) {
    hiddenWord.push("_");
  }

  // Call displayWord function
  displayWord(currentWord);
}

// Update wins score function
function winsScore() {
  wins++;
  newGame(); // Call newGame function
}

// MAIN GAME CONTROLLER
newGame();

var prevGuess = false; // Flag for letter previously guessed

// Event listener for user key press
document.onkeyup = function(event) {
  var userKey = event.key;

  // Check if key pressed is letter and word remains
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  for (var i = 0; i < alphabet.length; i++) {
    if (userKey === alphabet[i] && currentWord !== "") {
      // Set letter from checked key press
      letterGuess = userKey;
      
      // Check if letter not guessed previously
      for (var j = 0; j < guessedLetters.length; j++) {
        if (letterGuess === guessedLetters[j]) {
          prevGuess = true;
        }
      }

      // Check if letter is in current word
      for (var k = 0; k < currentWord.length; k++) {
        if (letterGuess === currentWord[k].toLowerCase()) {
          guessedWord[k] = letterGuess;
          hiddenWord[k] = letterGuess;
          displayWord();
          
          // Check if all letters in word have been guessed
          if (guessedWord.join('') === currentWord.toLowerCase()) {
            winsScore(); // Call winsScore function
            return;
          }
        }
      }
      if (!prevGuess) {        
        // Add letter to guessed letters array
        guessedLetters.push(letterGuess);
        numGuess--;
        displayWord();
      }
      prevGuess = false;

      // Check if number of guesses is 0
      if (numGuess === 0) {
        newGame(); // Call newGame function
        return;
      }
    }
  } 
}