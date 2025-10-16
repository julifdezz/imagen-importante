// backend.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/image-size', (req, res) => {
  const { width, height } = req.body;

  if (!width || !height) {
    return res.status(400).json({ error: 'Faltan width o height' });
  }

  console.log(`Imagen recibida con tamaño: ${width}x${height}`);

  // Podés hacer lo que quieras acá, guardarlo, procesarlo, etc.

  res.json({ message: 'Tamaño recibido correctamente', width, height });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
