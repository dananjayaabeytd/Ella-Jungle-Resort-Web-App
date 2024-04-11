const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventUserId: {
        type: String,
       
    },
    eventName: {
        type: String,
        required: true
    },

    eventCategory: {
        type: String,
        enum: ['Wedding', 'Birthday', 'Christmas', 'Halloween', 'NewYear', 'Other'],
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    eventTime: {
        type: String,
        required: true
    },

    eventDescription: {
        type: String,
        required: true
    },

    selectedOptions: [String], // Save as an array of strings

    totalCost: {
        type: Number,
        required: true
    },

    isPublic: {
        type: Boolean,
    },

    ticketPrice: {
        type: Number,
    },

    eventImage: {
        type: String, // Store the filename or image URL
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;


// selectedOptions: [{
//     type: Schema.Types.ObjectId,
//     ref: Option, // Reference to the Option model
//   }],


// decorationPreferences: {
//     minimalistChecked: {
//       type: Boolean,
//       default: false,
//     },
//     elegantChecked: {
//       type: Boolean,
//       default: false,
//     }
// },