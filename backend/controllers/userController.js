const User = require('../models/User');

// Função para registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o email já está em uso
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criar novo usuário
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para autenticar um usuário
exports.autenticarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    // Comparar senha
    const senhaValida = await usuario.comparePassword(senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    res.status(200).json({ message: 'Autenticado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
