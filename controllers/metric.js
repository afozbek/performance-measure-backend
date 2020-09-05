const Metric = require("../models/metrics");
const e = require("cors");

exports.postMetric = async (req, res, next) => {
  const { timestamp, measureValue, measureName } = req.body;

  try {
    const existingMetric = await Metric.findOne({ measureName });

    if (existingMetric) {
      existingMetric.measureData.timestamps = [
        ...existingMetric.measureData.timestamps,
        timestamp,
      ];
      existingMetric.measureData.measureTimes = [
        ...existingMetric.measureData.measureTimes,
        measureValue,
      ];

      const result = await existingMetric.save();

      res.status(200).send({ result, message: "Updated Metric" });
    } else {
      const newMetric = new Metric({
        measureName,
        measureData: {
          timestamps: [timestamp],
          measureTimes: [measureValue],
        },
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
    .sort({ _id: 1 })
    .limit(100)
    .then((metrics) => {
      console.log(metrics.length);
      res.status(200).send(metrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};
