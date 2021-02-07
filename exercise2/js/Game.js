class Game extends State {
  constructor() {
    super();
    if (annyang) {
      let commands = {
        'I think it is *animal': this.guessAnimal
      };
      annyang.addCommands(commands);
      annyang.start();
    }
    // animal is chosen from the very start
    // there is now way to choose a new one until you guess it
    randomIndex = floor(random(0, animals.length));
    currentAnimal = animals[randomIndex];
    this.reverseAnimal = super.reverseString(currentAnimal);
    responsiveVoice.speak(this.reverseAnimal);
    // if a drawing is already there, display it
    // if it isn't, make a new one
    if (getItem(`${randomIndex}`) === null) {
      this.drawing = new Draw();
    }
    else {
      // I haven't actually figured out local memory yet
      // this is as close as I got
      // it would be easier if there was way to view local storage but I'm not certain as to how
      this.drawing = JSON.parse(getItem(`${randomIndex}`));
    }
  }

  draw() {
    super.draw();
    this.drawing.grid();
  }

  // once the user guesses correctly they are permitted to draw and then to guess other animals
  // if they get it wrong they will hear a random encouraging response
  guessAnimal(animal) {
    currentAnswer = animal.toLowerCase();

    if (currentAnswer === currentAnimal) {
      responsiveVoice.speak("hey, you got it! If you'd like, try drawing it as a memento. Then hit enter once you're ready to go again", "UK English Male");
      key = true;
    }
    else {
      let reply = random(incorrectResponses);
      responsiveVoice.speak(reply);
    }
  }

  // for the time being drawings are only saved to an array
  // if you encounter the same animal twice in the same run you will be greeted by the same drawing
  keyPressed() {
    if (key && keyCode === 13) {
      key = false;
      // drawings.splice(randomIndex, 1, this.drawing);
      storeItem(`${randomIndex}`, JSON.stringify(this.drawing));
      currentState = new Game;
    }
  }

  mouseDragged() {
    if (key) {
      this.drawing.mouseDragged();
    }
  }

  mouseReleased() {
    if (key) {
      this.drawing.mouseReleased();
    }
  }
}
