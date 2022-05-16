//Michael Phannavong
//Ching Kei Yiu
//Yan Yang
//Game Title: Slug Rush
//Completed: 5/9/22
//Creative Tilt: We tried doing a forest theme with the main character being a slug. We added "jungle-like" copyright free music in hopes to match that theme of being chases or running
//through the wild. We also implemented a fast fall control in hopes of letting the character manuvere better. We also implemented multiple jumps but decided that would make the game too easy 
//so we opted out to just allowing one jump. The code was made in a way that it that settings could easily be adjusted if wanted to.
let cursors;
const SCALE = 0.5;

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    
    scene: [menu, Scene1, over]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySPACE, keyR, keyM, keyP;
