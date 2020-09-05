const Metric = require("../models/metrics");

exports.postMetric = (req, res, next) => {
  const { timestamp, measureValue, measureName } = req.body;

  console.log("receiving data ...");
  console.log("body is ", req.body);
  const newMetric = new Metric({
    timestamp,
    measureValue,
    measureName,
  });

  newMetric
    .save()
    .then((result) => {
      console.log(result);
      res.send(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(203).send({ message: "Error Happened" });
    });
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
