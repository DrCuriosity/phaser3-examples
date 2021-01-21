class Example extends Phaser.Scene {
    constructor(){
        super()
        this.graphics = undefined;
        this.t = {
            x: -0.03490658503988659,
            y: 0.05235987755982989,
            z: -0.05235987755982989
        };

        this.models = [];
        this.model;
        this.i = 0;
    }

    preload () {
        this.load.text('teapot', 'assets/text/teapot.obj');
    }

    create () {
        this.graphics = this.add.graphics({x: 0, y: 0});

        this.models.push(this.parseObj(this.cache.text.get('teapot')));

        this.model = this.models[0];

        console.dir(this.model);

        this.rotateZ3D(0.5235987755982988);
        this.rotateY3D(0.5235987755982988);
        this.rotateX3D(0.5235987755982988);

        this.tweens.add({
            targets: this.t,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            props: {
                x: {
                    duration: 20000,
                    value: 0.03490658503988659
                },
                y: {
                    duration: 30000,
                    value: -0.05235987755982989
                },
                z: {
                    duration: 15000,
                    value: 0.05235987755982989
                }
            }
        });

    }

    update () {
        this.rotateX3D(this.t.x);
        this.rotateY3D(this.t.y);
        this.rotateZ3D(this.t.z);

        this.draw();
    }

    draw () {
        this.centerX = 400;
        this.centerY = 300;
        this.scale = 90;

        this.graphics.clear();

        this.graphics.lineStyle(2, 0x00ff00, 1.0);

        for (var i = 0; i < this.model.faces.length; i++) {
            this.face = this.model.faces[i];

            this.v0 = this.model.verts[this.face[0] - 1];
            this.v1 = this.model.verts[this.face[1] - 1];
            this.v2 = this.model.verts[this.face[2] - 1];
            if (this.v0 && this.v1 && this.v2 && this.isCcw(this.v0, this.v1, this.v2)) {
                this.graphics.strokeTriangle(
                    this.centerX + this.v0.x * this.scale, this.centerY - this.v0.y * this.scale,
                    this.centerX + this.v1.x * this.scale, this.centerY - this.v1.y * this.scale,
                    this.centerX + this.v2.x * this.scale, this.centerY - this.v2.y * this.scale
                );
            }
        }
    }

    isCcw (v0, v1, v2) {
        return (this.v1.x - this.v0.x) * (this.v2.y - this.v0.y) - (this.v1.y - this.v0.y) * (this.v2.x - this.v0.x) >= 0;
    }

    rotateX3D (theta) {
        this.ts = Math.sin(theta);
        this.tc = Math.cos(theta);

        for (var n = 0; n < this.model.verts.length; n++) {
            this.vert = this.model.verts[n];
            this.y = this.vert.y;
            this.z = this.vert.z;

            this.vert.y = this.y * this.tc - this.z * this.ts;
            this.vert.z = this.z * this.tc + this.y * this.ts;
        }
    }

    rotateY3D (theta){
        this.ts = Math.sin(theta);
        this.tc = Math.cos(theta);

        for (var n = 0; n < this.model.verts.length; n++) {
            this.vert = this.model.verts[n];
            this.x = this.vert.x;
            this.z = this.vert.z;

            this.vert.x = this.x * this.tc - this.z * this.ts;
            this.vert.z = this.z * this.tc + this.x * this.ts;
        }
    }

    rotateZ3D (theta) {
        this.ts = Math.sin(theta);
        this.tc = Math.cos(theta);

        for (var n = 0; n < this.model.verts.length; n++) {
            this.vert = this.model.verts[n];
            this.x = this.vert.x;
            this.y = this.vert.y;

            this.vert.x = this.x * this.tc - this.y * this.ts;
            this.vert.y = this.y * this.tc + this.x * this.ts;
        }
    }

    parseObj (text) {
        this.verts = [];
        this.faces = [];

        // split the text into lines

        this.lines = text.replace('\r', '').split('\n');
        this.count = this.lines.length;

        for (var i = 0; i < this.count; i++) {
            this.line = this.lines[i];

            if (this.line[0] === 'v') {

                // lines that start with 'v' are vertices

                this.tokens = this.line.split(' ');
                this.verts.push({
                    x: parseFloat(this.tokens[1]),
                    y: parseFloat(this.tokens[2]),
                    z: parseFloat(this.tokens[3])
                });
            }

            else if (this.line[0] === 'f') {

                // lines that start with 'f' are faces

                this.tokens = this.line.split(' ');

                this.face = [
                    parseInt(this.tokens[1], 10),
                    parseInt(this.tokens[2], 10),
                    parseInt(this.tokens[3], 10)
                ];

                this.faces.push(this.face);

                if (this.face[0] < 0) {
                    this.face[0] = this.verts.length + this.face[0];
                }

                if (this.face[1] < 0) {
                    this.face[1] = this.verts.length + this.face[1];
                }

                if (this.face[2] < 0) {
                    this.face[2] = this.verts.length + this.face[2];
                }
            }
        }

        return {
            verts: this.verts,
            faces: this.faces
        };
    }
}
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [Example]
};
const game = new Phaser.Game (config);
