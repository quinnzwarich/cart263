class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    this.load.spritesheet(`avatar-walking-right`, `assets/images/goose-walking-right.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 3
    });
    this.load.spritesheet(`avatar-flying-right`, `assets/images/goose-flying-right.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 1
    });
    this.load.spritesheet(`avatar-walking-left`, `assets/images/goose-walking-left.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 3
    });
    this.load.spritesheet(`avatar-flying-left`, `assets/images/goose-flying-left.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 1
    });

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create() {

  }

  update() {

  }
}
