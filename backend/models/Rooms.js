const mongoose = require('mongoose');

//Defining room schemass
const roomSchema = new mongoose.Schema({

    roomName: {
        type:String,
        required:true
    },
    roomType: {
        type:String,
        required:true
    },
    maxCount: {
        type:Number,
        required:true
    },
    image: {
        type:String,
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
});

//create and export room model
module.exports = mongoose.model('Rooms', roomSchema);