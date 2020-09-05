var express = require("express");
var router = express.Router();

const metricController = require("../controllers/metric");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "hello World",
  });
});

router.post("/browser-metrics", metricController.postMetric);

router.get("/browser-metrics", metricController.getMetric);

module.exports = router;
