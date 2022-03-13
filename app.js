// Generate a word from five letter wordbank 

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }


const LENGTH = words.length 
var random_index = getRandomIntInclusive(0,LENGTH); 
console.log(words[random_index]);