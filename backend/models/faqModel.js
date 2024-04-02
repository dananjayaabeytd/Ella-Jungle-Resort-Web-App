const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    faqtitle: {
        type: String,
        required: true
    },
    faqdescription: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
