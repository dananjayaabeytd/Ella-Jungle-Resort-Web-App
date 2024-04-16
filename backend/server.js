const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoutes.js');
const agencyRoutes = require('./routes/agencyRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js')
const faqRoutes = require('./routes/faqRoutes.js')
const agencyfeedbackRoutes = require('./routes/agencyfeedbackRoutes.js');
const roomRoutes = require('./routes/Rooms');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const port = process.env.PORT || 5000;

//connect to the database
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
