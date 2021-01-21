class MultipleStrokeRects extends Phaser.Scene {

    constructor () {
        super();
        this.start = undefined;
        this.hsv = undefined;
        this.graphics = undefined;
        this.size = 64 * 2;
        this.historyX = Array(this.size);
        this.historyY = Array(this.size);
        this.index = 0;
    }

    create () {
        this.graphics = this.add.graphics();

        //  diamond shape from 400x300 =

        //  400 x 100 (top middle)
        //  100 x 300 (left)
        //  700 x 300 (right)
        //  400 x 500 (bottom)

        this.start = new Phaser.Geom.Point(400, 100);

        this.top = new Phaser.Geom.Point(400, 100);
        this.left = new Phaser.Geom.Point(100, 300);
        this.right = new Phaser.Geom.Point(700, 300);
        this. bottom = new Phaser.Geom.Point(400, 500);

        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.tweens.timeline({

            targets: this.start,
            loop: -1,
            duration: 2000,

            tweens: [
                { x: this.left.x, y: this.left.y, ease: 'Sine.easeOut' },
                { x: this.bottom.x, y: this.bottom.y, ease: 'Sine.easeInOut' },
                { x: this.right.x, y: this.right.y, ease: 'Sine.easeInOut' },
                { x: this.top.x, y: this.top.y, ease: 'Sine.easeIn' }
            ]
        });

        //  Fill the history array

        for (var i = 0; i < this.size; i++) {
        this.historyX[i] = this.start.x;
        this.historyY[i] = this.start.y;
        }
    }

    update () {
        this.historyX[this.index] = this.start.x;
        this.historyY[this.index] = this.start.y;

        this.index++;

        if (this.index === this.size) {
            this.index = 0;
        }

        this.graphics.clear();

        for (var i = 0; i < 64; i++) {
            this.graphics.fillStyle(this.hsv[i * 2].color, 1);
            this.graphics.fillCircle(this.historyX[i * 2], this.historyY[i * 2], 64);
        }

    }
}
const config = {
    width: 800,
    height: 600,
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    scene: [MultipleStrokeRects]
};
const game = new Phaser.Game(config);
