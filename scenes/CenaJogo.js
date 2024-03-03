class CenaJogo extends Phaser.Scene {
    constructor(){
        super({ key: 'CenaJogo' });
        const isso = this;
    }
    
    preload() {
        this.load.image('floresta', 'assets/Floresta.jpg')
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.spritesheet('personagem', 'assets/characters.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('door', 'assets/door.png');
    }

    create() {
        this.add.image(0, 0, 'floresta').setOrigin(0, 0).setScale(1)
        // Defina as variáveis aqui como propriedades da classe
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 400, 'plataforma').refreshBody();
    
        this.platforms.create(1000, 500, 'plataforma');
        this.platforms.create(50, 250, 'plataforma');
        this.platforms.create(650, 200, 'plataforma');
        
        this.door = this.physics.add.image(650, 95, 'door').setScale(0.25);
        this.door.body.setCollideWorldBounds(true)
        this.player = this.physics.add.sprite(0, 550, 'personagem').setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);


        this.physics.add.collider(this.door, this.platforms);
        this.physics.add.collider(this.player, this.platforms);

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

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.door, this.encostarNaPorta, null, this);

        

    }
    
    encostarNaPorta(player, door) {
        console.log('O jogador encostou na porta!');
        this.scene.start('CenaEndGame');
    }
    

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('walk', true);
            this.player.setFlipX(true); // Inverte horizontalmente quando se move para a esquerda
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk', true);
            this.player.setFlipX(false); // Não inverte horizontalmente quando se move para a direita
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop('walk');
        }
    
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-330);
            this.player.anims.play('jump', true);
        }
    }
}
