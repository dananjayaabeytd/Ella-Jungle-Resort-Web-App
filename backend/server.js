const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection success!');
});

// Routes
const hotelPackagesRouter = require('./routes/hotel_packages');
app.use('/hotel_packages', hotelPackagesRouter);

const specialActivityRouter = require('./routes/SpecialActivity');
app.use('/SpecialActivity',specialActivityRouter);

const RoomRouter = require('./routes/Rooms');
app.use('/Rooms', RoomRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});