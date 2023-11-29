require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();

let amountResult = 0;
router.post("/relocationSettlement", (req, res) => {
  const amount = req.body.amount;
  const date = req.body.date;
  const share = req.body.share;
  const data = { amount: amount, date: date, share: share, rate: "30%" };
  try {
    const result = calAmount(amount, date, share);
    data.result = result;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//이주정착금 함수 모음
const calAmount = (amount, date, share) => {
  let val;
  let result = 0;
  const standardDate = new Date("2020-12-11"); //차량운임비 기준알자
  val = Math.floor(Math.round(amount * 0.3) / 10) * 10 * share;
  if (date > standardDate) {
    if (val < 12000000) {
      result = 12000000;
      amountResult = result;
    } else if (val > 24000000) {
      result = 24000000;
      amountResult = result;
    } else {
      result = val;
      amountResult = result;
    }
  } else {
    if (val < 6000000) {
      result = 6000000;
      amountResult = result;
    } else if (val > 12000000) {
      result = 12000000;
      amountResult = result;
    } else {
      result = val;
      amountResult = result;
    }
  }
  return amountResult;
};

const relocationSettlementEligibility = () => {
  if (
    eligibility === "agree" &&
    agreeDay < date &&
    usage === "house" &&
    owner === "owner" &&
    moveInDate < date
  ) {
    calAmount(amount, date, share);
  } else {
    amountResult = 0;
    //totalSum();
  }
};

module.exports = router;
