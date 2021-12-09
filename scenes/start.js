var gameStart = new Phaser.Scene('start');
var scoreText;
gameStart.init = function () {
    console.log('iniciando cena  gameStart');
};
var player;
var animais={animal1:'Onça:     ',
             animal2:'Lobo:     ',
             animal3:'Tigre:    ',
             animal4:'Elefante: ',
             animal5:'Tamandua: '};
var platforms;
var chegada;
var cursors;
var over   = false;
var score  = 0;
var score2 = 0;
var score3 = 0;
var score4 = 0;
var score5 = 0;

gameStart.preload = function () {
    this.load.image('fundo', 'assets/mapa.png');
    this.load.image('ground', 'assets/piso.png');
    this.load.image('seta', 'assets/seta.png');
    this.load.image('reiniciar', 'assets/reiniciar.png');
    this.load.spritesheet('personagem', 'assets/personagem.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('inimig', 'assets/inimig.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('plataforma', 'assets/plataforma.png');
    this.load.image('plataforma_parede', 'assets/plataforma_parede.png');
    this.load.image('parede', 'assets/parede.png');
    this.load.image('parede-grande', 'assets/parede-grande.png');
    this.load.image('parede-pequena', 'assets/parede-pequena.png');
    this.load.image('plataforma2', 'assets/plataforma2.png');
    this.load.image('circulo', 'assets/circulo.png');
    this.load.image('espinhos', 'assets/espinhos.png');
    this.load.image('animal1', 'assets/animais/onça.png');
    this.load.image('animal2', 'assets/animais/lobo.png');
    this.load.image('animal3', 'assets/animais/tigre.png');
    this.load.image('animal4', 'assets/animais/elefante.png');
    this.load.image('animal5', 'assets/animais/tamandua.png');
    this.load.image('piso', 'assets/piso-flutuante.png');
    this.load.image('bloco', 'assets/bloco.png');
    this.load.image('obs_com_espinho', 'assets/obs_com_espinho.png');
    this.load.image('bandeira', 'assets/bandeira.png');
    this.load.image('parabens', 'assets/parabens.png');
    
    
};

gameStart.create = function () {
    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //movimentacao da camera
    this.cameras.main.setBounds(0,0,4400*2,250*2);
    this.physics.world.setBounds(0,0,4400*2,600*2);

    //imagem de fundo
    this.add.image(4400, 300, 'fundo');
    
    //objetos do cenario
    platforms = this.physics.add.staticGroup();
    chegada = this.physics.add.staticGroup();
    
    platforms.create(100, 600, 'ground').setScale(2).refreshBody();//Base
    platforms.create(2700, 600, 'ground').setScale(2).refreshBody();
    platforms.create(6000, 600, 'ground').setScale(2).refreshBody();
    platforms.create(525, 460, 'plataforma');//Plataforma1
    platforms.create(766, 360, 'plataforma');//Plataforma2
    platforms.create(1030, 442, 'parede');//Parede1
    platforms.create(6560, 380, 'parede-pequena');
    platforms.create(1900, 460, 'plataforma');//Plataforma3
    platforms.create(2400, 200, 'plataforma');//Plataforma5-base-cima
    platforms.create(2570, 450, 'plataforma');
    platforms.create(2731, 490, 'parede-grande');
    platforms.create(3050, 90,  'parede-grande');
    platforms.create(3230, 335, 'plataforma2');
    platforms.create(3431, 770, 'parede-grande');//subida1
    platforms.create(3681, 640, 'parede-grande');//subida2
    platforms.create(4281, 360, 'plataforma');//Plataforma7
    platforms.create(4581, 250, 'plataforma');//Plataforma8
    platforms.create(5081, 240, 'piso');//Piso2
    platforms.create(5981, 240, 'piso');//Piso3
    platforms.create(5250, 460, 'plataforma');//Plataforma9
    platforms.create(5550, 360, 'plataforma');//Plataforma9
    platforms.create(6342, 240, 'piso');//Piso4
    platforms.create(6960, 770, 'parede-grande');//subida3
    platforms.create(7376, 770, 'parede-grande');//subida4
    platforms.create(7790, 770, 'parede-grande');//subida5     
    platforms.create(8480, 450, 'bloco');//blocofinal
    chegada.create(8600, 300, 'bandeira');//Badeira

    //personagem
    player = this.physics.add.sprite(100,520, 'personagem');//100,520
    player.setCollideWorldBounds(true);
    //player.setGravity(300);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'personagem', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
///////////////////////////////////////Inimigos///////////////////////////////////////////////
    this.anims.create({
        key: 'esquerda',
        frames: this.anims.generateFrameNumbers('inimig', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'direita',
        frames: this.anims.generateFrameNumbers('inimig', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
//////////////////////////////////////////////////////////////////////////////////////////////
    espinho = this.physics.add.group({
        key: 'espinhos',
        setXY:{ x: 1600, y: 520}
    });
    espinho2 = this.physics.add.group({
        key: 'espinhos',
        setXY:{ x: 4100, y: 520}
    });
    spolio1 = this.physics.add.group({
        key: 'animal2',
        setXY: { x: 900, y: 500}
    });
    spolio2 = this.physics.add.group({
        key: 'animal5',
        setXY: { x: 1030, y: 200}
    });
    spolio3 = this.physics.add.group({
        key: 'animal2',
        setXY: { x: 1150, y: 500}
    });
    spolio4 = this.physics.add.group({
        key: 'animal5',
        setXY: { x: 2574, y: 350}
    });
    spolio5 = this.physics.add.group({
        key: 'animal1',
        setXY: { x: 1874, y: 400}
    });
    spolio6 = this.physics.add.group({
        key: 'animal2',
        setXY: { x: 2474, y: 150}
    });
    spolio7 = this.physics.add.group({
        key: 'animal1',
        setXY: { x: 2774, y: 150}
    });
    spolio8 = this.physics.add.group({
        key: 'animal5',
        setXY: { x: 3000, y: 540}
    });
    spolio9 = this.physics.add.group({
        key: 'animal2',
        setXY: { x: 3200, y: 140}
    });
    spolio10 = this.physics.add.group({
        key: 'animal4',
        setXY: { x: 3800, y: 540}
    });
    spolio11 = this.physics.add.group({
        key: 'animal3',
        setXY: { x: 4500, y: 500}
    });
    spolio12 = this.physics.add.group({
        key: 'animal5',
        setXY: { x: 5000, y: 140}
    });
    spolio13 = this.physics.add.group({
        key: 'animal1',
        setXY: { x: 5200, y: 140}
    });
    spolio14 = this.physics.add.group({
        key: 'animal3',
        setXY: { x: 6200, y: 140}
    });
    spolio15 = this.physics.add.group({
        key: 'animal4',
        setXY: { x: 5900, y: 500}
    });
    spolio16 = this.physics.add.group({
        key: 'animal4',
        setXY: { x: 7100, y: 500}
    });
    spolio17 = this.physics.add.group({
        key: 'animal4',
        setXY: { x: 7250, y: 500}
    });
    spolio18 = this.physics.add.group({
        key: 'animal3',
        setXY: { x: 7580, y: 500}
    });
     spolio19 = this.physics.add.group({
        key: 'animal1',
        setXY: { x: 7800, y: 340}
    });
    spolio20 = this.physics.add.group({
        key: 'animal3',
        setXY: { x: 8400, y: 240}
    });
    //Adicionar Obstaculos
    obstaculo = this.physics.add.image(2100, 400, 'plataforma');
    obstaculo.body.allowGravity = false;
    obstaculo.body.moves = false;
    obstaculo.setFriction(1,1);
    obstaculo.setImmovable(true);
    this.tweens.add({
        targets: obstaculo,
        y: 200,
        duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    obstaculo2 = this.physics.add.image(3981, 500, 'plataforma');
    obstaculo2.body.allowGravity = false;
    obstaculo2.body.moves = false;
    obstaculo2.setFriction(1,1);
    obstaculo2.setImmovable(true);
    this.tweens.add({
        targets: obstaculo2,
        y: 200,
        duration: 4000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    obstaculo3 = this.physics.add.image(7167, 400, 'obs_com_espinho');
    obstaculo3.body.allowGravity = false;
    obstaculo3.body.moves = false;
    obstaculo3.setFriction(1,1);
    obstaculo3.setImmovable(true);
    this.tweens.add({
        targets: obstaculo3,
        y: 100,
        duration: 3000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    obstaculo4 = this.physics.add.image(7582, 400, 'obs_com_espinho');
    obstaculo4.body.allowGravity = false;
    obstaculo4.body.moves = false;
    obstaculo4.setFriction(0,1);
    obstaculo4.setImmovable(true);
    this.tweens.add({
        targets: obstaculo4,
        y: 100,
        duration: 3000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    obstaculo5 = this.physics.add.image(8000, 450, 'obs_com_espinho');
    obstaculo5.body.allowGravity = false;
    obstaculo5.body.moves = false;
    obstaculo5.setFriction(0,1);
    obstaculo5.setImmovable(true);
    this.tweens.add({
        targets: obstaculo5,
        y: 100,
        duration: 4000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });

    obs_espinho = this.physics.add.image(1500, 450, 'circulo');
    obs_espinho.body.allowGravity = false;
    obs_espinho.body.moves = false;
    obs_espinho.setFriction(1,0);
    obs_espinho.setImmovable(true);
    
    this.tweens.add({
        targets: obs_espinho,
        x: 1200,
        duration: 4000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });
    //Adicionar caçadores

    cacador2 = this.physics.add.sprite(2100, 500, 'inimig');
    cacador3 = this.physics.add.sprite(5250, 100, 'inimig');
    cacador4 = this.physics.add.sprite(6450, 540, 'inimig');
    //Posicionando Texto do Score
    scoreText = this.add.text(16, 16,
        animais['animal1']+score+'\n'+animais['animal2']+score2+'\n'+animais['animal3']+
        score3+'\n'+animais['animal4']+score4+'\n'+animais['animal5']+score5,{ fontSize: '32px', fill: '#ccc' })
        .setScrollFactor(0);//Para o texto se mover junto com a camera
    //Adicionando colisões
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, obstaculo);
    this.physics.add.collider(player, obstaculo2);
    this.physics.add.collider(player, obstaculo3);
    this.physics.add.collider(player, obstaculo4);
    this.physics.add.collider(player, obstaculo5);
    this.physics.add.collider(cacador2, platforms);
    this.physics.add.collider(cacador3, platforms);
    this.physics.add.collider(cacador4, platforms);
    this.physics.add.collider(obs_espinho,player);
    this.physics.add.collider(espinho, platforms);
    this.physics.add.collider(espinho2, platforms);
    this.physics.add.collider(spolio1, platforms);
    this.physics.add.collider(spolio2, platforms);
    this.physics.add.collider(spolio3, platforms);
    this.physics.add.collider(spolio4, platforms);
    this.physics.add.collider(spolio5, platforms);
    this.physics.add.collider(spolio6, platforms);
    this.physics.add.collider(spolio7, platforms);
    this.physics.add.collider(spolio8, platforms);
    this.physics.add.collider(spolio9, platforms);
    this.physics.add.collider(spolio10, platforms);
    this.physics.add.collider(spolio11, platforms);
    this.physics.add.collider(spolio12, platforms);
    this.physics.add.collider(spolio13, platforms);
    this.physics.add.collider(spolio14, platforms);
    this.physics.add.collider(spolio15, platforms);
    this.physics.add.collider(spolio16, platforms);
    this.physics.add.collider(spolio17, platforms);
    this.physics.add.collider(spolio18, platforms);
    this.physics.add.collider(spolio19, platforms);
    this.physics.add.collider(spolio20, platforms);

    //Coletar Moedas
    this.physics.add.overlap(player, spolio1, collectStar, null, this);
    this.physics.add.overlap(player, spolio2, collectStar, null, this);
    this.physics.add.overlap(player, spolio3, collectStar, null, this);
    this.physics.add.overlap(player, spolio4, collectStar, null, this);
    this.physics.add.overlap(player, spolio5, collectStar, null, this);
    this.physics.add.overlap(player, spolio6, collectStar, null, this);
    this.physics.add.overlap(player, spolio7, collectStar, null, this);
    this.physics.add.overlap(player, spolio8, collectStar, null, this);
    this.physics.add.overlap(player, spolio9, collectStar, null, this);
    this.physics.add.overlap(player, spolio10, collectStar, null, this);
    this.physics.add.overlap(player, spolio11, collectStar, null, this);
    this.physics.add.overlap(player, spolio12, collectStar, null, this);
    this.physics.add.overlap(player, spolio13, collectStar, null, this);
    this.physics.add.overlap(player, spolio14, collectStar, null, this);
    this.physics.add.overlap(player, spolio15, collectStar, null, this);
    this.physics.add.overlap(player, spolio16, collectStar, null, this);
    this.physics.add.overlap(player, spolio17, collectStar, null, this);
    this.physics.add.overlap(player, spolio18, collectStar, null, this);
    this.physics.add.overlap(player, spolio19, collectStar, null, this);
    this.physics.add.overlap(player, spolio20, collectStar, null, this);
    //Armadilhas
    this.physics.add.overlap(player, espinho, function(){over = true});
    this.physics.add.overlap(player, cacador2, function(){over = true});
    this.physics.add.overlap(player, cacador3, function(){over = true});
    this.physics.add.overlap(player, cacador4, function(){over = true});
    this.physics.add.overlap(player, espinho2, function(){over = true});
    this.physics.add.overlap(player, obstaculo3, function(){over = true});
    this.physics.add.overlap(player, obstaculo4, function(){over = true});
    this.physics.add.overlap(player, obstaculo5, function(){over = true});
    // WIN//
    var parabens = this.add.image(8495, 300, 'parabens');
    parabens.visible = false;
    this.physics.add.overlap(player, chegada, function(){parabens.visible= true});

    //Prendendo a camera a Player
    this.cameras.main.startFollow(player);
    //Botão de sair
    var btr  = this.add.image(740,20,'reiniciar').setScrollFactor(0);
    var bt  = this.add.image(680,20,'seta').setScrollFactor(0);
    btr.setScale(0.08);
    bt.setScale(0.08)
    bt.setInteractive();
        bt.once('pointerup', function(){
            over   = false;
            score  = 0;score2 = 0;score3 = 0;score4 = 0;score5 = 0;
            this.scene.start('main');
        }, this);
    btr.setInteractive();
    btr.once('pointerup', function () {
        score  = 0;score2 = 0;score3 = 0;score4 = 0;score5 = 0;
        this.scene.start('start');
    }, this);
    parabens.setInteractive();
    parabens.once('pointerup', function(){
        over   = false;
        score  = 0;score2 = 0;score3 = 0;score4 = 0;score5 = 0;
        this.scene.start('main');
    }, this);
};

gameStart.update = function () {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn', true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-360);
    }
    if (over){
        over   = false;
        score  = 0;score2 = 0;score3 = 0;score4 = 0;score5 = 0;
        this.scene.start('gameOver');
    }
    if(cacador2.x <= 2100){
        cacador2.setVelocityX(50);
        cacador2.anims.play('direita',true);
    }
    if(cacador2.x >= 2600){
        cacador2.setVelocityX(-50);
        cacador2.anims.play('esquerda',true);
    }
    if(cacador3.x <= 4850){
        cacador3.setVelocityX(50);
        cacador3.anims.play('direita',true);
    }
    if(cacador3.x >= 5250){
        cacador3.setVelocityX(-50);
        cacador3.anims.play('esquerda',true);
    }
    if(cacador4.x <= 5650){
        cacador4.setVelocityX(50);
        cacador4.anims.play('direita',true);
    }
    if(cacador4.x >= 6450){
        cacador4.setVelocityX(-50);
        cacador4.anims.play('esquerda',true);
    }

};
function collectStar(player, spo) {
    spo.disableBody(true, true);
    //console.log(spo.texture.key)
    if(spo.texture.key == 'animal1'){
        score +=1;
    }else if (spo.texture.key == 'animal2'){
        score2 +=1
    }else if (spo.texture.key == 'animal3'){
        score3 +=1
    }else if (spo.texture.key == 'animal4'){
        score4 +=1
    }else{
        score5 +=1
    }
    scoreText.setText(animais['animal1']+score+'\n'+animais['animal2']+score2+'\n'+animais['animal3']+score3+'\n'+animais['animal4']+score4+'\n'+animais['animal5']+score5);
};