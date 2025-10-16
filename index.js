const express = require('express');
const fetch = require('node-fetch');
const sizeOf = require('image-size'); // Para obtener tamaño de imagen desde buffer

const app = express();
app.use(express.json());

app.post('/obtener-tamano', async (req, res) => {
    const { src } = req.body;
    if (!src) return res.status(400).json({ error: 'No se recibió src' });

    try {
        // Descargar la imagen
        const response = await fetch(src);
        if (!response.ok) throw new Error('No se pudo descargar la imagen');

        const buffer = await response.buffer();

        // Obtener dimensiones
        const dimensions = sizeOf(buffer);

        res.json({
            width: dimensions.width,
            height: dimensions.height
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
