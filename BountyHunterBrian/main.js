var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y:0 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
  };

  var player;
  var keyLeft = false, keyRight = false, keyUp = false, keyDown = false;

  var game = new Phaser.Game(config);

alert("javascript is broke");
function preload()
{
  this.load.image("sky", "assets/sky.png");
  this.load.spritesheet("player", "assets/playersprite.png",{frameWidth: 120, frameHeight: 180});
}
function create()
{
  this.add.image(400,300, "sky");
  player = this.physics.add.sprite(100,100, "player");

  this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("player", {start: 0, end: 5}),
      frameRate: 15,
      repeat: -1
  });
  this.input.keyboard.on("keydown-D", function(){

    player.setVelocityX(150);
    keyRight = true;
  });
  this.input.keyboard.on("keyup-D", function(){
    player.setVelocityX(0);
    keyRight = false;
  });
  this.input.keyboard.on("keydown-A", function(){
    player.setVelocityX(-150);
    keyLeft = true;
  });
  this.input.keyboard.on("keyup-A", function(){
    player.setVelocityX(0)
    keyLeft = false;
    ;});
  this.input.keyboard.on("keydown-S", function(){
    player.setVelocityY(150);
    keyDown = true;
    ;});
  this.input.keyboard.on("keyup-S", function(){
    player.setVelocityY(0)
    keyDown = false;
    ;});
  this.input.keyboard.on("keydown-W", function(){
    player.setVelocityY(-150);
    keyUp = true;
  });
  this.input.keyboard.on("keyup-W", function(){
    player.setVelocityY(0);
    keyUp = false;
  });


}
function update(){

  if (keyRight && !keyLeft){
    player.setVelocityX(150);
  }
  if (keyLeft && !keyRight){
    player.setVelocityX(-150);
  }
  if (keyDown && !keyUp){
    player.setVelocityY(150);
  }
  if (keyUp && !keyDown) {
    player.setVelocityY(-150);
  }
  
  player.anims.play("idle-right", true);
}
