class CenaJogo extends Phaser.Scene { // Classe que representa a cena de jogo
    constructor(){
        super({ key: 'CenaJogo' }); // Define a chave para referência da cena no código
    }
    
    preload() {
        // Pré-carrega as imagens necessárias
        this.load.image('floresta', 'assets/Floresta.jpg')
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.spritesheet('personagem', 'assets/characters.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door', 'assets/door.png');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(0, 0, 'floresta').setOrigin(0, 0).setScale(1);
       
        // Cria as plataformas como um grupo estático
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 400, 'plataforma').refreshBody();
        this.platforms.create(1000, 500, 'plataforma');
        this.platforms.create(50, 250, 'plataforma');
        this.platforms.create(650, 200, 'plataforma');
        
        // Cria a porta e o jogador
        this.door = this.physics.add.image(650, 95, 'door').setScale(0.25);
        this.door.body.setCollideWorldBounds(true);
        this.player = this.physics.add.sprite(0, 550, 'personagem').setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Colisores entre o jogador, a porta e as plataformas
        this.physics.add.collider(this.door, this.platforms);
        this.physics.add.collider(this.player, this.platforms);

        // Animações do jogador
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: 1
        });

        // Teclas do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Verifica a sobreposição entre o jogador e a porta
        this.physics.add.overlap(this.player, this.door, this.encostarNaPorta, null, this);

        // Adiciona um texto e define um fade out após 4 segundos
        this.texto = this.add.text(300, 300, 'utilize as setas do teclado para se mover', { fontSize: '24px', fill: '#FFFFFF' });
        this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: this.texto,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.texto.destroy(); // Destroi o texto após o fade out
                }
            });
        });
    }
    
    // Função chamada quando o jogador encosta na porta
    encostarNaPorta(player, door) {
        console.log('encostou na porta');
        this.scene.start('CenaEndGame'); // Transição para a cena de fim de jogo
    }
    

    update() {
        // Lógica de movimento do jogador
        if (this.cursors.left.isDown) { // Se a seta para a esquerda estiver pressionada
            this.player.setVelocityX(-160);// Move para a esquerda
            this.player.anims.play('walk', true); // Animação de caminhada
            this.player.setFlipX(true); // Inverte horizontalmente quando se move para a esquerda
        } else if (this.cursors.right.isDown) { // Se a seta para a direita estiver pressionada
            this.player.setVelocityX(160);// Move para a direita
            this.player.anims.play('walk', true);
            this.player.setFlipX(false); // Não inverte horizontalmente quando se move para a direita
        } else {
            this.player.setVelocityX(0); // Para de se mover
            this.player.anims.stop('walk'); // Para a animação de caminhada
        }
    
        if (this.cursors.up.isDown && this.player.body.onFloor()) { // Se a seta para cima estiver pressionada e o jogador estiver no chão
            this.player.setVelocityY(-330); // Pula
            this.player.anims.play('jump', true);// Animação de pulo
        }
    }
}
