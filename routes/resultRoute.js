require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/getData", async (req, res) => {
  const data = res.locals.data || {};

  console.log(data);
});

module.exports = router;
