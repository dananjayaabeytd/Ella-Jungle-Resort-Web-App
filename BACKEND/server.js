const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
        console.log("MongoDB Connection Success!");
        app.listen(PORT, () => {
            console.log(`Server is up and running on port number: ${PORT}`);
        });
    }).catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
    

    
const eventRouter = require("./routes/events");

app.use ("/event", eventRouter);
//Here when URL is searched as http://Localhost:8070/event, the 'events.js' filein routes folder is executed


