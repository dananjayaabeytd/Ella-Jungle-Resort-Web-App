const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();



//define the port
const PORT = process.env.PORT || 8080;

app.use(cors());
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


app.use("/SpecialActivity",specialActivityRouter);



//load our app in the port
app.listen(PORT,()=>{
    console.log(`Server is up & running on port $(PORT)`);
})