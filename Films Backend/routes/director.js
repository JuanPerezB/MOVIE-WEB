const express = require('express');
const Director = require('../models/Director');
const router = express.Router();

router.get('/', async (req, res) => {
  const directores = await Director.find();
  res.send(directores);
});

router.post('/', async (req, res) => {
  let director = new Director(req.body);
  director = await director.save();
  res.send(director);
});

router.put('/:id', async (req, res) => {
  const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(director);
});

router.delete('/:id', async (req, res) => {
  const director = await Director.findByIdAndRemove(req.params.id);
  res.send(director);
});

module.exports = router;

