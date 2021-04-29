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
    // load inside-desk spritesheets
    this.load.spritesheet(`pencil`, `assets/images/pencil-spritesheet.png`, {
      frameWidth: 640,
      frameHeight: 384,
      endFrame: 15
    });
    // load end spritesheets
    this.load.spritesheet(`distorted`, `assets/images/classroom-spritesheet.png`, {
      frameWidth: 640,
      frameHeight: 384,
      endFrame: 3
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
    this.load.image(`desk-line-0`, `assets/images/deskline0.png`);
    this.load.image(`desk-line-1`, `assets/images/deskline1.png`);
    this.load.image(`desk-line-2`, `assets/images/deskline2.png`);
    this.load.image(`desk-line-3`, `assets/images/deskline3.png`);
    this.load.image(`desk-line-4`, `assets/images/deskline4.png`);
    this.load.image(`desk-line-5`, `assets/images/deskline5.png`);
    this.load.image(`desk-line-6`, `assets/images/deskline6.png`);
    this.load.image(`desk-line-7`, `assets/images/deskline7.png`);
    this.load.image(`desk-line-8`, `assets/images/deskline8.png`);
    this.load.image(`desk-line-9`, `assets/images/deskline9.png`)
    this.load.image(`pencil-0`, `assets/images/pencil0.png`);
    this.load.image(`pencil-1`, `assets/images/pencil1.png`);
    this.load.image(`pencil-2`, `assets/images/pencil2.png`);
    this.load.image(`pencil-3`, `assets/images/pencil3.png`);
    this.load.image(`pencil-4`, `assets/images/pencil4.png`);
    this.load.image(`pencil-5`, `assets/images/pencil5.png`);
    this.load.image(`pencil-6`, `assets/images/pencil6.png`);
    this.load.image(`pencil-7`, `assets/images/pencil7.png`);

    // load title audio
    this.load.audio(`title-drone`, `assets/sounds/maintheme.wav`);
    // load intro audio
    this.load.audio(`intro-sound-0`, `assets/sounds/hushedclass.wav`);
    this.load.audio(`intro-sound-1`, `assets/sounds/chalk0.wav`);
    this.load.audio(`intro-sound-2`, `assets/sounds/chalk1.wav`);
    this.load.audio(`intro-sound-3`, `assets/sounds/pencildrop.wav`);
    // load options audio
    this.load.audio(`options-drone`, `assets/sounds/optionstheme.wav`);
    // load pencil audio
    this.load.audio(`scratch-0`, `assets/sounds/ferrule0.wav`);
    this.load.audio(`scratch-1`, `assets/sounds/ferrule1.wav`);
    this.load.audio(`scratch-2`, `assets/sounds/ferrule2.wav`);
    this.load.audio(`scratch-3`, `assets/sounds/ferrule3.wav`);
    this.load.audio(`scratch-4`, `assets/sounds/ferrule4.wav`);
    this.load.audio(`scratch-5`, `assets/sounds/ferrule5.wav`);
    this.load.audio(`scratch-6`, `assets/sounds/ferrule6.wav`);

    this.load.on(`complete`, () => {
      this.scene.start(`warning`);
    });
  }
}
