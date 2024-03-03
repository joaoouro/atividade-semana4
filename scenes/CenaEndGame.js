class CenaEndGame extends Phaser.Scene {
    constructor(){
        super({ key: 'CenaEndGame' });
    }
    
    preload() {
        
    }

    create() {
        this.add.text(400, 300, 'Parabéns! Você venceu!', { fontSize: '32px', fill: '#000' });
    }

    update() {

    }
}