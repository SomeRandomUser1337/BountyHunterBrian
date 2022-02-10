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

  // player variable (will create class later on).
  var player;


  // instead of noting each input key. create a list instead.
  var keyLeft, keyRight, keyUp, keyDown;
  // create separate booleans to check the last key player has pressed.
  var isKeyRightPressed = false;
  var isKeyLeftPressed = false;

  var game = new Phaser.Game(config);

alert("javascript is broke");
function preload()
{
  this.load.image("sky", "assets/sky.png");
  this.load.spritesheet("player", "assets/playersprite.png",{frameWidth: 120, frameHeight: 160});
}
function create()
{
  this.add.image(400,300, "sky");
  player = this.physics.add.sprite(100,100, "player");

//animation section
  this.anims.create({
      key: "move_right",
      frames: this.anims.generateFrameNumbers("player", {start: 12, end: 19}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "move_left",
      frames: this.anims.generateFrameNumbers("player", {start:20, end:26}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("player", {start: 0, end: 5}),
      frameRate: 15,

  });
  this.anims.create({
      key: "idle-left",
      frames: this.anims.generateFrameNumbers("player", {start:6,end:11}),
      frameRate: 15,
      repeat: -1
  });


  this.anims.create({
      key: "r_punch_left",
      frames: this.anims.generateFrameNumbers("player", {start:27,end:30}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "r_punch_right",
      frames: this.anims.generateFrameNumbers("player", {start:31,end:34}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "l_punch_left",
      frames: this.anims.generateFrameNumbers("player", {start:35,end:39}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "l_punch_right",
      frames: this.anims.generateFrameNumbers("player", {start:40,end:44}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "shoot_left",
      frames: this.anims.generateFrameNumbers("player", {start:45,end:49}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "shoot_right",
      frames: this.anims.generateFrameNumbers("player", {start:50,end:54}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "death-left",
      frames: this.anims.generateFrameNumbers("player", {start:55,end:60}),
      frameRate: 15,
      repeat: -1
  });
  this.anims.create({
      key: "death-right",
      frames: this.anims.generateFrameNumbers("player", {start:61,end:65}),
      frameRate: 15,
      repeat: -1
  });
// end of animation section

// keyboard input keys.
keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

}
function update(){

  if (keyRight.isDown && keyLeft.isUp){
    isKeyLeftPressed = false;
    isKeyRightPressed = true;
    player.anims.play("move_right", true);
    player.setVelocityX(150);
  } else if (keyLeft.isDown && keyRight.isUp){
    isKeyLeftPressed = true;
    isKeyRightPressed = false;
    player.anims.play("move_left", true);
    player.setVelocityX(-150);
  } else if (keyRight.isUp && !isKeyLeftPressed){
    player.anims.play("idle-right",true);
    player.setVelocityX(0);
  } else if (keyLeft.isUp && !isKeyRightPressed){
    player.anims.play("idle-left", true);
    player.setVelocityX(0);
  }

  if (keyUp.isDown && keyDown.isUp){
    player.setVelocityY(-150);
  } else if (keyDown.isDown && keyUp.isUp){
    player.setVelocityY(150);
  }
   else if (keyUp.isUp && keyDown.isUp){
    player.setVelocityY(0);
  }

}
