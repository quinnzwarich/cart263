class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    // load title spritesheets
    this.load.spritesheet(`chairs`, `assets/images/chairs-spritesheet.png`, {
      frameWidth: 640,
      frameHeight: 384,
      endFrame: 8
    });
    this.load.spritesheet(`chairz`, `assets/images/chairz-spritesheet.png`, {
      frameWidth: 640,
      frameHeight: 384,
      endFrame: 8
    });
    this.load.spritesheet(`title-text`, `assets/images/title-spritesheet.png`, {
      frameWidth: 640,
      frameHeight: 384,
      endFrame: 3
    });
    // load classroom spritesheets
    this.load.spritesheet(`line-0`, `assets/images/line0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 7
    });
    this.load.spritesheet(`line-1`, `assets/images/line1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 8
    });
    this.load.spritesheet(`line-2`, `assets/images/line2.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 9
    });
    this.load.spritesheet(`line-3`, `assets/images/line3.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 13
    });

    // load warning sprites
    this.load.image(`warning-text`, `assets/images/warningtext.png`);
    this.load.image(`continue-0`, `assets/images/continue0.png`);
    this.load.image(`continue-1`, `assets/images/continue1.png`);
    // load title sprites
    this.load.image(`begin-0`, `assets/images/begin0.png`);
    this.load.image(`begin-1`, `assets/images/begin1.png`);
    // load classroom sprites
    this.load.image(`default`, `assets/images/defaultclassroom.png`);
    this.load.image(`A`, `assets/images/optionA.png`);
    this.load.image(`B`, `assets/images/optionB.png`);
    this.load.image(`C`, `assets/images/optionC.png`);
    this.load.image(`D`, `assets/images/optionD.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`warning`);
    });
  }

  create() {

  }

  update() {

  }
}
