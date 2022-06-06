//Michael Phannavong
//Ching Kei Yiu
//Yan Yang
//Game Title: Chaotic Path
//Completed: 6/6/22
//Creative Tilt: We tried doing a forest jungle theme with the main character as a student who got lost in the woods. We again added some copy-right free music to add to the intensity of the game
//This time around we worked on making the movement of the character to feel smooth by adjusting drag friction and adding double jump. There is also collision with the coins that can make 
//interesting occurances happen such as resetting your jump.
let cursors;
const SCALE = 0.5;

let config = {
    type: Phaser.WEBGL,
    width: 1280, //1280
    height: 720, //720
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
