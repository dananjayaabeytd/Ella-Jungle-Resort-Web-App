//to connect with mongodb import mongodb and assign it to a variable
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//create an object
const reservationSchema = new Schema({
    //properties of special activities
    activityID:{
        type:String,
        required:true
    },

    guestID:{
        type:String,
        required:true
    },

    activityName:{
        type:String,
        required:true
    },

   
})




//send the above properties to the db
const Reservation = mongoose.model("activities_reservation",reservationSchema);

module.exports = Reservation;