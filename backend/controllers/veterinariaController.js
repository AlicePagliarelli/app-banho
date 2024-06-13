const Veterinaria = require('../models/Veterinaria');
const Servico = require('../models/Servico'); // Importando o modelo Servico
const Review = require('../models/Review');

exports.criarVeterinaria = async (req, res) => {
    const { nome, localizacao } = req.body;
    try {
        const novaVeterinaria = new Veterinaria({ nome, localizacao });
        await novaVeterinaria.save();
        res.status(201).json(novaVeterinaria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listarVeterinarias = async (req, res) => {
    try {
        const veterinarias = await Veterinaria.find().populate('servicos');
        res.json(veterinarias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarVeterinariaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const veterinaria = await Veterinaria.findById(id).populate('servicos');
      if (!veterinaria) {
        return res.status(404).json({ message: 'Veterinária não encontrada' });
      }
  
      // Encontrar as avaliações da veterinária
      const avaliacoes = await Review.find({ veterinaria: veterinaria._id });
  
      // Calcular a média das avaliações ou definir como 0 se não houver avaliações
      const mediaAvaliacoes = avaliacoes.length > 0 ? calcularMedia(avaliacoes) : 'Sem avaliações';
  
      // Extraindo os dados necessários dos serviços
      const servicos = veterinaria.servicos.map(servico => ({
        id: servico._id,
        nome: servico.nome,
        preco: servico.preco
      }));
  
      // Formatando a resposta
      const resposta = {
        nome: veterinaria.nome,
        id: veterinaria._id,
        mediaAvaliacoes: mediaAvaliacoes,
        servicos: servicos,
        comentarios: avaliacoes.map(review => ({
          texto: review.texto,
          avaliacao: review.rating
        }))
      };
  
      res.json(resposta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Exemplo de função utilizando o modelo Servico
exports.adicionarServicoAVeterinaria = async (req, res) => {
    const { nome, preco, descricao, veterinariaId } = req.body;
    try {
        const servico = new Servico({ nome, preco, descricao, veterinaria: veterinariaId });
        await servico.save();
        // Adicionar o ID do serviço à veterinária
        const veterinaria = await Veterinaria.findById(veterinariaId);
        veterinaria.servicos.push(servico._id);
        await veterinaria.save();
        res.status(201).json(servico);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const calcularMedia = (avaliacoes) => {
    const total = avaliacoes.reduce((sum, avaliacao) => sum + avaliacao.rating, 0);
    return (total / avaliacoes.length).toFixed(1);
  };