const ticketService = require('./ticketService');

exports.getAllTickets = async (_req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tickets' });
  }
};

exports.createTicket = async (req, res) => {
  const ticketData = req.body;

  try {
    const ticket = await ticketService.createTicket(ticketData);
    res.status(201).json(ticket);
  } catch (error) {
    if (error.message.includes('Estacionamento não encontrado') || error.message.includes('Marca não encontrada') || error.message.includes('Veículo não encontrado') || error.message.includes('Tarifa não encontrada')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ticket' });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { finish_time, status } = req.body;

  try {
    const updatedTicket = await ticketService.updateTicket(id, { finish_time, status });
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ticket', details: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.json({ message: 'Ticket excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir ticket' });
  }
};