const Review = require('../models/Review');
const Veterinaria = require('../models/Veterinaria');

// Função para criar um novo comentário (review) associado a uma veterinária
exports.criarReview = async (req, res) => {
  const { texto, rating, veterinaria } = req.body;

  try {
    console.log('Requisição recebida:', req.body);

    // Verificar se os campos obrigatórios estão presentes
    if (!texto || !rating || !veterinaria) {
      console.error('Dados incompletos');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verificar se a veterinária existe
    const veterinariaEncontrada = await Veterinaria.findById(veterinaria);
    if (!veterinariaEncontrada) {
      console.error('Veterinária não encontrada');
      return res.status(404).json({ message: 'Veterinária não encontrada' });
    }

    console.log('Veterinária encontrada:', veterinariaEncontrada);

    // Criar o novo review
    const novoReview = new Review({ texto, rating, veterinaria });
    await novoReview.save();
    console.log('Novo review criado:', novoReview);

    // Adicionar o review à lista de reviews da veterinária
    veterinariaEncontrada.reviews.push(novoReview._id);
    await veterinariaEncontrada.save();
    console.log('Veterinária atualizada com novo review:', veterinariaEncontrada);

    res.status(201).json(novoReview);
  } catch (error) {
    console.error('Erro ao criar review:', error);
    res.status(400).json({ message: error.message });
  }
};
// Função para listar todos os comentários (reviews) de uma veterinária específica
exports.listarReviewsPorVeterinaria = async (req, res) => {
  const veterinariaId = req.params.id;
  try {
    // Verificar se a veterinária existe
    const veterinaria = await Veterinaria.findById(veterinariaId);
    if (!veterinaria) {
      return res.status(404).json({ message: 'Veterinária não encontrada' });
    }

    const reviews = await Review.find({ veterinaria: veterinariaId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um comentário (review)
exports.atualizarReview = async (req, res) => {
  const id = req.params.id;
  const { texto, rating } = req.body;
  try {
    const reviewAtualizado = await Review.findByIdAndUpdate(id, { texto, rating }, { new: true });
    if (!reviewAtualizado) {
      return res.status(404).json({ message: 'Review não encontrado' });
    }
    res.json(reviewAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para calcular a média das avaliações de uma veterinária
exports.calcularMediaAvaliacoes = async (req, res) => {
  const veterinariaId = req.params.veterinariaId;

  try {
      // Verificar se a veterinária existe
      const veterinariaEncontrada = await Veterinaria.findById(veterinariaId);
      if (!veterinariaEncontrada) {
          return res.status(404).json({ message: 'Veterinária não encontrada' });
      }

      // Encontrar todas as avaliações da veterinária
      const avaliacoes = await Review.find({ veterinaria: veterinariaId });

      if (avaliacoes.length === 0) {
          return res.status(404).json({ message: 'Nenhuma avaliação encontrada para esta veterinária' });
      }

      // Calcular a média das avaliações
      const total = avaliacoes.reduce((sum, review) => sum + review.rating, 0);
      const media = total / avaliacoes.length;

      res.status(200).json({ media });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Função para deletar um comentário (review)
exports.deletarReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrado' });
    }

    await Review.findByIdAndDelete(id);
    res.json({ message: 'Review deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Função para listar todas as clínicas veterinárias com suas avaliações
exports.listarClinicasComAvaliacoes = async (req, res) => {
  try {
    // Encontrar todas as clínicas veterinárias
    const clinicas = await Veterinaria.find();

    // Para cada clínica, calcular a média das avaliações
    const clinicasComAvaliacoes = await Promise.all(
      clinicas.map(async (clinica) => {
        // Encontrar as avaliações da clínica
        const avaliacoes = await Review.find({ veterinaria: clinica._id });

        // Calcular a média das avaliações ou definir como 0 se não houver avaliações
        const mediaAvaliacoes = avaliacoes.length > 0 ? calcularMedia(avaliacoes) : 0;

        // Retornar um objeto com os dados da clínica e a média das avaliações
        return {
          _id: clinica._id,
          nome: clinica.nome,
          localizacao: clinica.localizacao,
          servicos: clinica.servicos,
          reviews: avaliacoes,
          mediaAvaliacoes: mediaAvaliacoes
        };
      })
    );

    res.json(clinicasComAvaliacoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Função para calcular a média das avaliações
function calcularMedia(avaliacoes) {
  const total = avaliacoes.reduce((sum, review) => sum + review.rating, 0);
  return total / avaliacoes.length;
}
