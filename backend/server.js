const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection success!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const AgencyRequestRouter = require('./routes/agencyRequestRoutes'); 
app.use('/', AgencyRequestRouter); 

const AgencyRouter = require('./routes/agencyRoutes');
app.use('/', AgencyRouter);

const RoomRouter = require('./routes/Rooms');
app.use('/', RoomRouter);

const ReservationRouter = require('./routes/reservationRoutes');
app.use('/', ReservationRouter);

const TransportRouter = require('./routes/transportRoutes');
app.use('/', TransportRouter);

const SpecialActivityRouter = require('./routes/SpecialActivity');
app.use('/', SpecialActivityRouter);

const ActivityReservationRouter = require('./routes/activityReservationRoutes');
app.use('/', ActivityReservationRouter);

const AgencyPackagesRouter = require('./routes/agencyPackagesRoutes');
app.use('/', AgencyPackagesRouter);

const AgencyPackageReservationRouter = require('./routes/agencyPackageReservationRoutes');
app.use('/', AgencyPackageReservationRouter);