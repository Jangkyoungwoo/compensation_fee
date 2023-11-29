require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();

const calArr = [];
let peopleFilterArr = [];
let ownerFilterArr = [];

router.post("/housingTransferExpenses", async (req, res, next) => {
  const headCount = req.body.headCount;
  const owner = req.body.owner;
  const data = { headCount: headCount, owner: owner };
  try {
    const API_KEY = process.env.API_KEY + "=";
    const houseHoldsTotalIncomeAndExpenditureUrl = `https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U027/2/1/20231106103754&prdSe=Y&newEstPrdCnt=1`;
    const houseRes = await axios.get(houseHoldsTotalIncomeAndExpenditureUrl);
    calMonth(houseRes.data);
    filterPeople(headCount);
    filterOwner(headCount, owner);
    data.result = ownerFilterArr[0];
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//개월수별 계산
const calMonth = (val) => {
  //연도별일 때 parameter year
  let newArr;
  newArr = val.map((data) => ({
    people: data.C1_NM,
    oneMon: Math.round(data.DT),
    twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
    fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
  }));
  let sixMan, sevenMan;
  const fiveVal = Math.round(Number(val[4].DT));
  const twoVal = Math.round(Number(val[1].DT));
  sixMan = {
    people: "6인",
    oneMon: Math.round(fiveVal + ((fiveVal - twoVal) / 3) * 1),
    twoMon: Math.round((fiveVal + (fiveVal - twoVal) / 3) * 2),
    fourMon: Math.round((fiveVal + (fiveVal - twoVal) / 3) * 4),
  };
  newArr.push(sixMan);
  sevenMan = {
    people: "7인",
    oneMon: Math.round(fiveVal + ((fiveVal - twoVal) / 3) * 2),
    twoMon: Math.round((fiveVal + ((fiveVal - twoVal) / 3) * 2) * 2),
    fourMon: Math.round((fiveVal + ((fiveVal - twoVal) / 3) * 2) * 4),
  };
  newArr.push(sevenMan);
  calArr.push(newArr);
};
//인구별 필터링
const filterPeople = (people) => {
  if (people === 1) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "1인"));
  } else if (people === 2) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "2인"));
  } else if (people === 3) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "3인"));
  } else if (people === 4) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "4인"));
  } else if (people === 5) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "5인이상"));
  } else if (people === 6) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "6인"));
  } else if (people === 7) {
    peopleFilterArr.push(calArr[0].filter((arr) => arr.people === "7인"));
  }
};
//소유구분별 필터링
const filterOwner = (people, owner) => {
  let res;
  switch (owner) {
    case "owner":
      res = calArr[0].map((data) => data.twoMon);
      if (res.length > 0) {
        switch (people) {
          case 1:
            ownerFilterArr.push(res[0]);
            break;
          case 2:
            ownerFilterArr.push(res[1]);
            break;
          case 3:
            ownerFilterArr.push(res[2]);
            break;
          case 4:
            ownerFilterArr.push(res[3]);
            break;
          case 5:
            ownerFilterArr.push(res[4]);
            break;
          case 6:
            ownerFilterArr.push(res[5]);
            break;
          case 7:
            ownerFilterArr.push(res[6]);
            break;
        }
      }
      break;
    case "newer":
      res = calArr[0].map((data) => data.fourMon);
      if (res.length > 0) {
        switch (people) {
          case 1:
            ownerFilterArr.push(res[0]);
            break;
          case 2:
            ownerFilterArr.push(res[1]);
            break;
          case 3:
            ownerFilterArr.push(res[2]);
            break;
          case 4:
            ownerFilterArr.push(res[3]);
            break;
          case 5:
            ownerFilterArr.push(res[4]);
            break;
          case 6:
            ownerFilterArr.push(res[5]);
            break;
          case 7:
            ownerFilterArr.push(res[6]);
            break;
        }
      }
      break;
  }
};

module.exports = router;
