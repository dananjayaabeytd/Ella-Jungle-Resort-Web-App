const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//initializes an Express application
const app = express();

//to read the url in .env file 
require("dotenv").config();




//define the port
const PORT = process.env.PORT || 8080;

// allow client-side code to make requests to this server from different domains.
app.use(cors());

//parses incoming request bodies in JSON format.
app.use(bodyParser.json());



//get the db link
const URL = process.env.MONGODB_URL;




//mongodb configuration
//connect to our db using the given url and the options provided
mongoose.connect(URL,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}
);





//open the db connection we created
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection Success!");
});






//import SpecialActivity.js file to access students.js router file
const specialActivityRouter = require("./routes/SpecialActivity.js");
const reservationRouter = require("./routes/ReservationRoutes.js");


app.use("/SpecialActivity",specialActivityRouter);
app.use("/ActivityReservation",reservationRouter);






//load our app in the port
app.listen(PORT,()=>{
    console.log(`Server is up & running on port ${PORT}`);
})