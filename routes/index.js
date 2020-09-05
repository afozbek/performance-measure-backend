var express = require("express");
var router = express.Router();

var Metric = require("../models/metrics");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "hello World",
  });
});

router.post("/browser-metrics", function (req, res, next) {
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
});

module.exports = router;
