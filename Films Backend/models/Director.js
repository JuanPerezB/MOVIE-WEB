const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
});

module.exports = mongoose.model('Director', directorSchema);

