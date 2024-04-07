const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    eventId: {
        type: String,
    },

    ticketUserId: {
        type: String,
    },

    ticketUserEmail: {
        type: String,   
    },

    ticketUserMobile: {
        type: String,   
    },

    ticketCount: {
        type: Number,
        required: true
    },

    totalTicketCost: {
        type: Number,
    },

});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

