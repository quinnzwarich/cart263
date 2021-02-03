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
    randomIndex = floor(random(0, animals.length));
    currentAnimal = animals[randomIndex];
    this.reverseAnimal = super.reverseString(currentAnimal);
    responsiveVoice.speak(this.reverseAnimal);
    // if a drawing is already there, display it
    // if it isn't, make a new one
    if (drawings[randomIndex] === undefined) {
      this.drawing = new Draw();
    }
    else {
      // I haven't actually figured out local memory yet
      // this is as close as I got
      // it would be easier if there was way to view local storage but I'm not certain as to how
      // this.drawing = getItem(`${randomIndex}`);
      this.drawing = drawings[randomIndex];
    }
  }

  draw() {
    super.draw();
    this.drawing.grid();
  }

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

  keyPressed() {
    if (key && keyCode === 13) {
      key = false;
      drawings.splice(randomIndex, 1, this.drawing);
      // storeItem(`${randomIndex}`, this.drawing);
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
