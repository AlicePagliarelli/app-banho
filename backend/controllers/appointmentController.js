const Appointment = require('../models/Appointment');
const Servico = require('../models/Servico');
const Veterinaria = require('../models/Veterinaria');

// Criar agendamento
exports.createAppointment = async (req, res) => {
  const { servicoId, date, time, price, veterinariaId } = req.body;

  try {
    const servico = await Servico.findById(servicoId); // Use meaningful names for variables (servicoId instead of servico)
    const veterinaria = await Veterinaria.findById(veterinariaId);

    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado' }); // Use 404 for 'Not Found'
    }
    if (!veterinaria) {
      return res.status(404).json({ message: 'Veterinária não encontrada' }); // Use 404 for 'Not Found'
    }

    const newAppointment = new Appointment({
      servico: servico._id, // Use _id to store the reference in the appointment
      date,
      time,
      price,
      veterinaria: veterinaria._id, // Use _id to store the reference in the appointment
    });
    
    await newAppointment.save();

    // Populate the references before sending the response
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('veterinaria')
      .populate('servico');

    res.status(201).json(populatedAppointment); // Send the populated appointment object
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const agendamentos = await Appointment.find().populate('veterinaria').populate('servico');

    // Format the response data (optional)
    const formattedAgendamentos = agendamentos.map(agendamento => ({
      id: agendamento._id,
      data: agendamento.date,
      horario: agendamento.time,
      preco: agendamento.price,
      veterinaria: {
        id: agendamento.veterinaria._id,
        nome: agendamento.veterinaria.nome,
        // ... outras informações da veterinária que você desejar incluir
      },
      servico: {
        id: agendamento.servico._id,
        nome: agendamento.servico.nome,
        // ... outras informações do serviço que você desejar incluir
      }
    }));

    res.json({
      formattedAgendamentos
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao buscar os agendamentos'
    });
  }
};


