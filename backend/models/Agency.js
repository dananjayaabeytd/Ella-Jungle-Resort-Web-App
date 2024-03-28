const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencySchema = new Schema({

    AgencyName: {
        type: String,
        required: true
    },
    AgencyRegNo: {
        type: String,
        required: true
    },
    AgencyLicenseNo: {
        type: String,
        required: true
    },
    AgencyAddress: {
        type: String,
        required: true  
    },
    AgencyTelephone: {
        type: String,
        required: true
    },
    AgencyEmail: {
        type: String,
        required: true
    },
    AgencyFax: {
        type: String,
        required: true
    },
    AgencyDescription: {
        type: String,
        required: true
    },
    AgencyLogo: {
        type: String,
        required: true
    },
    AgencyRating: {
        type: String,
        required: true
    },
    AgencySocialMedia: {
        type: String,
        required: false
    },
});

const Agency = mongoose.model('Agency', AgencySchema);

module.exports = Agency;