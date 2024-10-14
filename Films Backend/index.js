const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT  // Aquí está el cambio

// Habilita CORS
app.use(cors());

// Configuración de Multer para guardar las imágenes en una carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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

const Inventory = require('./models/Inventory');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Accede a /inventory para ver el inventario.');
});

app.get('/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error al obtener el inventario');
  }
});

app.get('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    res.status(500).send('Error al obtener la película');
  }
});

app.post('/inventory', upload.single('coverImage'), async (req, res) => {
  const { title, director, releaseDate, genre, rating } = req.body;
  const coverImage = req.file ? `/uploads/${path.basename(req.file.path)}` : '';

  try {
    const newItem = new Inventory({ title, director, releaseDate, genre, rating, coverImage });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).send('Error al crear la película');
  }
});

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

app.put('/inventory/:id', upload.single('coverImage'), async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseDate, genre, rating } = req.body;
  
  let coverImage;
  if (req.file) {
    coverImage = `/uploads/${path.basename(req.file.path)}`;
  } else {
    const existingItem = await Inventory.findById(id);
    coverImage = existingItem.coverImage;
  }

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { title, director, releaseDate, genre, rating, coverImage },
      { new: true }
    );
    if (updatedItem) {
      res.status(200).json(updatedItem);
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

