const express = require('express');
const Media = require('../models/Media');
const router = express.Router();

router.get('/', async (req, res) => {
  const media = await Media.find().populate('genero director productora tipo');
  res.send(media);
});

router.post('/', async (req, res) => {
  let media = new Media(req.body);
  media = await media.save();
  res.send(media);
});

router.put('/:id', async (req, res) => {
  const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(media);
});

router.delete('/:id', async (req, res) => {
  const media = await Media.findByIdAndRemove(req.params.id);
  res.send(media);
});

module.exports = router;

