const mysql = require("mysql");

// Khoi tao ket noi
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "zaraProject",
  password: "12345678",
});

connection.connect((err) => {
  if (err) {
    console.log("Kết nối thất bại", err);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connection;
