const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  plotPhase: {type: String, required: true},
  plotBlock: {type: String, required: true},
  plotStreet: {type: String, required: true},
  plotNo: { type: String, required: true, unique: true },
  plotSize: {type: String, required: true},
  isCorner: {type: Boolean, required: true},
  isParkfacing: {type: Boolean, required: true},
  onMainboulevard: {type: Boolean, required: true},
});

const Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;