var alturaJogo = 600
var larguraJogo = 1134


var config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,
    backgroundColor: '#FFFFFF',
    scene: [CenaInicial, CenaJogo, CenaEndGame],
    // scene: [CenaJogo, CenaEndGame],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
    
};

const game = new Phaser.Game(config);