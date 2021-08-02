const WIDTH = 96,
    HEIGHT = 104;

const img = new Image();
img.src = 'spritesheet.png';
img.onload = () => img.loaded = true;

const canvas = document.getElementById('frame');
const ctx = canvas.getContext('2d');

function render() {
    if (!img.loaded) return;
    draw();
}

const move = 4;
let i = 0;

function draw() {
    const x = WIDTH * i++;
    const y = HEIGHT * move;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(img, x, y, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
    if (i >= 10) i = 0;
}


setInterval(render, 100);