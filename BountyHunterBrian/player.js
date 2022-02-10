
class Player {
  constructor(scene, x, y){
  this.scene = scene;
  this.body = this.physics.add.sprite(x, y, {frameWidth: 120, frameHeight: 160});
  this.body.setCollideWorldBounds = true;
  this.alive = true;
  this.currentHealth = 5;
  this.LowHealth = 0;
  this.keys = this.scene.input.keyboard.addKeys({
    w: Phaser.Input.Keyboard.KeyCodes.W,
    a: Phaser.Input.Keyboard.KeyCodes.A,
    s: Phaser.Input.Keyboard.KeyCodes.S,
    d: Phaser.Input.Keyboard.KeyCodes.D
  });
  }
update(){

}
atack(){
  console.log("attack");
}
}
