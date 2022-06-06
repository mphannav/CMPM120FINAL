class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1");
    }

    preload() {
        this.load.image('background', './assets/background.jpg');
        this.load.image('road', './assets/road.png');
        //this.load.image('block', './assets/block.png');
        this.load.image('vblock2', './assets/verticalblock2.png');
        this.load.image('bullet', './assets/bullet.png');
        //this.load.image('bird', './assets/bird.png');
        this.load.image('character', './assets/1.png');
        this.load.image('platform', './assets/platform.png');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('dead', './assets/dead.wav');
        this.load.audio('collect', './assets/collect.wav');
        //this.load.spritesheet('character', './assets/slug.png', {frameWidth: 142, frameHeight: 119, startFrame: 0, endFrame: 3});
        this.load.spritesheet('squirrel', './assets/squirrel.png', {frameWidth: 150, frameHeight: 100});
        this.load.spritesheet('bird', './assets/bird.png', {frameWidth: 102, frameHeight: 88});
        this.load.spritesheet('slug', './assets/sluggy.png', {frameWidth: 127, frameHeight: 106});
        this.load.spritesheet('block', './assets/block_anim.png', {frameWidth: 128, frameHeight: 75});
        this.load.spritesheet('coin', './assets/coin.png', {frameWidth: 77, frameHeight: 75});
        this.load.spritesheet('guyjump', './assets/1_jump.png', {frameWidth: 105, frameHeight: 188});
        this.load.spritesheet('guyrun', './assets/1_run.png', {frameWidth: 91, frameHeight: 188});
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create() {
        this.level = 250; 
        this.gamespeed = 3;
        this.ACCELERATION = 1500;
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.DRAG = 800;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.block;
        //this.weapon;
        
        //this.weapon = physics.add.weapon(30, 'bullet');
        //this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //this,weapon.bulletSpeed = 600;
        //this.weapon.fireRate = 100;
        
        //invisible platform
        this.ground = this.physics.add.sprite(0, game.config.height - 30, 'road').setOrigin(0,0);

        this.platform = this.physics.add.sprite(250, game.config.height - 150, 'platform').setOrigin(0,0);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;

        this.platform1 = this.physics.add.sprite(550, game.config.height - 300, 'platform').setOrigin(0,0);
        this.platform1.body.immovable = true;
        this.platform1.body.allowGravity = false;

        this.platform2 = this.physics.add.sprite(850, game.config.height - 150, 'platform').setOrigin(0,0);
        this.platform2.body.immovable = true;
        this.platform2.body.allowGravity = false;

        this.platform3 = this.physics.add.sprite(250, game.config.height - 450, 'platform').setOrigin(0,0);
        this.platform3.body.immovable = true;
        this.platform3.body.allowGravity = false;

        this.platform4 = this.physics.add.sprite(850, game.config.height - 450, 'platform').setOrigin(0,0);
        this.platform4.body.immovable = true;
        this.platform4.body.allowGravity = false;

        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.character = this.physics.add.sprite(600 , 600, 'character').setScale(0.3);
        this.character.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.character.setCollideWorldBounds(true);
        
        //this.weapon = this.physics.add.sprite(600 , 600, 'bullet');
        //this.weapon.trackSprite(this.character, 0, 0, true);
        //this.weapon.main.startFollow(this.character);
        cursors = this.input.keyboard.createCursorKeys();

        //camera follows player
        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.character);
        this.cameras.main.setZoom(1.3);   
        
        //this.weapon.trackSprite(this.character, 0, 0, true);
        //this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        this.physics.add.collider(this.character, this.ground);
        this.physics.add.collider(this.character, this.platform);
        this.physics.add.collider(this.character, this.platform1);
        this.physics.add.collider(this.character, this.platform2);
        this.physics.add.collider(this.character, this.platform3);
        this.physics.add.collider(this.character, this.platform4);

        this.anims.create({
            key: 'enemy1',
            frames: this.anims.generateFrameNames('squirrel', {start: 0, end: 1}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'sluggy',
            frames: this.anims.generateFrameNames('slug', {start: 0, end: 1}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'jumper',
            frames: this.anims.generateFrameNames('guyjump', {start: 0, end: 1}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'bird_anim',
            frames: this.anims.generateFrameNames('bird', {start: 0, end: 1}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('guyrun', {start: 0, end: 1}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: 'blocks',
            frames: this.anims.generateFrameNames('block', {start: 0, end: 2}),
            frameRate:10,
            repeat: -1
        });

        this.anims.create({
            key: 'coined',
            frames: this.anims.generateFrameNames('coin', {start: 0, end: 2}),
            frameRate:5,
            repeat: -1
        });

        //score
        this.score = 0;
        this.scoreText = this.add.text(555, 390, 'COINS: 0', { fontSize: '32px', fill: '#000' });
    } 
  

    update() {
        // this.background.tilePositionX += this.gamespeed;
        // this.ground.tilePositionX += this.gamespeed;
        // this.gamespeed += 0.003;
        // this.level += 0.2;
        // this.score += 1;
        // this.scoreText.setText('Score: ' + this.score);
        
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('Scene1');
        }  
        this.random = Phaser.Math.RND.integerInRange(1, 450);
        if(1 == this.random){
            this.block = this.physics.add.sprite(1500, 670, 'squirrel').setScale(0.6);
            this.block.body.setVelocityX(- this.level);
            this.block.body.allowGravity = false
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            this.block.anims.play('enemy1', true);
            //game.physics.arcade.collide(this.character, this.block, this.scene.start('over'));
        }
        else if (2 == this.random){
            this.block = this.physics.add.sprite(0, 650, 'slug').setScale(0.8);
            this.block.setFlip(true, false);
            this.block.body.setVelocityX(+ this.level);
            this.block.body.allowGravity = false
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            //this.physics.add.collide()
            this.block.anims.play('sluggy', true);
        }
        else if (3 == this.random){
            this.block = this.physics.add.sprite(350, 0, 'block').setScale(0.8);
            this.block.body.setVelocityY(+ this.level);
            this.block.body.allowGravity = false;
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            this.block.anims.play('blocks', true);
        }
        else if(4 == this.random){
            this.block = this.physics.add.sprite(0, 200, 'bird').setScale(0.6);
            this.block.setFlip(true, false);
            this.block.body.setVelocityX(+ this.level);
            this.block.body.allowGravity = false
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            this.block.anims.play('bird_anim', true);
        }
        else if(5 == this.random){
            this.block = this.physics.add.sprite(1500, 350, 'bird').setScale(0.6);
            //this.block.setFlip(true, false);
            this.block.body.setVelocityX(- this.level);
            this.block.body.allowGravity = false
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            this.block.anims.play('bird_anim', true);
        }
        else if (6 == this.random){
            this.block = this.physics.add.sprite(950, 0, 'block').setScale(0.8);
            this.block.body.setVelocityY(+ this.level);
            this.block.body.allowGravity = false;
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.hit, null, this);
            this.block.anims.play('blocks', true);
        }
        else if (7 == this.random){
            this.block = this.physics.add.sprite(0, 200, 'block').setScale(0.6);
            //this.block.body.setVelocityY(+ 150);
            this.block.body.setVelocityX(+ 150);
            this.block.body.allowGravity = false;
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.addscore, null, this);
            this.block.anims.play('coined', true);
        }
        else if (8 == this.random){
            this.block = this.physics.add.sprite(1500, 350, 'block').setScale(0.6);
            //this.block.body.setVelocityY(- 150);
            this.block.body.setVelocityX(- 150);
            this.block.body.allowGravity = false;
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.addscore, null, this);
            this.block.anims.play('coined', true);
        }
        else if (9 == this.random){
            this.block = this.physics.add.sprite(1500, 670, 'block').setScale(0.6);
            //this.block.body.setVelocityY(- 150);
            this.block.body.setVelocityX(- 150);
            this.block.body.allowGravity = false;
            //this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block, this.addscore, null, this);
            this.block.anims.play('coined', true);
        }
        // check keyboard input 
        if(cursors.left.isDown) {
            this.character.body.setAccelerationX(-this.ACCELERATION);
            this.character.setFlip(true, false);
            this.character.anims.play('running', true);
        } else if(cursors.right.isDown) {
            this.character.body.setAccelerationX(this.ACCELERATION);
            this.character.resetFlip();
            this.character.anims.play('running', true);
        } else if(cursors.down.isDown) {
            this.physics.world.gravity.y = 20000; 
        } else {
            this.character.body.setAccelerationX(0);
            this.character.body.setDragX(this.DRAG);
            
        }
	    this.character.isGrounded = this.character.body.touching.down;
	    if(this.character.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
            this.character.anims.play('jumper', false);
	    } 
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.character.body.velocity.y = this.JUMP_VELOCITY;
	        this.physics.world.gravity.y = 2600;
            this.jumping = true;
	    }

	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
            this.sound.play('jump'); 
            this.character.anims.play('jumper', true);
	    }

        //if(this.character.body.touching.block)//|| this.character.body.touching.left)
    }
    hit(character, block)
    {
        this.scene.start('over');
        this.sound.play('dead'); 
    }
    addscore(character, block)
    {
        block.destroy();
        this.sound.play('collect'); 
        this.score += 1;
        this.scoreText.setText('COINS: ' + this.score);
        //this.character.body.setDragX(0);
        //this.scene.start('over');
        //this.sound.play('dead'); 
    }
}
