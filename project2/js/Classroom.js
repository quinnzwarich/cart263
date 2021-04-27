class Classroom extends Phaser.Scene {
  constructor() {
    super({
      key: `classroom`
    });
    this.line0 = {
      text: undefined,
      toggle: true,
    };
    this.line1 = {
      text: undefined,
      toggle: false,
    };
    this.line2 = {
      text: undefined,
      toggle: false,
    };
    this.line3 = {
      text: undefined,
      toggle: false,
    };
  }

  create() {
    this.default = this.add.image(320, 192, `default`);

    this.line0.text = this.add.sprite(320, 336, `line-0`);
    this.anims.create({
      key: `line-0-sheet`,
      frames: this.anims.generateFrameNumbers(`line-0`, {
        start: 0,
        end: 7
      }),
      frameRate: 5,
      repeat: 0
    });
    this.line0.text.play(`line-0-sheet`);

    this.line1.text = this.add.sprite(320, 336, `line-1`);
    this.anims.create({
      key: `line-1-sheet`,
      frames: this.anims.generateFrameNumbers(`line-1`, {
        start: 0,
        end: 8
      }),
      frameRate: 5,
      repeat: 0
    });
    this.line1.text.play(`line-1-sheet`);
    this.line1.text.visible = false;

    this.line2.text = this.add.sprite(320, 336, `line-2`);
    this.anims.create({
      key: `line-2-sheet`,
      frames: this.anims.generateFrameNumbers(`line-2`, {
        start: 0,
        end: 9
      }),
      frameRate: 5,
      repeat: 0
    });
    this.line2.text.play(`line-2-sheet`);
    this.line2.text.visible = false;

    this.line3.text = this.add.sprite(320, 336, `line-3`);
    this.anims.create({
      key: `line-3-sheet`,
      frames: this.anims.generateFrameNumbers(`line-3`, {
        start: 0,
        end: 13
      }),
      frameRate: 5,
      repeat: 0
    });
    this.line3.text.play(`line-3-sheet`);
    this.line3.text.visible = false;

    this.a = this.add.image(213, 291, `A`);
    this.a.visible = false;
    this.b = this.add.image(426, 291, `B`);
    this.b.visible = false;
    this.c = this.add.image(213, 345, `C`);
    this.c.visible = false;
    this.d = this.add.image(426, 345, `D`);
    this.d.visible = false;
  }

  update() {
    this.proceedToNextLine(this.line0, this.line1);
    this.proceedToNextLine(this.line1, this.line2);
    this.proceedToNextLine(this.line2, this.line3);

    this.transitionToButtons(this.line3);
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

  transitionToButtons(prevLine) {
    if (!prevLine.text.anims.isPlaying && prevLine.toggle) {
      this.input.on(`pointerup`, () => {
        // hide the previous line
        prevLine.text.visible = false;
        // display buttons
        this.a.visible = true;
        this.b.visible = true;
        this.c.visible = true;
        this.d.visible = true;
      });
      // avoid previous transitions
      prevLine.toggle = false;
    }
  }
}
