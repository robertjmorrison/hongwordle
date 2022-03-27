const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

// Generate a word from five letter wordbank 

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }


function generateNew(){
    const LENGTH = words.length;
    var randomIndex = getRandomIntInclusive(0,LENGTH); 
    var rightGuessString = words[randomIndex];
    return rightGuessString;
}


// rightGuessString needs to be assigned from this random word generator //

// Board // 
function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      let row = document.createElement("div")
      row.className = "tile-row"
      
      for (let j = 0; j < 5; j++) {
          let box = document.createElement("div")
          box.className = "letter-tile"
          row.appendChild(box)
      }

      board.appendChild(row)
  }
}

initBoard()

// Verifies if the key is an acceptable alphanumerical character //
document.addEventListener("keyup", (e) => {

  if (guessesRemaining === 0) {
      return
  }

  let pressedKey = String(e.key)
  if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter()
      return
  }

  if (pressedKey === "Enter") {
      checkGuess()
      return
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (!found || found.length > 1) {
      return
  } else {
      insertLetter(pressedKey)
  }
})

// Inserting letters //
function insertLetter (pressedKey) {
  if (nextLetter === 5) {
      return
  }
  pressedKey = pressedKey.toLowerCase()

  let row = document.getElementsByClassName("tile-row")[6 - guessesRemaining]
  let box = row.children[nextLetter]
  box.textContent = pressedKey
  box.classList.add("filled-box")
  currentGuess.push(pressedKey)
  nextLetter += 1
}

// Function for deleting letters from tiles //
function deleteLetter () {
    let row = document.getElementsByClassName("tile-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

// Function for entering word // 
function checkGuess () {
    for (let i = 0; i < 5; i++) {
        let box = row.children[i]
        let letter = currentGuess[i]

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
}
}

// Function for validating the guess is a 5-letter word form the wordbank
function validateGuess(guessString){
    if (words.includes(guessString)){
        console.log("In wordbank");
    } else {
        console.log("NOT in wordbank");
    }
}

// Get the UTC Time (Coordinated Universal Time)
// BJT = UCT + 8 
function getTime(){
    const d = new Date();
    let date = d.getDate();
    let hours = d.getUTCHours();
    let minutes = d.getUTCMinutes();

    console.log("UTC Date: " + date);
    console.log("UTC Hours: " + hours);
    console.log("UTC Minutes: " + minutes);

    return [date, hours, minutes]
}


// Uncomment this line below to clear local storage during testing 
// localStorage.clear();

// Generate a new word every day according to UTC 
function generateNewDaily(){
    let UTC = getTime();
    let date = UTC[0];

    if(typeof(Storage) !== "undefined") {
        if (localStorage.length == 0) {
            console.log("No pervious word history")
            let rightGuessString = generateNew();
            localStorage.setItem(rightGuessString, date);
            document.getElementById("renew").innerHTML = localStorage.getItem(rightGuessString);
            console.log("The first word is generated: ")
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            console.log('Answer: ' + key + ', Date: ' + value);  
        } else {
            console.log("All pervious used word and date: ")
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                console.log('Answer: ' + key + ', Date: ' + value);  
            }  
            if (date == localStorage.getItem(key)){
                console.log("No need to generate a new word");
                console.log("Current Answer: " + key)
            } else {
                rightGuessString = generateNew();
                localStorage.setItem(rightGuessString, date);
                document.getElementById("renew").innerHTML = localStorage.getItem(rightGuessString);
            }
        }
    } else {
        // some web browser does not support local storage
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage.";
    }
}

generateNewDaily()

  