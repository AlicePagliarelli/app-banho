// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  veterinaria: { type: mongoose.Schema.Types.ObjectId, ref: 'Veterinaria', required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
