class Apple extends Phaser.Scene {
  constructor() {
    super({
      key: `APPLE`
    });
  }

  /**
  Kind of a rinky-ma-dink scene, I had
  to split up this one and PENCIL because I was
  getting a bug where the pencil images would appear
  when I started from that scene but not when I
  started from the beginning.
  */
  create() {
    // initialize apple and line
    this.apple = this.add.image(320, 192, `apple`);
    this.line = this.add.image(320, 336, `desk-line-0`);
    // take to pencil 
    this.input.on(`pointerup`, () => {
      this.scene.start(`PENCIL`);
    });
  }
}
