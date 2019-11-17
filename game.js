window.onload = function() {

	var game = new Phaser.Game(320,480,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:update});                
     var holes = []
     var count = 110
     sentido = 1
     var player
     var enemy1
     var startTime
     

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
          startTime = new Date().getTime();
          game.physics.startSystem(Phaser.Physics.ARCADE);		
          goFullScreen();          
          
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
          
     }
     
     function killPlayer(){
          player.destroy()
          endTime = new Date().getTime();
          diff = Math.round(((endTime-startTime)/60)/60)
          death = game.add.text(game.width-200, game.height-50, 'Record:'+diff, { fontSize: '8px', fill: '#fff' });		
     }

     function update() {
          if (count<=0){
               var hole = game.add.sprite(player.x+50*sentido, player.y+50*sentido, "other");
               hole.anchor.setTo(0.5)
               game.physics.enable(hole, Phaser.Physics.ARCADE);
               holes.push(hole)
               sentido = sentido*-1
               count=50
          }else{
               count = count - 1
          }
          for (h of holes){
               game.physics.arcade.collide(player, h,killPlayer);
          }    
          game.physics.arcade.collide(player, enemy1,killPlayer);
          game.physics.arcade.moveToObject(enemy1, player,15);             
     }

}