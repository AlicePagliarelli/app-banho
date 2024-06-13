const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  servico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servico',
    required: true,
  },
  veterinaria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinaria',
    required: true,
  },
  
});


module.exports = mongoose.model('Appointment', AppointmentSchema);
