const Metric = require("../models/metrics");
const e = require("cors");

exports.postMetric = async (req, res, next) => {
  const { timestamp, measureValue, measureName } = req.body;

  const newDate = new Date(timestamp).toLocaleTimeString("tr-TR");
  try {
    const existingMetric = await Metric.findOne({ measureName });

    if (existingMetric) {
      existingMetric.timestamps = [...existingMetric.timestamps, newDate];
      existingMetric.measureTimes = [
        ...existingMetric.measureTimes,
        measureValue,
      ];

      const result = await existingMetric.save();

      res.status(200).send({ result, message: "Updated Metric" });
    } else {
      const newMetric = new Metric({
        measureName,
        timestamps: [newDate],
        measureTimes: [measureValue],
      });

      const result = await newMetric.save();

      res.status(203).send({ result, message: "New Metric Created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

exports.getMetric = (req, res, next) => {
  Metric.find()
    .then((metrics) => {
      res.status(200).send(metrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};
