
//***************** PHASER.SCENE Built-in Functions ************//


//Static variables
// pVelocity = player velocity
// bVelocity = bullet velocity
// pHP = player health

let pVelocityX = 100;
let pVelocityY = 150;
let bVelocityX = 550;
let pHP = 100;
console.log(pHP);


//Create a scene class for the level. Reducing memory usage.
  class MainScene extends Phaser.Scene {
      constructor() {
      super();
    }
    preload(){

    //player assets
      this.load.image("player", "assets/character.png");
      this.load.image("enemy", "assets/enemy.png");
      this.load.image("gun", "assets/weapon.png");
      this.load.image("bullet", "assets/bullet.png");

    //Import JSON files for maps, procedural collectables
    // and spawn points

      this.load.image("tileset", "assets/map.png");
      this.load.tilemapTiledJSON("tilemap", "assets/level1.json");

  }

//Used this functions to place all assets into the world.
  create(){

      this.cameras.main.setBounds(0, 0, 800, 600);
      this.physics.world.setBounds(0, 0, 800, 600);
      this.physics.world.on("worldbounds", function (body){
      this.killBullet(body.gameObject)}, this);

        this.map = this.make.tilemap({ key: "tilemap" });
        this.landscape = this.map.addTilesetImage("map", "tileset");

          this.map.createLayer("mitigate", this.landscape, 0, 0);
          this.collisionLayer = this.map.createLayer("collisionLayer", this.landscape, 0, 0);
          this.collisionLayer.setCollisionBetween(0,1000);

          this.playerSpawn = this.map.findObject("playerSpawns", function (object) {
              if (object.name === "playerSpawns") {
                return object;
              }
            });


            var enemyLocType;
            var enemies = this.physics.add.group();
            this.map.findObject("enemySpawns", function (object){
              if (object.type === "npc" && object.name === "enemy"){
                enemies.create(object.x, object.y, "enemy");
              }
            });


            this.player = this.physics.add.image(this.playerSpawn.x, this.playerSpawn.y, "player");
            this.player.setCollideWorldBounds(true);
            this.player.setBounce(0.2);
            this.player.setScale(0.5);

            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
            this.cameras.main.setZoom(1);
            this.cameras.main.startFollow(this.player);
            this.gun = this.add.image(100,100, "gun");
            this.gun.setScale(0.5);

            this.physics.add.collider(this.player, this.collisionLayer);
            this.physics.add.collider(enemies, this.collisionLayer);
            this.physics.add.collider(this.player, enemies);


    this.bullets = this.physics.add.group({
      maxSize: 10,
      active: false,
      visible: false,
      repeat: 10,
      key: "bullet"
    });

    var health = this.add.text(250, 140, 'Health: '+ pHP, { fontSize: '12px',
    fill: '#FFFFFF' }).setScrollFactor(0);
    // Inputs for movement, pause and shooting Functions

    this.input.keyboard.on("keydown-J", function(){this.tryShoot()}, this);
    this.input.keyboard.on("keydown-K", function(event){
      pHP -= 10;
      console.log(pHP);
      health.setText("Health: " + pHP);
    });

    // Create an array list of buttons for movement
    this.keyCursors = {
    a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };

  }
    update(){

      //In order to shift player's location,
      //update the location per frame.
      //
      if (!this.player.flipX){
          this.gun.x = this.player.x + 10;
          this.gun.y = this.player.y;
        }
      else if (this.player.flipX){
        this.gun.x = this.player.x - 10;
        this.gun.y = this.player.y;
      }
      if (this.keyCursors.d.isDown){
      this.player.setVelocityX(pVelocityX);
      this.player.flipX = false;
      this.gun.flipX = false;
    } else if (this.keyCursors.a.isDown){
      this.player.setVelocityX(-pVelocityX);
      this.player.flipX = true;
      this.gun.flipX = true;
    }
    else {
        this.player.setVelocityX(0);
        }
        if (this.keyCursors.space.isDown && this.player.body.blocked.down){
        this.player.setVelocityY(-pVelocityY);
     }
    }
  //Blast your opponents with this function
     tryShoot(){
            const bullet = this.bullets.get(this.gun.x, this.gun.y);
            if (bullet){
            this.fireBullet.call(this, bullet, this.collisionLayer);
        }
      }
  // Create this function for the projectile to be executed
    fireBullet(bullet, target){

      bullet.body.setCollideWorldBounds = true;
      bullet.body.onWorldBounds = true;
      bullet.enableBody(false);
      if (!this.player.flipX){
        bullet.flipX = false;
        bullet.setVelocityX(550);
      }
      if (this.player.flipX){
        bullet.setVelocityX(-550);
        bullet.flipX = true;
      }
      bullet.setVelocityY(-50);
      bullet.setActive(true);
      bullet.setVisible(true);

// Simple bullet-to-platform collision.
// Execute the kill function every time it does.
      if (target===this.collisionLayer){
          this.physics.add.collider(bullet, target, this.bulletHit, null, this);
      }

  }
// Kill function here.
  killBullet(bullet){
      bullet.disableBody(true, true);
      bullet.setActive(false);
      bullet.setVisible(false);
  }
// Kill callback function here.
  bulletHit(bullet){
    this.killBullet(bullet);
  }


  findEnemyLocType(map, layer, type){
    var location = this.map.filterObjects(layer, function(object){
      if (object.type === type){
        return object;
      }
    });
    return location;
  }

  findEnemyLocation(map, layer, type, name){
    var location = map.findObject(layer, function (object){
        if (object.type === type && object.name === name){
          return object;
        }
    });
    return location;
  }
}

//**  Create the level using PHASER scenes
//**  instead of using three separate config
//**  functions.

const config = {
  type: Phaser.AUTO,
  width: 832,
  height: 432,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y:300},
          debug: false
      }
  },
  pixelArt: true,
  scene: MainScene
  };
  var game = new Phaser.Game(config);
