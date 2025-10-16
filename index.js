import express from 'express';
import axios from 'axios';
import sizeOf from 'image-size';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/imagen/dimensiones', async (req, res) => {
  try {
    const imageUrl = 'https://chl-4768d488-9429-490c-8813-c50c1a063834-imagen-importante.softwareseguro.com.ar/profile-pic';

    // 🔍 Descarga la imagen con axios
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // ⚠️ Verificamos el tipo de contenido
    const contentType = response.headers['content-type'];
    console.log('🧾 Content-Type recibido:', contentType);

    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({
        error: 'La URL no devolvió una imagen válida.',
        contentType,
      });
    }

    const buffer = Buffer.from(response.data);

    // ⚠️ Si el buffer está vacío, también lo reportamos
    if (!buffer || buffer.length === 0) {
      return res.status(400).json({
        error: 'No se pudo obtener contenido de la imagen (buffer vacío).',
      });
    }

    // ✅ Obtener dimensiones
    const dimensions = sizeOf(buffer);

    res.json({
      ancho: dimensions.width,
      alto: dimensions.height,
      tipo: dimensions.type,
      contentType,
    });

  } catch (error) {
    console.error('❌ Error al obtener dimensiones:', error.message);
    res.status(500).json({
      error: 'Error al obtener dimensiones de la imagen',
      detalle: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
