const Ticket = require('./ticketModel');
const VehiclesType = require('../vehiclesType/vehicleTypeModel');
const CarPark = require('../carParks/carParkModel');
const Brand = require('../brands/brandModel');
const Vehicle = require('../vehicles/vehicleModel');
const Tariff = require('../tariffs/tariffModel');
const User = require('../users/userModel');

exports.getAllTickets = async () => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['full_name'] // Apenas o nome do cliente
        },
        {
          model: User,
          as: 'employee',
          attributes: ['full_name'] // Apenas o nome do funcionário
        },
        {
          model: VehiclesType,
          as: 'vehicleType',
          attributes: ['type_name'] // Inclua o nome ou qualquer outro campo necessário
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['name']
        }
      ]
    });
    return tickets;
  } catch (error) {
    console.error('Error fetching tickets with user names:', error);
    throw error;
  }
};

exports.createTicket = async (ticketData) => {
  try {
    // Verifica se o estacionamento existe
    const carPark = await CarPark.findByPk(ticketData.car_parks_id);
    if (!carPark) {
      throw new Error('Car park not found');
    }

    // Verifica se a marca existe
    const brand = await Brand.findByPk(ticketData.brands_id);
    if (!brand) {
      throw new Error('Brand not found');
    }

    // Verifica se o veículo existe
    const vehicle = await Vehicle.findOne({ where: { plate: ticketData.vehicles_plate } });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Verifica se a tarifa existe
    const tariff = await Tariff.findByPk(ticketData.tariffs_id);
    if (!tariff) {
      throw new Error('Tariff not found');
    }

    if (ticketData.start_time) {
      const [datePart, timePart] = ticketData.start_time.split(' ');
      const [day, month, year] = datePart.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      ticketData.start_time = `${formattedDate} ${timePart}`;
    }

    // Cria o ticket associado ao usuário
    const ticket = await Ticket.create({
      car_parks_id: ticketData.car_parks_id,
      garage_number: ticketData.garage_number,
      vehicles_id: ticketData.vehicles_id,
      vehicles_plate: ticketData.vehicles_plate,
      vehicles_type_id: ticketData.vehicles_type_id,
      brands_id: ticketData.brands_id,
      start_time: ticketData.start_time,
      finish_time: ticketData.finish_time,
      duration: ticketData.duration,
      tariffs_id: ticketData.tariffs_id,
      client_id: ticketData.client_id,
      employee_id: ticketData.employee_id,
    });

    return ticket;
  } catch (error) {
    throw new Error('Erro ao criar o ticket: ' + error.message);
  }
};

exports.getTicketById = async (id) => {
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return ticket;
  } catch (error) {
    throw error;
  }
};

exports.updateTicket = async (id, ticketData) => {
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    
    await ticket.update(ticketData);

    // Calcular a duração se o finish_time estiver presente
    if (ticketData.finish_time) {
      const startTime = new Date(ticket.start_time);
      const finishTime = new Date(ticketData.finish_time);

      const durationMinutes = Math.floor((finishTime - startTime) / 60000); // Converter milissegundos para minutos

      ticket.duration = durationMinutes;
      await ticket.save();
    }

    return ticket;
  } catch (error) {
    throw error;
  }
};

exports.deleteTicket = async (id) => {
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    await ticket.destroy();
    return { message: 'Ticket deleted successfully' };
  } catch (error) {
    throw error;
  }
};