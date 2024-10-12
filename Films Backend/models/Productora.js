const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date },
  slogan: { type: String },
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Productora', productoraSchema);

