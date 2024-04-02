const mongoose = require('mongoose');

const spapackageSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    spaPackageName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Spapackage = mongoose.model('Spapackage', spapackageSchema);

module.exports = Spapackage;
