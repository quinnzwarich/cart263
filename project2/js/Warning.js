class Warning extends Phaser.Scene {
  constructor() {
    super({
      key: `warning`
    });
  }

  create() {
    this.warningText = this.add.image(320, 192, `warning-text`);
    this.continue = this.add.image(480, 288, `continue-0`);
    this.continue.setInteractive();

    this.continue.on(`pointerover`, () => {
      this.continue.tint = 0xcccccc;
    });
    this.continue.on(`pointerout`, () => {
      this.continue.clearTint();
    });
    this.continue.on(`pointerup`, () => {
      this.scene.start(`title`);
    });
  }
}
