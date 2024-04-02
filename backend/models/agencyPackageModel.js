const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgencyPackagesSchema = new Schema({
  packageName: {
    type: String,
    required: true,
  },
  packageImage: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  activityId: {
    type: String,
    required: true,
  },
  transportId: {
    type: String,
    required: true,
  },
  spaId: {
    type: String,
    required: true,
  },
  fullDays: {
    type: Number,
    required: true,
  },
  packageDescription: {
    type: String,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  agencyId: {
    type: String,
    required: true,
  },
});

const AgencyPackages = mongoose.model("AgencyPackages", AgencyPackagesSchema);

module.exports = AgencyPackages;
