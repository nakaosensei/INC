window.onload = function() {

	var game = new Phaser.Game(320,480,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:update});                

     var player
     var enemy1
     

     function onPreload() {
              game.load.image("other","other.png");
              game.load.image("player","player.png");
              game.load.image("enemy","enemy.png");	
	}

	function goFullScreen(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);
	}

	// function to be called when the game has been created
	function onCreate() {         
          game.physics.startSystem(Phaser.Physics.ARCADE);		
          goFullScreen();          
          enemy1 = game.add.sprite(100, 100, "enemy");
          enemy1 = game.add.sprite(30, 200, "enemy");
          enemy1.anchor.setTo(0.5)
          game.physics.enable(enemy1, Phaser.Physics.ARCADE);

          player = game.add.sprite(160,240,"player");          
          player.anchor.setTo(0.5);          
          game.physics.enable(player, Phaser.Physics.ARCADE);
          player.body.collideWorldBounds = true;
          player.body.bounce.set(0.8);
	     gyro.frequency = 10;
		gyro.startTracking(function(o) {
               player.body.velocity.x += o.gamma/20;
               player.body.velocity.y += o.beta/20;
          });
          this.munitionQtde = this.game.add.text(this.game.width-50, this.game.height-50, '5', { fontSize: '32px', fill: '#fff' });		
     }
     
     function killPlayer(){
          player.destroy()
     }

     function update() {
          game.physics.arcade.collide(player, enemy1,killPlayer);
          game.physics.arcade.moveToObject(enemy1, player,10);             
     }

}