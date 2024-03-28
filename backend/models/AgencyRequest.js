const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencyRequestSchema = new Schema({
    ArrivalDate: {
        type: String,
        required: true
    },
    DepartureDate: {
        type: String,
        required: false
    },
    NoOfDays: {
        type: Number,
        required: true
    },
    NoOfNights: {
        type: Number,
        required: true
    },
    NoOfAdults: {
        type: Number,
        required: true
    },
    NoOfChildren: {
        type: Number,
        required: true
    },
    NoOfSingleRooms: {
        type: Number,
        required: true
    },
    NoOfDoubleRooms: {
        type: Number,
        required: true
    },
    NoOfTripleRooms: {
        type: Number,
        required: true
    },
    MealTypeBreakfast: {
        type: String,
        required: true
    },
    MealTypeLunch: {
        type: String,
        required: true
    },
    MealTypeDinner: {
        type: String,
        required: true
    },
    RequestDescription: {
        type: String,
        required: true
    }
    
});

const AgencyRequest = mongoose.model('AgencyRequest', AgencyRequestSchema);

module.exports = AgencyRequest;