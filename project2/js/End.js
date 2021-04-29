class End extends Phaser.Scene {
  constructor() {
    super({
      key: `end`
    })
  }

  create() {
    this.distortedClassroom = this.add.sprite(320, 192, `distorted`);
  }
}
