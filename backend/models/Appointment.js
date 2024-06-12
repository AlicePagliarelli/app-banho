const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // Adicionando uma referência à veterinária
  veterinaria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinaria',
    required: true
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
