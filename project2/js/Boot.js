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
    // load intro spritesheets
    this.load.spritesheet(`intro-line-0`, `assets/images/introline0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 7
    });
    this.load.spritesheet(`intro-line-1`, `assets/images/introline1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 8
    });
    this.load.spritesheet(`intro-line-2`, `assets/images/introline2.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 9
    });
    this.load.spritesheet(`intro-line-3`, `assets/images/introline3.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 13
    });
    // load options spritesheets
    this.load.spritesheet(`line-A-0`, `assets/images/lineA_0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 9
    });
    this.load.spritesheet(`line-A-1`, `assets/images/lineA_1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 15
    });
    this.load.spritesheet(`line-B-0`, `assets/images/lineB_0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 11
    });
    this.load.spritesheet(`line-B-1`, `assets/images/lineB_1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 10
    });
    this.load.spritesheet(`line-B-2`, `assets/images/lineB_3.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 15
    });
    this.load.spritesheet(`line-B-3`, `assets/images/lineB_4.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 10
    });
    this.load.spritesheet(`line-C-0`, `assets/images/lineC_0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 8
    });
    this.load.spritesheet(`line-C-1`, `assets/images/lineC_1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 12
    });
    this.load.spritesheet(`line-D-0`, `assets/images/lineD_0.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 10
    });
    this.load.spritesheet(`line-D-1`, `assets/images/lineD_1.png`, {
      frameWidth: 576,
      frameHeight: 80,
      endFrame: 6
    });

    // load warning sprites
    this.load.image(`warning-text`, `assets/images/warningtext.png`);
    this.load.image(`continue-0`, `assets/images/continue0.png`);
    this.load.image(`continue-1`, `assets/images/continue1.png`);
    // load title sprites
    this.load.image(`begin-0`, `assets/images/begin0.png`);
    this.load.image(`begin-1`, `assets/images/begin1.png`);
    // load intro sprites
    this.load.image(`default`, `assets/images/defaultclassroom.png`);
    // load options sprites
    this.load.image(`a`, `assets/images/optionA.png`);
    this.load.image(`b`, `assets/images/optionB.png`);
    this.load.image(`c`, `assets/images/optionC.png`);
    this.load.image(`d`, `assets/images/optionD.png`);
    // load inside-desk sprites
    this.load.image(`apple`, `assets/images/apple.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`warning`);
    });
  }

  create() {

  }

  update() {

  }
}
