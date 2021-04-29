class Options extends Phaser.Scene {
  constructor() {
    super({
      key: `options`
    });
    // these variables are
    // all button configs
    this.a = {
      button: undefined,
      destination: `A`,
    }
    this.b = {
      button: undefined,
      destination: `B`,
    }
    this.c = {
      button: undefined,
      destination: `C`,
    }
    this.d = {
      button: undefined,
      destination: `D`,
    }
  }

  create() {
    // initialize classroom
    this.defaultClassroom = this.add.image(320, 192, `default`);
    // initialize buttons
    this.a.button = this.add.image(213, 291, `a`);
    this.b.button = this.add.image(426, 291, `b`);
    this.c.button = this.add.image(213, 345, `c`);
    this.d.button = this.add.image(426, 345, `d`);
    this.c.button.setInteractive();
    this.b.button.setInteractive();
    this.a.button.setInteractive();
    this.d.button.setInteractive();
  }

  update() {
    this.interactWithButton(this.a);
    this.interactWithButton(this.b);
    this.interactWithButton(this.c);
    this.interactWithButton(this.d);
  }

  interactWithButton(option) {
    // add a tint while hovering
    option.button.on(`pointerover`, () => {
      option.button.tint = 0xcccccc;
    }); // remove while not
    option.button.on(`pointerout`, () => {
      option.button.clearTint();
    }); // go to appropriate scene
    option.button.on(`pointerup`, () => {
      this.scene.start(option.destination);
    });
  }
}
