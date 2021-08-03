const WIDTH = 96,
    HEIGHT = 104;

const img = new Image();
img.src = 'spritesheet.png';
img.onload = () => img.loaded = true;

const canvas = document.getElementById('frame');
const ctx = canvas.getContext('2d');

const greyCanvas = document.getElementById('grey');
const ctx2 = greyCanvas.getContext('2d');

canvas.width = greyCanvas.width = WIDTH;
canvas.height = greyCanvas.height = HEIGHT;

function render() {
    if (!img.loaded) return;
    draw();
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            greyscale(ctx, ctx2, x, y);
        }
    }
}

function greyscale(ctx, ctx2, x, y) {
    const data = ctx.getImageData(x, y, 1, 1).data;
    const avg = Math.floor((data[0] + data[1] + data[2]) / 3);
    const alpha = data[3];

    const imageData = ctx2.getImageData(x, y, 1, 1);
    imageData.data[0] = imageData.data[1] = imageData.data[2] = avg;
    imageData.data[3] = alpha;
    ctx2.putImageData(imageData, x, y);
}

let move = 4;
let i = 0;

function draw() {
    const x = WIDTH * i++;
    const y = HEIGHT * move;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(img, x, y, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
    if (i >= 10) i = 0;
}

const KEY_MAP = {
    ArrowDown: 4,
    ArrowLeft: 5,
    ArrowUp: 6,
    ArrowRight: 7
}

document.addEventListener('keydown', function(e) {
    const code = e.code;
    if (!KEY_MAP[code]) return;
    move = KEY_MAP[code];
})

setInterval(render, 100);