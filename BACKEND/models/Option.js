const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    optionCategory: {
        type: String,
        enum: ['Decoration', 'Catering', 'Entertainment', 'Parking', 'Photography', 'Other'],
        required: true
    },

    optionName: {
        type: String,
        required: true
    },

    optionPrice: {
        type: Number,
        required: true
    }

});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
