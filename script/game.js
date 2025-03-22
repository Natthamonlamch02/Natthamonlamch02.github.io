const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

// โหลดภาพ
const birdImg = new Image();
birdImg.src = 'images/bird.png'; // ภาพนกปกติ
const birdImgGameOver = new Image();
birdImgGameOver.src = 'images/bird_gameover.png'; // ภาพนกสำหรับ Game Over
const pipeImg = new Image();
pipeImg.src = 'images/pipe.png'; // ภาพท่อ
const bgImg = new Image();
bgImg.src = 'images/background.png'; // ภาพพื้นหลัง

let bird = { x: 50, y: 250, width: 30, height: 30, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

function drawBird() {
    // ถ้าเกมจบ ให้แสดงภาพนกที่เปลี่ยนรูป
    if (gameOver) {
        ctx.drawImage(birdImgGameOver, bird.x, bird.y, bird.width, bird.height); // แสดงนกในโหมด Game Over
    } else {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); // แสดงนกปกติ
    }
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.drawImage(pipeImg, pipe.x, 0, pipe.width, pipe.top);
        ctx.save();
        ctx.translate(pipe.x + pipe.width, pipe.bottom);
        ctx.rotate(Math.PI);
        ctx.drawImage(pipeImg, 0, 0, pipe.width, canvas.height - pipe.bottom);
        ctx.restore();
    });
}

function updatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < 250) {
        let gap = 120;
        let topHeight = Math.floor(Math.random() * 200) + 50;
        pipes.push({ x: canvas.width, width: 50, top: topHeight, bottom: topHeight + gap });
    }
    pipes.forEach(pipe => pipe.x -= 2);
    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
    score += 0.01;
}

function checkCollision() {
    if (bird.y + bird.height / 2 >= canvas.height) {
        gameOver = true;
    }
    pipes.forEach(pipe => {
        if (
            bird.x + bird.width / 2 > pipe.x &&
            bird.x - bird.width / 2 < pipe.x + pipe.width &&
            (bird.y - bird.height / 2 < pipe.top || bird.y + bird.height / 2 > pipe.bottom)
        ) {
            gameOver = true;
        }
    });
}

function updateGame() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
        ctx.fillText(`Score: ${Math.floor(score)}`, canvas.width / 3, canvas.height / 1.5);
        return;
    }
    
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    drawBird();
    updatePipes();
    drawPipes();
    checkCollision();
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${Math.floor(score)}`, 20, 30);
}

document.addEventListener('keydown', () => { bird.velocity = bird.lift; });
document.addEventListener('touchstart', () => { bird.velocity = bird.lift; }); // รองรับมือถือ

setInterval(updateGame, 30);
