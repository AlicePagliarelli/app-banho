const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Rota para criar um novo comentário (review)
router.post('/', reviewController.criarReview);

// Rota para listar todos os comentários (reviews) de uma veterinária específica
router.get('/veterinaria/:id', reviewController.listarReviewsPorVeterinaria);

// Rota para atualizar um comentário (review)
router.put('/:id', reviewController.atualizarReview);

// Rota para deletar um comentário (review)
router.delete('/:id', reviewController.deletarReview);
router.get('/media/:veterinariaId', reviewController.calcularMediaAvaliacoes); // Rota para calcular a média das avaliações
router.get('/medias/', reviewController.listarClinicasComAvaliacoes); // Rota para calcular a média das avaliações

module.exports = router;
