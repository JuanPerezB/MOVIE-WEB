const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 8080;

// Habilita CORS
app.use(cors());

// Configuración de Multer para guardar las imágenes en una carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Configura el directorio de destino
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Añade la extensión original
  }
});
const upload = multer({ storage: storage });

// Configura la carpeta de archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas', err));

// Importar el modelo de inventario
const Inventory = require('./models/Inventory');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Accede a /inventory para ver el inventario.');
});

// Endpoint para obtener todas las películas
app.get('/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items); // Incluye la imagen de portada en los resultados
  } catch (err) {
    res.status(500).send('Error al obtener el inventario');
  }
});

// Endpoint para obtener una película por ID
app.get('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findById(id);
    if (item) {
      res.json(item); // Incluye la imagen de portada en el resultado
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    res.status(500).send('Error al obtener la película');
  }
});

// Endpoint para crear una nueva película
app.post('/inventory', upload.single('coverImage'), async (req, res) => {
  const { title, director, releaseDate, genre, rating } = req.body;
  const coverImage = req.file ? `/uploads/${path.basename(req.file.path)}` : ''; // Obtiene la ruta del archivo subido

  try {
    const newItem = new Inventory({ title, director, releaseDate, genre, rating, coverImage });
    await newItem.save();
    res.status(201).json(newItem); // Incluye la imagen de portada en la respuesta
  } catch (err) {
    res.status(400).send('Error al crear la película');
  }
});

// Endpoint para eliminar una película por ID
app.delete('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Inventory.findByIdAndDelete(id);
    if (result) {
      res.status(200).send('Película eliminada');
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    console.error('Error al eliminar la película:', err);
    res.status(500).send('Error al eliminar la película');
  }
});

// Endpoint para actualizar una película por ID
app.put('/inventory/:id', upload.single('coverImage'), async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseDate, genre, rating } = req.body;

  // Verifica si hay un nuevo archivo de imagen subido
  let coverImage;
  if (req.file) {
    coverImage = `/uploads/${path.basename(req.file.path)}`; // Si hay nueva imagen, usa esta
  } else {
    const existingItem = await Inventory.findById(id); // Si no, busca la película existente
    coverImage = existingItem.coverImage; // Mantén la imagen existente
  }

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { title, director, releaseDate, genre, rating, coverImage },
      { new: true }
    );
    if (updatedItem) {
      res.status(200).json(updatedItem); // Incluye la imagen de portada en la respuesta
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    res.status(400).send('Error al actualizar la película');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
