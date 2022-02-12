

class MainScene extends Phaser.Scene {
  constructor() {
    super();
  }
  preload(){
    this.load.image("sky", "assets/sky.png");
    this.load.image("platforms", "assets/platform.png");
    this.load.image("player", "assets/character.png");
    this.load.image("gun", "assets/weapon.png");
    this.load.image("bullet", "assets/bullet-export.png")
  }
  create(){

    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.physics.world.on("worldbounds", function (body){
    this.killBullet(body.gameObject)}, this);

    this.add.image(400,300, "sky");

    this.player = this.physics.add.image(100,100, "player");
    this.player.setCollideWorldBounds = true;
    this.gun = this.add.image(100,100, "gun");

    this.bullets = this.physics.add.group({
      maxSize: 10,
      active: false,
      visible: false,
      repeat: 10,
      key: "bullet"
    });

    this.input.keyboard.on("keydown-J", function(){this.tryShoot();}, this);

    this.keyCursors = {
    a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    };

    }
    update(){
      if (!this.player.flipX){
          this.gun.x = this.player.x + 30;
          this.gun.y = this.player.y;
        }
      else if (this.player.flipX){
        this.gun.x = this.player.x - 30;
        this.gun.y = this.player.y;
      }
      if (this.keyCursors.d.isDown){
      this.player.setVelocityX(330);
      this.player.flipX = false;
      this.gun.flipX = false;
    } else if (this.keyCursors.a.isDown){
      this.player.setVelocityX(-330);
      this.player.flipX = true;
      this.gun.flipX = true;
    }
    else {
        this.player.setVelocityX(0);
        }
    }
  tryShoot(){
    console.log("something");
    const bullet = this.bullets.get(this.gun.x, this.gun.y);
    if (bullet){
        console.log("grabs bullet");
        this.fireBullet.call(this, bullet);
    }
  }
  fireBullet(bullet){
      console.log(this.bullets);
      bullet.enableBody(false);
      bullet.setVelocityX(200);
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.setCollideWorldBounds = true;
      bullet.body.onWorldBounds = true;
  }
  killBullet(bullet){
      bullet.disableBody(true, true);
      bullet.setActive(false);
      bullet.setVisible(false);
  }
}
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y:0},
          debug: false
      }
  },
  pixelArt: true,
  scene: MainScene
  };
  var game = new Phaser.Game(config);
