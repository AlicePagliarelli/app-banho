const Servico = require('../models/Servico');
const Veterinaria = require('../models/Veterinaria');

exports.criarServico = async (req, res) => {
    const { nome, preco, descricao, veterinaria } = req.body;
    try {
        const novoServico = new Servico({ nome, preco, descricao });
        await novoServico.save();

        const servicoId = novoServico._id;

        const veterinariaId = veterinaria;
        const veterinariaEncontrada = await Veterinaria.findById(veterinariaId);

        if (!veterinariaEncontrada) {
            return res.status(404).json({ message: 'Veterinária não encontrada' });
        }

        veterinariaEncontrada.servicos.push(servicoId);

        await veterinariaEncontrada.save();

        res.status(201).json(novoServico);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Função para listar todos os serviços
exports.listarServicos = async (req, res) => {
    try {
      const servicos = await Servico.find();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Função para buscar um serviço pelo ID
  exports.buscarServicoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const servico = await Servico.findById(id);
      if (!servico) {
        return res.status(404).json({ message: 'Serviço não encontrado' });
      }
      res.json(servico);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // Função para atualizar um serviço existente
exports.atualizarServico = async (req, res) => {
    const id = req.params.id;
    const { nome, preco, descricao } = req.body;
    try {
        const servicoAtualizado = await Servico.findByIdAndUpdate(id, { nome, preco, descricao }, { new: true });
        if (!servicoAtualizado) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.json(servicoAtualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Função para deletar um serviço existente
exports.deletarServico = async (req, res) => {
    const id = req.params.id;
    try {
        const servicoDeletado = await Servico.findByIdAndDelete(id);
        if (!servicoDeletado) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.json({ message: 'Serviço deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Função para listar serviços por veterinária
exports.listarServicosPorVeterinaria = async (req, res) => {
    const veterinariaId = req.params.veterinariaId;
    try {
        // Encontrar a veterinária pelo ID e popular os serviços associados
        const veterinaria = await Veterinaria.findById(veterinariaId).populate('servicos');

        if (!veterinaria) {
            return res.status(404).json({ message: 'Veterinária não encontrada' });
        }

        // Retornar os dados da veterinária e seus serviços
        res.json({
            veterinariaId: veterinaria._id,
            nome: veterinaria.nome,
            localizacao: veterinaria.localizacao,
            foto:veterinaria.foto,
            servicos: veterinaria.servicos
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
