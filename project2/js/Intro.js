class Intro extends Phaser.Scene {
  constructor() {
    super({
      key: `intro`
    });
    // these variables are
    // all line configs
    this.line0 = {
      text: undefined,
      toggle: true,
      numFrames: 7,
      id: 0,
      sound: undefined
    };
    this.line1 = {
      text: undefined,
      toggle: false,
      numFrames: 8,
      id: 1,
      sound: undefined
    };
    this.line2 = {
      text: undefined,
      toggle: false,
      numFrames: 9,
      id: 2,
      sound: undefined
    };
    this.line3 = {
      text: undefined,
      toggle: false,
      numFrames: 13,
      id: 3,
      sound: undefined
    };
  }

  // configs are then used to initialize each line
  initLine(line) {
    line.text = this.add.sprite(320, 336, `intro-line-${line.id}`);
    this.anims.create({
      key: `intro-line-${line.id}-sheet`,
      frames: this.anims.generateFrameNumbers(`intro-line-${line.id}`, {
        start: 0,
        end: line.numFrames
      }),
      frameRate: 5,
      repeat: 0
    });
    line.text.play(`intro-line-${line.id}-sheet`);
    line.text.visible = line.toggle;
    // initialize corresponding sound
    line.sound = this.sound.add(`intro-sound-${line.id}`);
  }

  create() {
    // initialize classroom
    this.defaultClassroom = this.add.image(320, 192, `default`);
    // initialize next theme
    this.drone = this.sound.add(`options-drone`);

    this.initLine(this.line0);
    this.initLine(this.line1);
    this.initLine(this.line2);
    this.initLine(this.line3);
  }

  update() {
    this.proceedToNextLine(this.line0, this.line1);
    this.proceedToNextLine(this.line1, this.line2);
    this.proceedToNextLine(this.line2, this.line3);
    // go to the next scene after the fourth line
    this.transition(this.line3);
  }

  proceedToNextLine(prevLine, currLine) {
  	if (!prevLine.text.anims.isPlaying && prevLine.toggle) {
  		this.input.on(`pointerup`, () => {
        // play sound
        currLine.sound.play();
        // mute previous sound
        prevLine.sound.setMute(true);
  			// hide the previous line
  			prevLine.text.visible = false;
  			// animate the current line
  			currLine.text.visible = true;
  			currLine.text.anims.restart();
  			// cue the next line
  			currLine.toggle = true;
  		});
  		// avoid previous transitions
  		prevLine.toggle = false;
  	}
  }

  transition(prevLine) {
  	if (!prevLine.text.anims.isPlaying && prevLine.toggle) {
  		this.input.on(`pointerup`, () => {
        // mute last sound
        prevLine.sound.setMute(true);
        // play next theme
        this.drone.play();
        this.drone.setLoop(true);
        // go to next scene
  			this.scene.start(`options`);
  		});
  	}
  }
}
