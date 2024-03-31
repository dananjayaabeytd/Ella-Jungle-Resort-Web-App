const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const DB_URL = "mongodb+srv://itp:itp@ellajungleresort.zklxh1j.mongodb.net/ellajungleresort?retryWrites=true&w=majority&appName=EllaJungleResort";
const roomRoutes = require('./routes/Rooms');
const reservationRoutes = require('./routes/reservationRoutes');

// Middleware
app.use(express.json()); // Parse JSON bodies

// Using routes
app.use('/residence', roomRoutes);
app.use('/reservation', reservationRoutes);

// Database connection
mongoose.connect(DB_URL)
  .then(() => {
    console.log("DB connection successful");
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error ", err);
  });
