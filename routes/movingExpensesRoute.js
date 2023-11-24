require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();

let externalData = null;
router.get("/movingExpenses", async (req, res) => {
  try {
    const updatedPriceOfWage = [];
    const API_KEY = process.env.API_KEY + "=";
    const priceOfWageUrl = `https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/365/TX_36504_A001_1/2/1/20231106140112&prdSe=H&newEstPrdCnt=1`;
    const priceRes = await axios.get(priceOfWageUrl);
    for (let i = 3; i < 7; i++) {
      updatedPriceOfWage.push(Number(priceRes.data[0].DT) * i);
    }
    updatedPriceOfWage.push(Number(priceRes.data[0].DT) * 8);
    res.send(updatedPriceOfWage);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
