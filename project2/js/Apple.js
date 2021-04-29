class Apple extends Phaser.Scene {
  constructor() {
    super({
      key: `APPLE`
    });
  }

  create() {
    this.apple = this.add.image(320, 192, `apple`);
    this.line = this.add.image(320, 336, `desk-line-0`);

    this.input.on(`pointerup`, () => {
      this.scene.start(`PENCIL`);
    });
  }
}
