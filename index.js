const express = require('express');
const { createCanvas } = require('canvas');
const seedrandom = require('seedrandom');

const app = express();
const PORT = process.env.PORT || 8080; // Fleek

app.get('/:id?', (req, res) => {
    const { id } = req.params;
    const seed = id || 'default-seed'; // Usa 'default-seed' si no se proporciona id

    const rng = seedrandom(seed);

    const width = 256;
    const height = 256;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    for (let x = 0; x < width; x += 16) {
        for (let y = 0; y < height; y += 16) {
            ctx.fillStyle = getRandomColor(rng);
            ctx.fillRect(x, y, 16, 16);
        }
    }

    res.setHeader('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);
});

function getRandomColor(rng) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(rng() * 16)];
    }
    return color;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
