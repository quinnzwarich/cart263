class End extends Phaser.Scene {
  constructor() {
    super({
      key: `end`
    })
    this.opacity = 0;
  }

  create() {
    this.distortedClassroom0 = this.add.sprite(320, 192, `distorted`, 0);
    this.distortedClassroom1 = this.add.sprite(320, 192, `distorted`, 1);
    this.distortedClassroom2 = this.add.sprite(320, 192, `distorted`, 2);
    this.distortedClassroom3 = this.add.sprite(320, 192, `distorted`, 3);
  }

  update() {
    this.modulate();
  }

  modulate() {
    this.opacity += Math.PI / 100;
    let mod0 = (Math.sin(this.opacity) + 1) / 2;
    let mod1 = (Math.sin(this.opacity * 0.99) + 1) / 2;
    let mod2 = (Math.cos(this.opacity * 0.66) + 1) / 2;
    let mod3 = (Math.cos(this.opacity * 0.33) + 1) / 2;
    this.distortedClassroom0.alpha = mod0;
    this.distortedClassroom1.alpha = mod1;
    this.distortedClassroom2.alpha = mod2;
    this.distortedClassroom3.alpha = mod3;
  }
}
