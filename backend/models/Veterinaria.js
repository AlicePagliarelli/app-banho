const mongoose = require('mongoose');

const veterinariaSchema = new mongoose.Schema({
  nome: String,
  foto: String,
  localizacao: String,
  servicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servico' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]


});

module.exports = mongoose.model('Veterinaria', veterinariaSchema);

