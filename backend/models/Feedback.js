const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    fbtitle: {
        type: String,
        required: true
    },
    fbdescription: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // Assuming the rating will be a number
        min: 1,      // Minimum rating value
        max: 5       // Maximum rating value
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
