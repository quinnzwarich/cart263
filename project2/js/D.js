class D extends Phaser.Scene {
  constructor() {
    super({
      key: `D`
    });
    // more configs
    this.line0 = {
      text: undefined,
      toggle: true,
      numFrames: 10,
      id: 0,
    };
    this.line1 = {
      text: undefined,
      toggle: false,
      numFrames: 6,
      id: 1
    };
  }

  // configs are then used to initialize each line
  initLine(line) {
    line.text = this.add.sprite(320, 336, `line-D-${line.id}`);
    this.anims.create({
      key: `line-D-${line.id}-sheet`,
      frames: this.anims.generateFrameNumbers(`line-D-${line.id}`, {
        start: 0,
        end: line.numFrames
      }),
      frameRate: 5,
      repeat: 0
    });
    line.text.play(`line-D-${line.id}-sheet`);
    line.text.visible = line.toggle;
  }

  create() {
    // initalize classroom
    this.defaultClassroom = this.add.image(320, 192, `default`);
    // if user has been to every other option,
    // display line which will take them inside their desk
    if (optionKeys.a && optionKeys.b && optionKeys.c) {
      this.line0.toggle = false;
      this.line1.toggle = true;
    } else { // if not tell them its stinky
      this.line0.toggle = true;
      this.line1.toggle = false;
    } // initialize lines
    this.initLine(this.line0);
    this.initLine(this.line1);
  }

  // same deal except take them to the appropriate scene
  update() {
    if (optionKeys.a && optionKeys.b && optionKeys.c) {
      this.transition(this.line1, `APPLE`);
    } else {
      this.transition(this.line0, `options`);
    }
  }

  transition(prevLine, whereTo) {
  	if (!prevLine.text.anims.isPlaying && prevLine.toggle) {
  		this.input.on(`pointerup`, () => {
        if (optionKeys.a && optionKeys.b && optionKeys.c) {
          // stop theme
          this.game.sound.stopAll();
          // reset the toggles
          this.line0.toggle = true;
          this.line1.toggle = false;
    			this.scene.start(whereTo);
        } else {
          // reset the toggles
          this.line0.toggle = true;
          this.line1.toggle = false;
    			this.scene.start(whereTo);
        }
  		});
  	}
  }
}
