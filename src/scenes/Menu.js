class menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('background', './assets/background.wav');
        this.load.image('start', './assets/start.png');
    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sound.play('background'); //background music
        this.start = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'start').setOrigin(0, 0);
        this.score = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('Scene1');
        }
    }
}
