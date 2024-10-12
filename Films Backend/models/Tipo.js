const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date },
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Tipo', tipoSchema);
