const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date },
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Genero', generoSchema);




