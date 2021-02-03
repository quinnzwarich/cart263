class State {
  constructor() {

  }

  draw() {
    background(255);
  }

  reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join('');
    // Return the result
    return result;
  }

  keyPressed() {

  }

  mouseDragged() {

  }

  mouseReleased() {

  }
}
