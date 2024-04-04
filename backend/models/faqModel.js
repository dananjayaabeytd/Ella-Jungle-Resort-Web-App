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
    },
    replies: [{
        type: String // Assuming replies are strings, modify as needed
    }],
    giverName: {
        type: String,
        required: true
    },
    giverId: {
        type: String,
        required: true
    }
});


const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
