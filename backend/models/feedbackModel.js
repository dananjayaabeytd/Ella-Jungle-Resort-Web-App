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
        type: Number,
        min: 1,
        max: 5
    },
    giverName: {
        type: String,
        required: true
    },
    giverId: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;