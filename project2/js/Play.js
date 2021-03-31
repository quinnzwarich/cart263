class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  create() {
    this.avatar = this.physics.add.sprite(400, 300, `avatar-running`);
    this.avatar.setCollideWorldBounds(true);

    this.anims.create({
      key: `walking-right`,
      frames: this.anims.generateFrameNumbers(`avatar-walking-right`, {
        start: 0,
        end: 3
      }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: `walking-left`,
      frames: this.anims.generateFrameNumbers(`avatar-walking-left`, {
        start: 0,
        end: 3
      }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: `flying-right`,
      frames: this.anims.generateFrameNumbers(`avatar-flying-right`, {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: `flying-left`,
      frames: this.anims.generateFrameNumbers(`avatar-flying-left`, {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: `idle-right`,
      frames: this.anims.generateFrameNumbers(`avatar-walking-right`, {
        start: 0,
        end: 0
      }),
      frameRate: 7,
      repeat: 0
    });
    this.anims.create({
      key: `idle-left`,
      frames: this.anims.generateFrameNumbers(`avatar-walking-left`, {
        start: 0,
        end: 0
      }),
      frameRate: 7,
      repeat: 0
    });

    this.jumpDelay = 0;

    this.avatar.play(`idle-right`);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.add(0, 0, 800, 600);
    this.camera.setBackgroundColor('rgba(64, 127, 255, 1)');
  }

  update() {
    this.jumpDelay--;

    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-160);
      this.avatar.anims.play(`walking-left`, true);
      goose.direction = `left`;
    }
    else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(160);
      this.avatar.anims.play(`walking-right`, true);
      goose.direction = `right`;
    }
    else {
      this.avatar.setVelocityX(0);

      if (goose.direction === `left`) {
        this.avatar.anims.play(`idle-left`);
      }
      else if (goose.direction === `right`) {
        this.avatar.anims.play(`idle-right`);
      }
    }

    if (this.cursors.up.isDown && this.jumpDelay <= 0) {
      this.avatar.setVelocityY(-160);
      this.jumpDelay = 15;
      if (goose.direction === `left`) {
        this.avatar.anims.play(`flying-left`);
      }
      else if (goose.direction === `right`) {
        this.avatar.anims.play(`flying-right`);
      }
    }
  }
}
