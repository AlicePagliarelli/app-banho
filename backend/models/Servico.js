const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  descricao: String,
  veterinaria: { type: mongoose.Schema.Types.ObjectId, ref: 'Veterinaria' }
});

module.exports = mongoose.model('Servico', servicoSchema);
