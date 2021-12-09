var gameOver = new Phaser.Scene('gameOver');


gameOver.init = function () {
    console.log('iniciando cena  game over');
};

gameOver.preload = function () {
    this.load.image('gameover', 'assets/game_over.png');
};

gameOver.create = function () {
    var bt = this.add.image(400, 300, 'gameover');
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    bt.setInteractive();
        bt.once('pointerup', function () {
            this.scene.start('main');
        }, this);
};

gameOver.update = function () {
    if (this.spacebar.isDown) {
        this.scene.start('main');
    }
};