class Boot extends Phaser.scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }
}
