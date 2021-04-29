class A extends Phaser.Scene {
  constructor() {
    super({
      key: `A`
    });
    this.line0 = {
      text: undefined,
      toggle: true,
      numFrames: 9,
      id: 0
    };
    this.line1 = {
      text: undefined,
      toggle: false,
      numFrames: 15,
      id: 1
    };
  }

  initLine(line) {
    line.text = this.add.sprite(320, 336, `line-A-${line.id}`);
    this.anims.create({
      key: `line-A-${line.id}-sheet`,
      frames: this.anims.generateFrameNumbers(`line-A-${line.id}`, {
        start: 0,
        end: line.numFrames
      }),
      frameRate: 5,
      repeat: 0
    });
    line.text.play(`line-A-${line.id}-sheet`);
    line.text.visible = line.toggle;
  }

  create() {
    this.default = this.add.image(320, 192, `default`);

    this.initLine(this.line0);
    this.initLine(this.line1);
  }

  update() {
    this.proceedToNextLine(this.line0, this.line1);

    this.transition(this.line1);
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
        optionKeys.a = true;
        // reset the toggles
        this.line0.toggle = true;
        this.line1.toggle = false;
        this.scene.start(`options`);
  		});
  	}
  }
}
