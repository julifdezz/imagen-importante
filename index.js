const express = require('express');
const axios = require('axios');
const sizeOf = require('image-size');

const app = express();

app.get('/imagen/dimensiones', async (req, res) => {
  try {
    const url = 'https://chl-4768d488-9429-490c-8813-c50c1a063834-imagen-importante.softwareseguro.com.ar/profile-pic';

    // Descargar la imagen en formato buffer
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    // Obtener dimensiones con image-size
    const dimensions = sizeOf(buffer);

    res.json({
      ancho: dimensions.width,
      alto: dimensions.height,
      tipo: dimensions.type
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las dimensiones de la imagen');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
