let gameOn = true;
let playerSpeed = 5;
class Rect {
    constructor(color)
    {
        this.size = 60;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.speedx = 0;
        this.speedy = 0;
    }
    movey()
    {
        this.y += this.speedy;
        if(this.y + this.size > 500)
        {
            this.speedy = -(Math.abs(this.speedy))
        }
        if (this.y < 0)
        {
            this.speedy = Math.abs(this.speedy);
        }
    }
    movex()
    {
        this.x += this.speedx;
        if(this.x + this.size > 700)
        {
            gameOn = false;
            alert("You Won")
        }
    }
}
class Player extends Rect {
    constructor() {
        super('blue');
        this.y = 225;
        this.speedx = 0;
    }
}
class Enemy extends Rect {
    constructor(speed, x) {
        super('crimson');
        this.speedy = speed;
        this.x = x;
    }
}

let p = new Player();
let e1 = new Enemy(2, 100);
let e2 = new Enemy(3, 240);
let e3 = new Enemy(4,370);

let canvas = document.getElementById('paintbox')
let pen = canvas.getContext("2d");

function drawBox(box) {
    pen.fillStyle = box.color
    pen.fillRect(box.x, box.y, box.size, box.size);
}

setInterval( function () {
    e1.speedy += Math.random()*4;
    e2.speedy += Math.random()*4;
    e3.speedy += Math.random()*4;
} ,1000)

setInterval( function () {
    playerSpeed += Math.random()*4;
} ,2000)

canvas.addEventListener('mousedown', function () {
    p.speedx = playerSpeed;
})
canvas.addEventListener('mouseup', function () {
    p.speedx = 0;
})

function collided(enem, playe) {
    if (((playe.x < enem.x) && (enem.x <= (playe.x + 60))) && ((playe.y < enem.y) && (enem.y <= (playe.y + 60))))
    {
        // console.log('1');
        // console.log(enem, playe);
        return true;
    }
    if (((playe.x < (enem.x+60)) && ((enem.x+60) <= (playe.x + 60))) && ((playe.y < (enem.y+60)) && ((enem.y+60) <= (playe.y + 60))))
    {
        // console.log('2');
        // console.log(enem, playe);
        return true;
    }
    return false;
}

function gameLoop() {
    if (!gameOn) return;
    pen.clearRect(0,0,700,500);
    e1.movey()
    e2.movey()
    e3.movey()
    p.movex();
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);
    drawBox(p);
    if (collided(e1,p) || collided(e2,p) || collided(e3,p))
    {
        gameOn = false;
        alert("Be careful!");
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();