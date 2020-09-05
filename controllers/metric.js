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
