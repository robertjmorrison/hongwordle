const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

// keyboard status 
// 0 represents unused letter 
// 1 represents used but neither in the right position or correct letter 
// 2 represents correct letter but wrong position 
// 3 represents both correct letter and position 

let keyboardStatus = {
    'A' : 0,
    'B' : 0,
    'C' : 0,
    'D' : 0,
    'E' : 0,
    'F' : 0,
    'G' : 0,
    'H' : 0,
    'I' : 0,
    'J' : 0,
    'K' : 0,
    'L' : 0,
    'M' : 0,
    'N' : 0,
    'O' : 0,
    'P' : 0,
    'Q' : 0,
    'R' : 0,
    'S' : 0,
    'T' : 0,
    'U' : 0,
    'V' : 0,
    'W' : 0,
    'X' : 0,
    'Y' : 0,
    'Z' : 0
}
console.log(keyboardStatus);
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
    let arr = checkGuess();
    guessString = arr[0]
    rightGuessString = arr[1]
    updateKeyStatus(guessString, rightGuessString, keyboardStatus);
    return
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (!found || found.length > 1) {
      return
  } else {
      insertLetter(pressedKey)
  }
})

// Virtual keyboard acting exactly as physcial keyborad 
function virtualKeyInput(virtualKeyInput){
    if (virtualKeyInput == "Enter"){
        let arr = checkGuess();
        guessString = arr[0]
        rightGuessString = arr[1]
        updateKeyStatus(guessString, rightGuessString, keyboardStatus);
        return
    } else if (virtualKeyInput === "Delete" && nextLetter !== 0){
        deleteLetter();
        return
    } else{
        insertLetter(virtualKeyInput)
    }
} 

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
function checkGuess() {
    let row = document.getElementsByClassName("tile-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuessString = generateNewDaily();
    
    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    guessString = guessString.toUpperCase()

    if (!words.includes(guessString)) {
        alert("Word not in wordbank!")
        return
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return

    } else {
        alert("Incorrect! Try again.")
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }
    return [guessString, rightGuessString]
}

// Get the UTC Time (Coordinated Universal Time)
// BJT = UCT + 8 
function getTime(){
    const d = new Date();
    let date = d.getDate();
    let hours = d.getUTCHours();
    let minutes = d.getUTCMinutes();

    // console.log("UTC Date: " + date);
    // console.log("UTC Hours: " + hours);
    // console.log("UTC Minutes: " + minutes);

    return [date, hours, minutes]
}


// Uncomment this line below to clear local storage during testing 
// localStorage.clear();

// Generate a new word every day according to UTC 
function generateNewDaily(){
    let UTC = getTime();
    let date = UTC[0];
    console.log("--------------------------------")

    if(typeof(Storage) !== "undefined") {
        if (localStorage.length == 0) {
            console.log("No pervious word history")
            let rightGuessString = generateNew();
            localStorage.setItem(rightGuessString, date);
            console.log("The first word is generated: ")
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            console.log('Answer: ' + key + ', Date: ' + value); 
            return key;
        } else {
            console.log("All previous used word and date: ")
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                console.log('Answer: ' + key + ', Date: ' + value);  
            }  
            if (date == localStorage.getItem(key)){
                console.log("No need to generate a new word");
                console.log("Current Answer: " + key)
                return key; 
            } else {
                rightGuessString = generateNew();
                localStorage.setItem(rightGuessString, date);
                return key; 
            }
        }
    } else {
        // some web browser does not support local storage
        // document.getElementById("localStorageError").innerHTML = "Sorry, your browser does not support web storage.";
    }
}

function updateKeyStatus(currentGuess, rightGuessString, keyboardStatus){
    for (let i = 0; i < currentGuess.length; i++) { 

        // check if this letter is green -> 3 
        if (currentGuess[i] == rightGuessString[i]) {
            keyboardStatus[currentGuess[i]] = 3;

        // check if this letter is yellow -> 2
        } else if (linearSearch(currentGuess[i]) != -1){
            keyboardStatus[currentGuess[i]] = 2;

        // otherwise it is gray -> 1 
        } else {
            keyboardStatus[currentGuess[i]] = 1;
        }
      }
      console.log(keyboardStatus)
} 

function linearSearch(arr, target){
    let n = arr.length
    for (let i = 0; i < n; i++)
        if (arr[i] == target)
            return i;
    return -1;
}

