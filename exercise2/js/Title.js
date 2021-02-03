class Title extends State {
  constructor() {
    super();
    this.welcome = `Hello and welcome to Slamina New Game Plus.
    Here's how this works. My associate will say the name of an animal backwards. Let us know what animal you think it is by saying, I think it is, proceeded by the name of the animal.`;
    this.text = `Slamina+`;
    if (annyang) {
      let commands = {
        'I am ready': this.startGame
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }

  draw() {
    super.draw();
    text(this.text, width/2, height/2);
  }

  // for whatever reason it only references the onstart callback for a second
  introText() {
    this.text = ``;
  }

  // and then immediately calls the onend callback before it is supposed to
  outroText() {
    this.text = `say "I am ready" to begin`;
  }

  keyPressed() {
    responsiveVoice.speak(this.welcome, "UK English Male", {
      onstart: this.introText(),
      onend: this.outroText()
    });
  }

  startGame() {
    currentState = new Game();
  }
}
