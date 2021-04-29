class Pencil extends Phaser.Scene {
  constructor() {
    super({
      key: `PENCIL`
    });
    this.lines = [{
      text: undefined,
      toggle: true,
      id: 1
    }, {
      text: undefined,
      toggle: false,
      id: 2
    }, {
      text: undefined,
      toggle: false,
      id: 3
    }, {
      text: undefined,
      toggle: false,
      id: 4
    }, {
      text: undefined,
      toggle: false,
      id: 5
    }, {
      text: undefined,
      toggle: false,
      id: 6
    }, {
      text: undefined,
      toggle: false,
      id: 7
    }, {
      text: undefined,
      toggle: false,
      id: 8
    }, {
      text: undefined,
      toggle: false,
      id: 9
    }];
    this.pencilFrames = [];
    this.pencilSounds = [];
    this.index = 1;
  }

  initLine(line) {
    line.text = this.add.image(320, 336, `desk-line-${line.id}`);
    line.text.visible = line.toggle;
  }

  create() {
    this.pencil = this.add.sprite(320, 192, `pencil`);
    this.anims.create({
      key: `pencil-sheet`,
      frames: this.anims.generateFrameNumbers(`pencil`, {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    });
    this.pencil.play(`pencil-sheet`);
    this.pencil.visible = false;

    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        // initialize pencil images
        let pencil = this.add.image(320, 192, `pencil-${i}`);
        pencil.visible = false;
        this.pencilFrames.push(pencil);
      } else {
        // initialize pencil sounds
        let scratch = this.sound.add(`scratch-${i - 1}`);
        this.pencilSounds.push(scratch);
        // initialize pencil images
        let pencil = this.add.image(320, 192, `pencil-${i}`);
        pencil.visible = false;
        this.pencilFrames.push(pencil);
      }
    }

    let pencil = this.pencilFrames[0];
    pencil.visible = true;

    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      this.initLine(line);
    }

    this.input.on(`pointerup`, () => {
      if (this.index < this.pencilFrames.length) {
        // load and play sound
        let scratch = this.pencilSounds[this.index - 1];
        scratch.play(); 
        // hide previous frame
        let prevPencil = this.pencilFrames[this.index - 1];
        prevPencil.visible = false;
        // display current frame
        let pencil = this.pencilFrames[this.index];
        pencil.visible = true;
        // cue next frame
        this.index++;
      } else {
        // hide previous frame
        let prevPencil = this.pencilFrames[this.index - 1];
        prevPencil.visible = false;
        // display animated pencil
        this.pencil.visible = true;
      }
    });
  }

  update() {
    for (let i = 0; i < this.lines.length - 1; i++) {
      let prevLine = this.lines[i];
      let currLine = this.lines[i + 1];
      this.proceedToNextLine(prevLine, currLine);
    }

    let finalLine = this.lines[8];
    this.transition(finalLine);
  }

  proceedToNextLine(prevLine, currLine) {
  	if (prevLine.toggle) {
  		this.input.on(`pointerup`, () => {
  			// hide the previous line
  			prevLine.text.visible = false;
  			// animate the current line
  			currLine.text.visible = true;
  			// cue the next line
  			currLine.toggle = true;
  		});
      // avoid previous transitions
      prevLine.toggle = false;
  	}
  }

  transition(prevLine) {
    if (prevLine.toggle) {
      this.input.on(`pointerup`, () => {
        this.scene.start(`end`);
      });
    }
  }
}
