class CenaInicial extends Phaser.Scene {
    constructor(){
        super({ key: 'CenaInicial' });
    }
    
    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.spritesheet('botaojogar', 'assets/BotaoJogar.png', {frameWidth: 171, frameHeight: 104})
    }

    create() {
        this.add.image(567, 300, 'background').setScale(1.5);
        this.add.text(230, 200, 'Bem vindo ao meu jogo, Clique no botão para jogar', { fontSize: '24px', fill: '#FFFFFF' });
        this.add.text(350, 450, 'Para ganhar, chegue ate a porta', { fontSize: '24px', fill: '#FFFFFF' });

        const play = this.add.sprite(567, 300, 'botaojogar',).setInteractive();

        this.anims.create({
            key: 'play', // Nome da animação
            frames: this.anims.generateFrameNumbers('botaojogar', { start: 0, end: 2 }), // Quadros da animação
            frameRate: 10, // Taxa de quadros por segundo
            repeat: 0 // Repetição infinita da animação
        });
        var sceneContext = this; // Captura o contexto Phaser

        play.on('pointerdown', function(){
            play.anims.play('play', true); // Inicia a animação da sprite
        
            
        });
        play.on('pointerup', function(){
            play.anims.stop('play');
            play.setFrame(0);
            
            sceneContext.time.delayedCall(1000, () => {
                // Inicia a cena 'CenaJogo' após 1 segundo
                sceneContext.scene.start('CenaJogo');
            }); 
        });

        
       

    }

    update() {

    }
}