const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const measureData = new Schema(
//   {
//     timestamps: { type: Array },
//     measureTimes: { type: Array },
//   },
//   { timestamps: { createdAt: "created_at" } }
// );

// const MeasureData = mongoose.model("MeasureData", measureData);
const metricSchema = new Schema(
  {
    measureName: { type: String, unique: true },
    measureData: {
      timestamps: { type: Array },
      measureTimes: { type: Array },
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Metrics", metricSchema);
