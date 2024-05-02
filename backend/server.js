const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoutes.js');
const agencyRoutes = require('./routes/agencyRoutes.js');
const eventRouter = require("./routes/events.js");
const optionRouter = require("./routes/options.js");
const ticketRouter = require("./routes/tickets.js");

//app.use(express.static('public'))

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

app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);
app.use ("/event", eventRouter);
app.use ("/option", optionRouter);
app.use ("/ticket", ticketRouter);
app.use(express.static('public'))

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



