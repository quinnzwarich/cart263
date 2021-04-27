class Title extends Phaser.Scene {
  constructor() {
    super({
      key: `title`,
    });
    this.chairsOpacity = 0;
    this.chairzOpacity = 0;
  }

  create() {
    this.chairs = this.add.sprite(320, 192, `chairs`);
    this.chairz = this.add.sprite(320, 192, `chairz`);
    this.begin1 = this.add.image(320, 304, `begin-1`);
    this.begin0 = this.add.image(320, 304, `begin-0`);
    this.begin0.setInteractive();

    this.begin0.on(`pointerover`, () => {
      this.begin0.alpha = 0;
    });
    this.begin0.on(`pointerout`, () => {
      this.begin0.alpha = 1;
    });
    this.begin0.on(`pointerup`, () => {
      this.scene.start(`classroom`);
    });

    this.titleText = this.add.sprite(320, 192, `title-text`);

    this.anims.create({
      key: `chairs-sheet`,
      frames: this.anims.generateFrameNumbers(`chairs`, {
        start: 0,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: `chairz-sheet`,
      frames: this.anims.generateFrameNumbers(`chairz`, {
        start: 0,
        end: 8
      }),
      frameRate: 13,
      repeat: -1
    });
    this.anims.create({
      key: `title-sheet`,
      frames: this.anims.generateFrameNumbers(`title-text`, {
        start: 0,
        end: 3
      }),
      frameRate: 1,
      repeat: -1
    });

    this.chairs.play(`chairs-sheet`);
    this.chairz.play(`chairz-sheet`);
    this.titleText.play(`title-sheet`);
  }

  update() {
    this.chairsOpacity += Math.PI / 100;
    let chairsMod = (Math.sin(this.chairsOpacity) + 1) / 2;
    this.chairs.alpha = chairsMod;

    this.chairzOpacity += Math.PI / 100;
    let chairzMod = (Math.cos(this.chairzOpacity) + 1) / 2;
    this.chairz.alpha = chairzMod;
  }
}
