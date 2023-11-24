require("dotenv").config();
const app = express();
const axios = require("axios");

const obj = {};
app.get("/houseHoldsTotalIncomeAndExpenditure", async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY + "=";
    const houseHoldsTotalIncomeAndExpenditureUrl = `https://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U027/2/1/20231106103754&prdSe=Y&newEstPrdCnt=1`;
    const houseRes = await axios.get(houseHoldsTotalIncomeAndExpenditureUrl);
    res.json(houseRes.data);
    obj = houseRes.data;
    console.log(obj);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
