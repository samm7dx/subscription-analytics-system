const express = require("express");

const router = express.Router();

const {
  getDailyActiveUsers,
  getRevenueAnalytics,
  getTopContent,
  getUserChurn,
  getUserEngagement,
  getMonthlyRevenue,
  getMostActiveUsers,
  getGenreEngagement,
} = require("../controllers/analyticsController");



router.get("/dau", getDailyActiveUsers);

router.get("/revenue", getRevenueAnalytics);

router.get("/top-content", getTopContent);

router.get("/churn", getUserChurn);

router.get("/engagement", getUserEngagement);

router.get("/monthly-revenue", getMonthlyRevenue);

router.get("/active-users", getMostActiveUsers);

router.get("/genre-engagement", getGenreEngagement);



module.exports = router;
