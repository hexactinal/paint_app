const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

const COLORS_MAP = {
    "black": "rgb(0 0 0)",
    "darkgray": "rgb(128 129 129)",
    "darkred": "rgb(129 0 1)",
    "darkyellow": "rgb(128 128 0)",
    "darkgreen": "rgb(1 128 1)",
    "darkcyan": "rgb(0 128 128)",
    "darkblue": "rgb(1 0 129)",
    "darkviolet": "rgb(128 1 129)",
    "white": "rgb(255 255 255)",
    "gray": "rgb(193 193 192)",
    "red": "rgb(254 1 0)",
    "yellow": "rgb(254 255 1)",
    "green": "rgb(1 255 1)",
    "cyan": "rgb(1 254 255)",
    "blue": "rgb(0 0 255)",
    "violet": "rgb(255 0 255)"
};

const downHandler = (event) => {
    if (event.buttons === 1) {
        const currentColor = document.getElementById("currentColor");
        ctx.strokeStyle = COLORS_MAP[currentColor.textContent];

        const penSizes = document.querySelectorAll(".pen-size");
        for (let i = 0; i < penSizes.length; ++i) {
            const penSize = penSizes[i];
            if (penSize.checked) {
                ctx.lineWidth = penSize.value;
            }
        }

        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.layerX, event.layerY);
        ctx.stroke();
    }
};

const moveHandler = (event) => {
    if (event.buttons === 1) {
        ctx.lineTo(event.layerX, event.layerY);
        ctx.stroke();
    }
};

const upHandler = (event) => {
    if (isDrawing) {
        isDrawing = false;
        ctx.closePath();
    }
};

canvas.addEventListener("mousedown", downHandler);
canvas.addEventListener("mousemove", moveHandler);

const colorBtns = document.querySelectorAll(".colorBtn");
for (let i = 0; i < colorBtns.length; ++i) {
    const colorBtn = colorBtns[i];
    colorBtn.style.backgroundColor = COLORS_MAP[colorBtn.textContent];
    colorBtn.style.borderColor = COLORS_MAP[colorBtn.textContent];
    colorBtn.addEventListener("click", (event) => {
        let currentColor = document.getElementById("currentColor");
        currentColor.textContent = colorBtn.textContent;
    });
}