const express = require('express');
const Productora = require('../models/Productora');
const router = express.Router();

router.get('/', async (req, res) => {
  const productoras = await Productora.find();
  res.send(productoras);
});

router.post('/', async (req, res) => {
  let productora = new Productora(req.body);
  productora = await productora.save();
  res.send(productora);
});

router.put('/:id', async (req, res) => {
  const productora = await Productora.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(productora);
});

router.delete('/:id', async (req, res) => {
  const productora = await Productora.findByIdAndRemove(req.params.id);
  res.send(productora);
});

module.exports = router;

