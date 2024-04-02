const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgencyPackagesSchema = new Schema({
  PackageName: {
    type: String,
    required: true,
  },
  PackageImage: {
    type: String,
    required: true,
  },
  RoomId: {
    type: String,
    required: true,
  },
  SActivityId: {
    type: String,
    required: true,
  },
  SpaId: {
    type: String,
    required: true,
  },
  PackageDescription: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});
