class Warning extends Phaser.Scene {
  constructor() {
    super({
      key: `warning`,
    });
  }

  create() {
    // initialize text
    this.warningText = this.add.image(320, 192, `warning-text`);
    // initialize button
    this.continue = this.add.image(480, 288, `continue-0`);
    this.continue.setInteractive();
    // initialize theme
    this.drone = this.sound.add(`title-drone`);

    // add a tint while hovering
    this.continue.on(`pointerover`, () => {
      this.continue.tint = 0xcccccc;
    }); // remove while not
    this.continue.on(`pointerout`, () => {
      this.continue.clearTint();
    });
    this.continue.on(`pointerup`, () => {
      // start theme
      this.drone.play();
      this.drone.setLoop(true);
      this.scene.start(`title`);
    });
  }
}
