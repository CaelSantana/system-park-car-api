const paymentService = require('./paymentService');

exports.createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o pagamento: ' + error.message });
  }
};

exports.getAllPayments = async (_req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pagamentos: ' + error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o pagamento: ' + error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await paymentService.updatePayment(req.params.id, req.body);
    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o pagamento: ' + error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const result = await paymentService.deletePayment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Pagamento não encontrado') {
      res.status(404).json({ error: 'Pagamento não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar o pagamento: ' + error.message });
    }
  }
};
