class Example extends Phaser.scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('beball', 'assets/sprites/beball1.png');
        this.load.image('atari', 'assets/sprites/atari400.png');
        this.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');
    }

    create ()
    {
        this.add.sprite(200, 300, 'beball');
        this.add.sprite(500, 300, 'atari');
        this.add.sprite(800, 300, 'bikkuriman');
    }
}

const config =
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ Example ]
};

const game = new Phaser.Game(config);
