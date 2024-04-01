const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
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

    eventDescription: {
        type: String,
        required: true
    },

    decorationPreferences: {
        minimalistChecked: {
          type: Boolean,
          default: false,
        },
        elegantChecked: {
          type: Boolean,
          default: false,
        }
    },

    eventImage: {
        type: String, // Store the filename or image URL
        required: true
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
