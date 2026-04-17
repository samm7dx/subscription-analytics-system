const express = require("express");
const router = express.Router();
const { runQuery } = require("../controllers/analyticsController");

router.get("/run-query/:type", runQuery);

module.exports = router;
