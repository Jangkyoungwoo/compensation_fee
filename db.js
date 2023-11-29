const mysql = require("mysql2/promise");

const connectionInfo = {
  host: "localhost",
  user: "kyoungwoo",
  password: "1248",
  port: 3306,
  database: "compensation_fee", // 스키마 이름
};

const connectMySQL = async () => {
  const connect = await mysql.createConnection(connectionInfo);
  connect.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err);
    } else {
      console.log("Connected to MySQL database");
    }
  });
  console.log("connected");
  return connect;
};
module.exports = connectMySQL;
