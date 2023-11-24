require("dotenv").config();
const express = require("express");
const movingExpenses = require("./routes/movingExpensesRoute");
const app = express();
const port = process.env.PORT || 8080;

/*app.post("/", (req, res) => {
  const {
    body: {
      name,
      location,
      claiment,
      price,
      dividedOwner,
      memberNum,
      width,
      share,
      permission,
      usage,
      note,
      approvalDate,
      transferDate,
      settlementDate,
      ownerDate,
      newerDate,
      disagreeNewerDate,
      movingDate,
    },
  } = req;
  res.send();
});*/

app.use(movingExpenses);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
