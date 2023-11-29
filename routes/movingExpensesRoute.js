require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();

const vhehicleCost = 222000;
let externalData = null;
let combinedArray = [];
let resultArr = [];

//주택 연면적 받아서 결과값 뽑아내기
router.post("/movingExpenses", async (req, res) => {
  const { width } = req.body;
  try {
    const updatedPriceOfWage = [];
    const API_KEY = process.env.API_KEY + "=";
    const priceOfWageUrl = `https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/365/TX_36504_A001_1/2/1/20231106140112&prdSe=H&newEstPrdCnt=1`;
    const priceRes = await axios.get(priceOfWageUrl);
    for (let i = 3; i < 7; i++) {
      updatedPriceOfWage.push(Number(priceRes.data[0].DT) * i);
    }
    updatedPriceOfWage.push(Number(priceRes.data[0].DT) * 8);
    calVehicleCost(vhehicleCost);
    combinedArr(updatedPriceOfWage);
    selectArr(width);
    resultArr.width = width;
    res.send(resultArr);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//차량운임비 계산 후 배열에 입력
const calVehicleCost = (vehicleCostVal) => {
  const updatedVehicleCost = [];
  for (let i = 1; i < 3; i++) {
    updatedVehicleCost.push(Number(vehicleCostVal) * i);
  }
  updatedVehicleCost.push(Number(vehicleCostVal) * 2.5);
  for (let i = 3; i < 5; i++) {
    updatedVehicleCost.push(Number(vehicleCostVal) * i);
  }
  externalData = updatedVehicleCost;
};
//노임비+차량운임비를 이용하여 배열 생성
const combinedArr = (data) => {
  combinedArray = data.map((element, index) => ({
    priceOfWage: element,
    vehicleCost: externalData[index],
    packagingFee: Math.floor((element + externalData[index]) * 0.15),
    sum:
      Math.floor(
        (element +
          externalData[index] +
          Math.floor((element + externalData[index]) * 0.15)) /
          10
      ) * 10,
  }));
};
//면적 기준에 따른 해당 값 출력
const selectArr = (width) => {
  if (width < 33) {
    resultArr = combinedArray[0];
    return combinedArray[0];
  } else if (width >= 33 && width < 49.5) {
    resultArr = combinedArray[1];
  } else if (width >= 49.5 && width < 66) {
    resultArr = combinedArray[2];
  } else if (width >= 66 && width < 99) {
    resultArr = combinedArray[3];
  } else {
    resultArr = combinedArray[4];
  }
};

module.exports = router;
