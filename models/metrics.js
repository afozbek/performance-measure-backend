const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const metricSchema = Schema({
  timestamp: { type: Number },
  measureName: { type: String },
  measureValue: { type: String },
});

module.exports = mongoose.model("Metrics", metricSchema);
