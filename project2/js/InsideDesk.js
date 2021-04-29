class InsideDesk extends Phaser.Scene {
  constructor() {
    super({
      key: `inside-desk`
    });
  }

  create() {
    this.apple = this.add.image(320, 192, `apple`);
  }
}
