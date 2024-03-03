class CenaEndGame extends Phaser.Scene { // Classe que representa a cena de fim de jogo
    constructor(){
        super({ key: 'CenaEndGame' }); // Define a chave para referência da cena no código 
    }
    // Função chamada uma vez que os recursos são carregados
    create() { 
        this.add.text(400, 300, 'Parabéns! Você venceu!', { fontSize: '32px', fill: '#000' }); // Adiciona um texto de parabéns
    }
}