const express = require('express');
const axios = require('axios');
const sizeOf = require('image-size');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/imagen/dimensiones', async (req, res) => {
  try {
    const url = 'https://chl-4768d488-9429-490c-8813-c50c1a063834-imagen-importante.softwareseguro.com.ar/profile-pic';

    // Descarga la imagen como buffer
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    // Confirmamos que tenemos datos
    if (!response.data || response.data.length === 0) {
      return res.status(400).json({ error: 'La imagen está vacía o no se pudo descargar correctamente.' });
    }

    const buffer = Buffer.from(response.data);

    // Obtener dimensiones
    const dimensions = sizeOf(buffer);

    res.json({
      ancho: dimensions.width,
      alto: dimensions.height,
      tipo: dimensions.type
    });

  } catch (error) {
    console.error('Error obteniendo dimensiones:', error.message);
    res.status(500).json({ error: 'Error al obtener dimensiones de la imagen' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
