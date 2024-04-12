const mongoose = require('mongoose');

const spapackageSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
  },
  },
  {
    timestamps: true,
  }
);

const Spapackage = mongoose.model('Spapackage', spapackageSchema);

module.exports = Spapackage;
