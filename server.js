require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const movingExpenses = require("./routes/movingExpensesRoute");
const housingTransferExpenses = require("./routes/housingTransferExpenses");
const relocationSettlement = require("./routes/relocationSettlement");
const resultRoute = require("./routes/resultRoute");
const connection = require("./db");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../Yuc_statistics/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Yuc_statistics/build", "index.html"));
});
app.use(housingTransferExpenses);
app.use(movingExpenses);
app.use(relocationSettlement);
app.use(resultRoute);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
