class B extends Phaser.Scene {
  constructor() {
    super({
      key: `B`
    });
    // more line configs
    this.line0 = {
      text: undefined,
      toggle: true,
      numFrames: 11,
      id: 0
    };
    this.line1 = {
      text: undefined,
      toggle: false,
      numFrames: 9,
      id: 1
    };
    this.line2 = {
      text: undefined,
      toggle: false,
      numFrames: 15,
      id: 2
    };
    this.line3 = {
      text: undefined,
      toggle: false,
      numFrames: 10,
      id: 3
    };
  }

  // configs are then used to initialize each line
  initLine(line) {
    line.text = this.add.sprite(320, 336, `line-B-${line.id}`);
    this.anims.create({
      key: `line-B-${line.id}-sheet`,
      frames: this.anims.generateFrameNumbers(`line-B-${line.id}`, {
        start: 0,
        end: line.numFrames
      }),
      frameRate: 5,
      repeat: 0
    });
    line.text.play(`line-B-${line.id}-sheet`);
    line.text.visible = line.toggle;
  }

  create() {
    // initialize classroom
    this.defaultClassroom = this.add.image(320, 192, `default`);
    // initialize lines
    this.initLine(this.line0);
    this.initLine(this.line1);
    this.initLine(this.line2);
    this.initLine(this.line3);
  }

  update() {
    this.proceedToNextLine(this.line0, this.line1);
    this.proceedToNextLine(this.line1, this.line2);
    this.proceedToNextLine(this.line2, this.line3);
    // head back after the fourth line
    this.transition(this.line3);
  }

  proceedToNextLine(prevLine, currLine) {
  	if (!prevLine.text.anims.isPlaying && prevLine.toggle) {
  		this.input.on(`pointerup`, () => {
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
        // confirm the user has been here
        optionKeys.b = true;
        // reset the toggles
        this.line0.toggle = true;
        this.line1.toggle = false;
        this.line2.toggle = false;
        this.line3.toggle = false;
  			this.scene.start(`options`);
  		});
  	}
  }
}
