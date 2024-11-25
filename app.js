const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./src/config/config');
const sequelize = require('./src/database/database');

const authRoutes = require('./src/auth/authRouters');
const userRoutes = require('./src/modules/users/userRoutes');
const vehicleRoutes = require('./src/modules/vehicles/vehicleRoutes');
const vehicleTypeRoutes = require('./src/modules/vehiclesType/vehicleTypeRoutes');
const brandRoutes = require('./src/modules/brands/brandRoutes');
const carParkRoutes = require('./src/modules/carParks/carParkRoutes');
const ticketRoutes = require('./src/modules/tickets/ticketRoutes');
const tariffRoutes = require('./src/modules/tariffs/tariffRoutes');
const paymentRoutes = require('./src/modules/payments/paymentRoutes');
const carParkCapacityRoutes = require('./src/modules/carParkCapacities/carParkCapacityRoutes');

app.use(express.json());

const corsOptions = {
  origin: 'https://www.systemparkcar.com.br',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'same-origin');
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none")
  next();
});

app.get('/', (req, res) => {
  res.send('Servidor rodando! Bem-vindo à API.');
});

app.use('/api', authRoutes); // alterar para auth
app.use('/api', userRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', vehicleTypeRoutes);
app.use('/api', brandRoutes);
app.use('/api', ticketRoutes);
app.use('/api', carParkRoutes);
app.use('/api', tariffRoutes);
app.use('/api', paymentRoutes);
app.use('/api', carParkCapacityRoutes);

sequelize.sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Servidor rodando na porta ${config.port}`);
    });
  })
  .catch(err => console.log(err));
