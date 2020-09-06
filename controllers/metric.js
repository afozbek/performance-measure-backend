const Metric = require("../models/metrics");

const moment = require("moment");

exports.postMetric = async (req, res, next) => {
  const { timestamp, measureValue, measureName } = req.body;

  // const newDate = new Date(timestamp).toLocaleTimeString("tr-TR");
  const measureObj = { timestamp, measureValue };
  try {
    const existingMetric = await Metric.findOne({ measureName });

    if (existingMetric) {
      existingMetric.measureData.push(measureObj);

      const result = await existingMetric.save();

      res.status(200).send({ result, message: "Updated Metric" });
    } else {
      const newMetric = new Metric({
        measureName,
      });

      newMetric.measureData.push(measureObj);

      const result = await newMetric.save();

      res.status(203).send({ result, message: "New Metric Created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

exports.getMetric = (req, res, next) => {
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

exports.getMetric2 = (req, res, next) => {
  const currentTimestamp = Date.now();
  const newDateTimeStamp = moment(currentTimestamp)
    .subtract(1, "minutes")
    .valueOf();

  console.log(newDateTimeStamp);

  Metric.find({})
    .populate({
      path: "measureData",
      match: { timestamp: { $gte: newDateTimeStamp } },
      select: "measureName -_id",
    })
    .exec()
    // .select("measureName")
    .then((metrics) => {
      // metrics: [{},{},{},{}]
      console.log(metrics[0].measureData.length);

      res.status(200).send(metrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};
