(function () {
    var config = {
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        title: 'Save The animals',
        backgroundColor: 0x336699,
        input: {
            keyboard: true,
            mouse: true,
            touch: true,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 450 },
                debug: false
            }
        },
        scene: [
            mainScene,
            gameStart,
            gameOver
        ]
    };

    var game = new Phaser.Game(config);
    game.scene.start('main');
})();