const ROW_OFFSET = 0;
const COL_OFFSET = 0;
const ON_COLOR = [150, 180, 240, 210];
const OFF_COLOR = [50, 50, 50, 255];
const CANVAS = document.querySelector('canvas');
const MEMO = new Map();

makeCanvas(CANVAS);

let inThrottle = false;
window.onresize = () => {
    if (!inThrottle) {
        inThrottle = true;
        setTimeout(() => {
            inThrottle = false;
            makeCanvas(CANVAS);
        }, 200);
    }
};

function makeCanvas(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.height = height;
    canvas.width = width;

    const ctx = canvas.getContext('2d');

    const imgData = ctx.getImageData(0, 0, width, height);

    for (let row = 0; row < height; ++row) {
        for (let col = 0; col < width; ++col) {
            const isOn = isPrime((row + ROW_OFFSET) ^ (col + COL_OFFSET));

            const colorArr = isOn ? ON_COLOR : OFF_COLOR;

            const i = (row * width + col) * 4;

            colorArr.forEach((val, j) => {
                imgData.data[i + j] = val;
            });
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function isPrime(num) {
    if (num < 2) return false;

    if (MEMO.has(num)) return MEMO.get(num);

    let res = true;

    for (let i = 2; i < Math.sqrt(num); ++i) {
        if (num % i === 0) {
            res = false;
            break;
        }
    }

    MEMO.set(num, res);
    return res;
}
