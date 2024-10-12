const express = require('express');
const Genero = require('../models/Genero'); // Asegúrate de que este modelo exista
const router = express.Router();

// Obtener todos los géneros
router.get('/', async (req, res) => {
  const generos = await Genero.find();
  res.send(generos);
});

// Crear un nuevo género
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  const nuevoGenero = new Genero({ nombre });

  try {
    await nuevoGenero.save();
    res.send(nuevoGenero);
  } catch (error) {
    res.status(400).send('Error al crear el género');
  }
});

// Actualizar un género
router.put('/:id', async (req, res) => {
  const { nombre } = req.body;

  try {
    const updatedGenero = await Genero.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true }
    );
    res.send(updatedGenero);
  } catch (error) {
    res.status(400).send('Error al actualizar el género');
  }
});

// Eliminar un género
router.delete('/:id', async (req, res) => {
  try {
    const genero = await Genero.findByIdAndRemove(req.params.id);
    res.send(genero);
  } catch (error) {
    res.status(400).send('Error al eliminar el género');
  }
});

module.exports = router;



