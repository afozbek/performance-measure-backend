const Metric = require("../models/metrics");

const moment = require("moment");

exports.getMetric = (req, res, next) => {
  const currentTimestamp = Date.now();

  const newDateTimeStamp = moment(currentTimestamp)
    .subtract(req.query.lastMinutes || 30, "minutes")
    .valueOf();

  console.log(newDateTimeStamp);

  Metric.aggregate([
    {
      $project: {
        measureName: 1,
        _id: 0,
        measureData: {
          $filter: {
            input: "$measureData",
            as: "item",
            cond: { $gt: ["$$item.timestamp", newDateTimeStamp] },
          },
        },
      },
    },
  ])
    .then((metrics) => {
      // metrics: [{},{},{},{}]
      res.status(200).send(metrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};

exports.postMetric = async (req, res, next) => {
  const { timestamp, measureValue, measureName } = req.body;

  // const newDate = new Date(timestamp).toLocaleTimeString("tr-TR");
  const measureObj = { timestamp, measureValue };
  try {
    const existingMetric = await Metric.findOne({ measureName });

    if (existingMetric) {
      existingMetric.measureData.push(measureObj);

      existingMetric.save();

      res.status(200).send({ message: "Updated Metric" });
    } else {
      const newMetric = new Metric({
        measureName,
      });

      newMetric.measureData.push(measureObj);

      newMetric.save();

      res.status(201).send({ message: "New Metric Created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};
