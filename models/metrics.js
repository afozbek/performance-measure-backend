const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const measureDataSchema = new Schema(
  {
    timestamp: Number,
    measureValue: Number,
  },
  { timestamps: true }
);

const metricSchema = new Schema(
  {
    measureName: { type: String, unique: true },
    measureData: [measureDataSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metrics", metricSchema);
