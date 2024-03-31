
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName:{
        type:String,
        required:true       //A Backend Validation
    },

    eventCategory: {
        type: String,
        enum: ['Wedding', 'Birthday', 'Christmas', 'Halloween', 'NewYear', 'Other'], 
        required: true
    },
    

    eventDate:{
        type:Date,
        required:true
    },

    eventDescription:{
        type:String,
        required:true
    }

    

    
})

const Event = mongoose.model("Event", eventSchema);   

module.exports = Event;       //Essential for Routes