/**
haiku generator
quinn zwarich

generates completely random haikus using rita.js,
even the amount of words in each line is random though
each line still contains the correct number of syllables.
*/

"use strict";

let space = " ";

let line1 = generateFiveSyllableLine();
let line2 = generateSevenSyllableLine();
let line3 = generateFiveSyllableLine();

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

function generateFiveSyllableLine() {
  // generate first word
  let firstWord = RiTa.randomWord({
    numSyllables: getRandomInt(4)
  }); let firstResult = RiTa.analyze(firstWord);
  // number of slashes plus one will give syllable count
  let firstSyllables = firstResult.syllables.split("/").length;
  // 1st digit is 1
  if (firstSyllables === 1) {
    let secondWord = RiTa.randomWord({
      numSyllables: getRandomInt(4)
    }); let secondResult = RiTa.analyze(secondWord);
    let secondSyllables = secondResult.syllables.split("/").length;

    if (secondSyllables === 1) {
      let thirdWord = RiTa.randomWord({
        numSyllables: getRandomInt(3)
      }); let thirdResult = RiTa.analyze(thirdWord);
      let thirdSyllables = thirdResult.syllables.split("/").length;

      if (thirdSyllables === 1) {
        let fourthWord = RiTa.randomWord({
          numSyllables: getRandomInt(2)
        }); let fourthResult = RiTa.analyze(fourthWord);
        let fourthSyllables = fourthResult.syllables.split("/").length;

        if (fourthSyllables === 1) {
          let fifthWord = RiTa.randomWord({
            numSyllables: 1
          });
          return firstWord.concat(space, secondWord, space, thirdWord, space, fourthWord, space, fifthWord);
        }
        else if (fourthSyllables === 2) {
          return firstWord.concat(space, secondWord, space, thirdWord, space, fourthWord);
        }
      }
      else if (thirdSyllables === 2) {
        let fourthWord = RiTa.randomWord({
          numSyllables: 1
        });
        return firstWord.concat(space, secondWord, space, thirdWord, space, fourthWord);
      }
      else if (thirdSyllables === 3) {
        return firstWord.concat(space, secondWord, space, thirdWord);
      }
    } // 2nd digit is 2
    else if (secondSyllables === 2) {
      let thirdWord = RiTa.randomWord({
        numSyllables: getRandomInt(2)
      }); let thirdResult = RiTa.analyze(thirdWord);
      let thirdSyllables = thirdResult.syllables.split("/").length;

      if (thirdSyllables === 1) {
        let fourthWord = RiTa.randomWord({
          numSyllables: 1
        });
        return firstWord.concat(space, secondWord, space, thirdWord, space, fourthWord);
      }
      else if (thirdSyllables === 2) {
        return firstWord.concat(space, secondWord, space, thirdWord);
      }
    } // 2nd digit is 3
    else if (secondSyllables === 3) {
      let thirdWord = RiTa.randomWord({
        numSyllables: 1
      });
      return firstWord.concat(space, secondWord, space, thirdWord);
    } // 2nd digit is 4
    else if (secondSyllables === 4) {
      return firstWord.concat(space, secondWord);
    }
  }
  // 1st digit is 2
  if (firstSyllables === 2) {
    let secondWord = RiTa.randomWord({
      numSyllables: getRandomInt(3)
    }); let secondResult = RiTa.analyze(secondWord);
    let secondSyllables = secondResult.syllables.split("/").length;

    if (secondSyllables === 1) {
      let thirdWord = RiTa.randomWord({
        numSyllables: getRandomInt(2)
      }); let thirdResult = RiTa.analyze(thirdWord);
      let thirdSyllables = thirdResult.syllables.split("/").length;

      if (thirdSyllables === 1) {
        let fourthWord = RiTa.randomWord({
          numSyllables: 1
        });
        return firstWord.concat(space, secondWord, space, thirdWord, space, fourthWord);
      }
      else if (thirdSyllables === 2) {
        return firstWord.concat(space, secondWord, space, thirdWord);
      }
    } // 2nd digit is 2
    else if (secondSyllables === 2) {
      let thirdWord = RiTa.randomWord({
        numSyllables: 1
      });
      return firstWord.concat(space, secondWord, space, thirdWord);
    }
    else if (secondSyllables === 3) {
      firstWord.concat(space, secondWord);
    }
  }
  // 1st digit is 3
  if (firstSyllables === 3) {
    let secondWord = RiTa.randomWord({
      numSyllables: getRandomInt(2)
    }); let secondResult = RiTa.analyze(secondWord);
    let secondSyllables = secondResult.syllables.split("/").length;

    if (secondSyllables === 1) {
      let thirdWord = RiTa.randomWord({
        numSyllables: 1
      });
      return firstWord.concat(space, secondWord, space, thirdWord);
    }
    else if (secondSyllables === 2) {
      return firstWord.concat(space, secondWord);
    }
  }
  // 1st digit is 4
  if (firstSyllables === 4) {
    let secondWord = RiTa.randomWord({
      numSyllables: 1
    });
    return firstWord.concat(space, secondWord);
  }
}

// after making the five syllable function I got lazy..
function generateSevenSyllableLine() {
  // use the previous function for the first words
  let firstFiveWords = generateFiveSyllableLine();
  // generate first word
  let firstWord = RiTa.randomWord({
    numSyllables: getRandomInt(2)
  }); let firstResult = RiTa.analyze(firstWord);
  // number of slashes plus one will give syllable count
  let firstSyllables = firstResult.syllables.split("/").length;
  if (firstSyllables === 1) {
    let secondWord = RiTa.randomWord({
      numSyllables: 1
    });
    let concatenated = firstWord.concat(space, secondWord);
    return firstFiveWords.concat(space, concatenated);
  }
  else if (firstSyllables === 2) {
    return firstFiveWords.concat(space, firstWord);
  }
}

function lineClicked(event) {
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0) {
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function() {
      fadeIn(element, opacity)
    });
  }
}

function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = generateFiveSyllableLine();
  }
  else if (element === line2P) {
    element.innerText = generateSevenSyllableLine();
  }
}

// gripped from mozilla docs
function getRandomInt(max) {
  return Math.floor(Math.random() * (max - 1) + 1);
}
