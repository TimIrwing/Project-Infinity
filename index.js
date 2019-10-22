const SIZE = formatSize(0.3);
const ON_COLOR = [50, 100, 200, 255];
const OFF_COLOR = [25, 25, 25, 255];
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
            const isOn = isPrime(
                ((row + ROW_OFFSET) * SIZE) ^ ((col + COL_OFFSET) * SIZE)
            );

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

function formatSize(int) {
    if (int % 2 === 0) return int + 0.5;

    return int;
}
