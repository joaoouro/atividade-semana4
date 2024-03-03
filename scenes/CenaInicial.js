class CenaInicial extends Phaser.Scene { // Classe que representa a cena inicial
    constructor(){ 
        super({ key: 'CenaInicial' }); // Define a chave para referência da cena no código
    }
    
    // Pré-carrega os recursos necessários para a cena
    preload() {
        // Carrega a imagem de fundo
        this.load.image('background', 'assets/background.jpg');
        // Carrega a sprite do botão de jogar
        this.load.spritesheet('botaojogar', 'assets/BotaoJogar.png', {frameWidth: 171, frameHeight: 104})
    }

    // Função chamada uma vez que os recursos são carregados
    create() {
        // Adiciona a imagem de fundo com escala 1.5
        this.add.image(567, 300, 'background').setScale(1.5);
        // Adiciona texto de boas-vindas e instruções
        this.add.text(230, 200, 'Bem vindo ao meu jogo, Clique no botão para jogar', { fontSize: '24px', fill: '#FFFFFF' });
        this.add.text(350, 450, 'Para ganhar, chegue até a porta', { fontSize: '24px', fill: '#FFFFFF' });

        // Adiciona o botão de jogar e define-o como interativo
        const play = this.add.sprite(567, 300, 'botaojogar').setInteractive();

        // Cria a animação para o botão de jogar
        this.anims.create({
            key: 'play', // Nome da animação
            frames: this.anims.generateFrameNumbers('botaojogar', { start: 0, end: 2 }), // Quadros da animação
            frameRate: 10, // Taxa de quadros por segundo
            repeat: 0 // Repetição infinita da animação
        });

        // Captura o contexto da cena
        var sceneContext = this;

        // Evento acionado quando o botão é pressionado
        play.on('pointerdown', function(){
            play.anims.play('play', true); // Inicia a animação do botão
        });

        // Evento acionado quando o botão é solto
        play.on('pointerup', function(){
            play.anims.stop('play'); // Para a animação do botão
            play.setFrame(0); // Reinicia o quadro do botão

            // Atraso de 1 segundo antes de iniciar a cena 'CenaJogo'
            sceneContext.time.delayedCall(1000, () => {
                sceneContext.scene.start('CenaJogo');
            }); 
        });
    }

    
}
