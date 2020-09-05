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
      res.send({ message: "Error Happened" });
    });
};

exports.getMetric = (req, res, next) => {
  Metric.find()
    .then((metrics) => {
      res.send(metrics);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Metric getirmede hata oluştu" });
    });
};
