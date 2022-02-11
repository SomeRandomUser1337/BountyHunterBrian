var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y:300 },
          debug: true
      }
  },

  pixelArt: true,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
  };

  // player variable (will create class later on).
  var player, weapon, platforms;
  var lastFired;

  // instead of noting each input key. create a list instead.
  var keyinputs;

  var game = new Phaser.Game(config);

alert("javascript is broke");
function preload()
{
  this.load.image("sky", "assets/sky.png");
  this.load.image("platforms", "assets/platform.png");
  this.load.image("player", "assets/character.png");
  this.load.image("gun", "assets/weapon.png");
  this.load.image("bullet", "assets/bullet.png")
}
function create()
{
  this.add.image(400,300, "sky");

  weapon = this.add.image(100,100, "gun").setDepth(1);
  var testproj = this.add.image(100,100,"bullet");

  player = this.physics.add.image(100,100, "player");
  player.setCollideWorldBounds(true);
  player.setSize(0);

  var bullets = this.physics.add.group({
        defaultKey: "bullet",
        maxSize: NaN,
    });

  function tryShoot(key){
          var bullet = bullets.get(weapon.x, weapon.y);
          if (bullet){
            fireBullet.call(this, bullet);
          }
          console.log("shoot");
    }

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "platforms").setScale(2).refreshBody();
  this.physics.add.collider(player, platforms);


//key input binds

this.input.keyboard.on("keydown-J", tryShoot, this);

keyinputs = {
a:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
j:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
};


}
function update(){

  if (!player.flipX){
    weapon.x = player.x + 30;
    weapon.y = player.y;
  }
  else if (player.flipX){
    weapon.x = player.x - 30;
    weapon.y = player.y;
  }

if (keyinputs.d.isDown){
  player.setVelocityX(330);
  player.flipX = false;
  weapon.flipX = false;
} else if (keyinputs.a.isDown){
  player.setVelocityX(-330);
  player.flipX = true;
  weapon.flipX = true;
} else {
    player.setVelocityX(0);
    }
 if (keyinputs.space.isDown && player.body.touching.down){
    player.setVelocityY(-330);
 }
}

function fireBullet(bullet, velocity){

}
