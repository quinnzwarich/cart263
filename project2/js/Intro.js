class Intro extends Phaser.Scene {
  constructor() {
    super({
      key: `intro`
    });
    this.line0 = {
      text: undefined,
      toggle: true,
      numFrames: 7,
      id: 0
    };
    this.line1 = {
      text: undefined,
      toggle: false,
      numFrames: 8,
      id: 1
    };
    this.line2 = {
      text: undefined,
      toggle: false,
      numFrames: 9,
      id: 2
    };
    this.line3 = {
      text: undefined,
      toggle: false,
      numFrames: 13,
      id: 3
    };
  }

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
  }

  create() {
    this.default = this.add.image(320, 192, `default`);

    this.initLine(this.line0);
    this.initLine(this.line1);
    this.initLine(this.line2);
    this.initLine(this.line3);
  }

  update() {
    this.proceedToNextLine(this.line0, this.line1);
    this.proceedToNextLine(this.line1, this.line2);
    this.proceedToNextLine(this.line2, this.line3);

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
  			this.scene.start(`options`);
  		});
  	}
  }
}
