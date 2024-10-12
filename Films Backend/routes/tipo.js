const express = require('express');
const Tipo = require('../models/Tipo');
const router = express.Router();

router.get('/', async (req, res) => {
  const tipos = await Tipo.find();
  res.send(tipos);
});

router.post('/', async (req, res) => {
  let tipo = new Tipo(req.body);
  tipo = await tipo.save();
  res.send(tipo);
});

router.put('/:id', async (req, res) => {
  const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(tipo);
});

router.delete('/:id', async (req, res) => {
  const tipo = await Tipo.findByIdAndRemove(req.params.id);
  res.send(tipo);
});

module.exports = router;

