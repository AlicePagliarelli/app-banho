const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const expressListEndpoints = require('express-list-endpoints');

// Connect to Database (Immediately Invoked Function Expression)
(async () => {
  try {
    await connectDB(); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1); // Exit the application on connection failure
  }
})();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/veterinarias', require('./routes/veterinariaRoutes'));
app.use('/api/servicos', require('./routes/servicoRoutes'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
