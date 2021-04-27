class Warning extends Phaser.Scene {
  constructor() {
    super({
      key: `warning`
    });
  }

  create() {
    this.warningText = this.add.image(320, 192, `warning-text`);
    this.continue1 = this.add.image(480, 288, `continue-1`);
    this.continue0 = this.add.image(480, 288, `continue-0`);
    this.continue0.setInteractive();

    this.continue0.on(`pointerover`, () => {
      this.continue0.alpha = 0;
    });
    this.continue0.on(`pointerout`, () => {
      this.continue0.alpha = 1;
    });
    this.continue0.on(`pointerup`, () => {
      this.scene.start(`title`);
    });
  }
}
