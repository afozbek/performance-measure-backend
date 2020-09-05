const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const metricSchema = new Schema(
  {
    timestamp: { type: Number },
    measureName: { type: String },
    measureValue: { type: String },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Metrics", metricSchema);
