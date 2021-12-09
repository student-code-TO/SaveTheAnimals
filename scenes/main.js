var mainScene = new Phaser.Scene('main');
mainScene.init = function () {
    console.log('iniciando cena  main');
};
var button;
mainScene.preload = function () {
    this.load.image('inicio', 'assets/inicio.png');
    this.load.image('luz', 'assets/luz.png');
    this.load.image('botão', 'assets/botão.png');
};

mainScene.create = function () {
    this.add.image(400,300, 'inicio');
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.image(400,400,'luz');
    var bt  = this.add.image(400,400,'botão');
    bt.setInteractive();
        bt.once('pointerup', function () {
            this.scene.start('start');
        }, this);
};

mainScene.update = function () {
    if (this.spacebar.isDown) {
        this.scene.start('start');
    }
};