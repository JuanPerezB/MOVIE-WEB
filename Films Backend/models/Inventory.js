const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  coverImage: { type: String } // Asegúrate de que este campo esté presente
});

module.exports = mongoose.model('Inventory', inventorySchema);

