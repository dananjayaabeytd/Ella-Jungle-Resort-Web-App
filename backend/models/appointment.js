const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    NIC: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    appointmentTypes: {
      type: String, 
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
