let game_W = 20;
let game_H = 20;
size = 0;
XXX = 0, YYY = 0;
angle = 0;
var bg = new Image();
bg.src="images/background.jpg";
b = [];
var bitcoinIM = new Image();
bitcoinIM.src="images/bitcoin.png";

var swordIM = new Image();
swordIM.src="images/sword.png";


class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        for (let i = 0; i < 72; i++)
            b[i] = false;

        this.render();
        
        this.loop();

        this.listenKeyboard();
        this.listenMouse();
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {

        })
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            if (b[Math.floor((360 - angle) / 5)]) {
                window.alert("You Lose");
                location.reload();
            }
            b[Math.floor((360 - angle) / 5)] = true;
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 7);
    }

    update() {
        this.render();
        angle ++;
        angle %= 360;
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            size = 6 * this.getWidth();
            XXX = game_W / 2;
            YYY = game_H / 3;
        }
    }

    draw() {
        this.clearScreen();
        this.drawBitcoin();
    }

    drawBitcoin() {
        for (let i = 0; i < 72; i++) {
            this.context.save();
            this.context.translate(XXX, YYY);
            this.context.rotate(this.toRadian(i * 5 + angle));
            if (b[i]) {
                this.context.drawImage(swordIM, - size / 4, size / 4, size / 2, size / 2);
            }
            this.context.restore();
        }

        this.context.drawImage(swordIM, XXX - size / 4, YYY + size / 1.2, size / 2, size / 2);

        this.context.save();
        this.context.translate(XXX, YYY);
        this.context.rotate(this.toRadian(angle));
        this.context.drawImage(bitcoinIM, - size / 2, - size / 2, size, size);
        this.context.restore();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        if (bg.width / game_W < bg.height / game_H)
            this.context.drawImage(bg, 0, (bg.height - game_H * (bg.width / game_W)) / 2, bg.width, game_H * (bg.width / game_W), 0, 0, game_W, game_H);
        else
            this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }


    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }

    toRadian(angle) {
        return (angle / 180) * Math.PI;
    }
}

var g = new game();