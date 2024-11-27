const Payment = require('./paymentModel');
const User = require('./../users/userModel')

const createPayment = async (paymentData) => {
  try {
    return await Payment.create(paymentData);
  } catch (error) {
    throw new Error('Erro ao criar o pagamento: ' + error.message);
  }
};

const getAllPayments = async () => {
  try {
    return await Payment.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['full_name']
      }]
    });
  } catch (error) {
    throw new Error('Erro ao buscar todos os pagamentos: ' + error.message);
  }
};

const getPaymentById = async (id) => {
  try {
    return await Payment.findByPk(id);
  } catch (error) {
    throw new Error('Erro ao buscar o pagamento: ' + error.message);
  }
};

const updatePayment = async (id, paymentData) => {
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }
    return await payment.update(paymentData);
  } catch (error) {
    throw new Error('Erro ao atualizar o pagamento: ' + error.message);
  }
};

const deletePayment = async (id) => {
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }
    await payment.destroy();
    return { message: 'Pagamento deletado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar o pagamento: ' + error.message);
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};
