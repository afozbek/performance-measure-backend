const Metric = require("../models/metrics");

const moment = require("moment");

exports.getMetric = (req, res, next) => {
  const currentTimestamp = Date.now();
  console.log(req.query);

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

      await existingMetric.save();

      res.status(200).send({ message: "Updated Metric" });
    } else {
      const newMetric = new Metric({
        measureName,
      });

      newMetric.measureData.push(measureObj);

      await newMetric.save();

      res.status(201).send({ message: "New Metric Created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

exports.getMetric2 = (req, res, next) => {
  const currentTimestamp = Date.now();
  const newDateTimeStamp = moment(currentTimestamp)
    .subtract(30, "minutes")
    .valueOf();

  console.log(newDateTimeStamp);

  Metric.find()
    .then((metrics) => {
      // metrics: [{},{},{},{}]
      const newMetrics = metrics.map((metric) => {
        const results = metric.measureData
          .filter((obj) => obj.timestamp > newDateTimeStamp)
          .reduce(
            (acc, curr) => {
              const { timestampList, measureValueList } = acc;

              timestampList.push(curr.timestamp);
              measureValueList.push(curr.measureValue);

              return acc;
            },
            { timestampList: [], measureValueList: [] }
          );

        return {
          ...metric._doc,
          measureData: {
            timestampList: results.timestampList,
            measureValueList: results.measureValueList,
          },
        };
      });

      res.status(200).send(newMetrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};
