const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

//Dananjaya
const userRoutes = require('./routes/userRoutes.js');
const agencyRoutes = require('./routes/agencyRoutes.js');

//Ishara
const feedbackRoutes = require('./routes/feedbackRoutes.js')
const faqRoutes = require('./routes/faqRoutes.js')
const agencyfeedbackRoutes = require('./routes/agencyfeedbackRoutes.js');

//Dushan
const roomRoutes = require('./routes/Rooms');
const reservationRoutes = require('./routes/reservationRoutes');

//Sayuni
const specialActivityRouter = require("./routes/SpecialActivity.js");
const reservationRouter = require("./routes/ActivityReservationRoutes.js");

//Sathma
const spaPackageRoutes = require('./routes/spaRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointment routes


dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const cors = require('cors');
const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(cookieParser());

//Dananjaya
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);


//Ishara
app.use('/api/feedbacks',feedbackRoutes); 
app.use('/api/faq',faqRoutes);  
app.use('/api/agencyfeedbacks',agencyfeedbackRoutes); 


//Dushan
app.use('/residence', roomRoutes);
app.use('/reservation', reservationRoutes);


//Sayuni
app.use("/SpecialActivity",specialActivityRouter);
app.use("/ActivityReservation",reservationRouter);


//Sathma
app.use('/api/spa-packages', spaPackageRoutes);
app.use('/api/appointments', appointmentRoutes); 



if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
