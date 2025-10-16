import express from 'express';
import axios from 'axios';
import sizeOf from 'image-size';
import cors from 'cors';

const app = express();
app.use(cors());

// Endpoint que devuelve las dimensiones de la imagen
app.get('/imagen/dimensiones', async (req, res) => {
  try {
    // ✅ URL de la imagen que querés analizar
    const imageUrl = 'https://chl-4768d488-9429-490c-8813-c50c1a063834-imagen-importante.softwareseguro.com.ar/profile-pic';

    // Descargar imagen como buffer binario
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    // Calcular dimensiones
    const dimensions = sizeOf(buffer);

    // Responder con JSON
    res.json({
      ancho: dimensions.width,
      alto: dimensions.height,
      tipo: dimensions.type,
    });

  } catch (error) {
    console.error('❌ Error al obtener dimensiones:', error.message);
    res.status(500).json({
      error: 'Error al obtener dimensiones de la imagen',
      detalle: error.message,
    });
  }
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
