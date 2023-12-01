require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const movingExpensesRouter = require("./routes/movingExpensesRoute");
const housingTransferExpensesRouter = require("./routes/housingTransferExpenses");
const relocationSettlementRouter = require("./routes/relocationSettlement");
const resultRoute = require("./routes/resultRoute");
const connection = require("./db");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/housingTransfer", housingTransferExpensesRouter);
app.use("/movingExpenses", movingExpensesRouter);
app.use("/relocationSettlement", relocationSettlementRouter);
app.use(resultRoute);

app.use(express.static(path.join(__dirname, "../Yuc_statistics/build")));

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
