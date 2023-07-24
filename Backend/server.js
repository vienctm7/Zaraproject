const express = require("express");
const server = express();
const port = 8000;
const morgan = require("morgan");
const connection = require("./connection/connectionMySQL");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { checkExist } = require("./midleware/auth.midleware");
// const { checkNoExist } = require("./connection/connectionMySQL")

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan());
server.use(cors());

server.get("/api/v1/register", (req, res) => {
  // thao tác với dữ liệu trong db
  // câu lệnh query lấy tất cả dưc liệu trong bảng user
  const query = "SELECT * FROM user ";

  connection.query(query, (err, results) => {
    if (err) {
      console.log("Kết nối thất bại !!!", err);
      res.status(500).json({
        status: "error",
        err,
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: results,
      });
    }
  });
});

server.post("/api/v1/register", checkExist, (req, res) => {
  console.log(req.body);
  const { email, passwords, phone, name, repeatpassword, role } = req.body;

  const userId = uuidv4();
  // Mã hóa mật khẩu
  bcrypt.hash(passwords, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    } else {
      // đối tượng user mới
      const newUser = [userId, email, hash, phone, name, repeatpassword, role];
      console.log(newUser);
      // Câu lệnh query
      const query =
        "INSERT INTO user(userId, email, passwords, phone, name, repeatpassword, role) VALUES (?,?,?,?,?,?, ?)";
      // Kêt nối
      connection.query(query, newUser, (err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: err,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Thêm mới thành công",
          });
        }
      });
    }
  });
});

// API đăng nhập
server.post("/api/v1/login", (req, res) => {
  const { email, passwords } = req.body;
  // Lấy dữ liệu từ database
  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: err,
      });
    } else {
      // Kiểm tra kết quả
      if (result.length == 0) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không đúng",
        });
      } else {
        // Nếu như có tồn tại email
        const user = result[0];
        // So sánh mật khẩu từ client với server
        bcrypt.compare(passwords, user.passwords, (err, isMatch) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              status: 500,
              message: err,
            });
          } else {
            if (!isMatch) {
              return res.status(400).json({
                message: "Email hoặc mật khẩu không đúng",
              });
            } else {
              // Tạo ra một chuỗi token
              const token = jwt.sign({ id: user.userId }, "your_srcet_key", {
                expiresIn: "1h",
              });
              return res.status(200).json({
                status: 200,
                message: "Đăng nhập thành công",
                data: user,
                token,
              });
            }
          }
        });
      }
    }
  });
});

// API lấy tất cả bản ghi
server.get("/api/v1/product", (req, res) => {
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = "select * from product";

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

// API lấy thông tin một bản ghi theo Id
server.get("/api/v1/product/:id", (req, res) => {
  let { id } = req.params;
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = `select * from product where productId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        data: result,
      });
    }
  });
});

// API xóa một bản ghi theo Id
server.delete("/api/v1/product/:id", (req, res) => {
  let { id } = req.params;
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = `delete from product where productId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Xóa thành công",
      });
    }
  });
});

// API thêm mới một bản ghi

server.post("/api/v1/product", (req, res) => {
  // Lấy dữ liệu từ body
  console.log("111", req.body);
  const productId = uuidv4();
  const {
    name,
    price,
    image,
    image1,
    image2,
    size,
    materialdesc,
    materialtype,
    care,
    origin,
    color,
    categoryId,
    productTypeId,
  } = req.body;
  // Tạo một dữ liệu mới
  const newProduct = [
    productId,
    name,
    price,
    image,
    image1,
    image2,
    size,
    materialdesc,
    materialtype,
    care,
    origin,
    color,
    categoryId,
    productTypeId,
  ];
  console.log(newProduct);
  // Viết câu lệnh query string
  const queryString =
    "insert into product( productId ,name, price, image, image1, image2, size, materialdesc, materialtype, care, origin, color, categoryId, productTypeId ) values ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  connection.query(queryString, newProduct, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        message: "Thêm mới thành công",
      });
    }
  });
});

// API sửa thông tin một bản ghi theo Id
server.put("/api/v1/product/:id", (req, res) => {
  // Lấy id từ params
  const { id } = req.params;
  // Lấy dữ liệu từ body
  const {
    name,
    price,
    image,
    image1,
    image2,
    size,
    materialdesc,
    materialtype,
    care,
    origin,
    color,
    categoryId,
    productTypeId,
  } = req.body;
  // Tạo một dữ liệu mới
  const newProduct = [
    name,
    price,
    image,
    image1,
    image2,
    size,
    materialdesc,
    materialtype,
    care,
    origin,
    color,
    categoryId,
    productTypeId,
    id,
  ];

  // Viết câu lệnh query string
  const queryString =
    "update product set name=?, price=?, image=?, image1=?, image2=?, size=?, materialdesc=?, materialtype=?, care=?, origin=?, color=?, categoryId=?, productTypeId=? WHERE productId=?";

  connection.query(queryString, newProduct, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

// API lấy tất cả bản ghi cart
server.get("/api/v1/cart", (req, res) => {
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString =
    "SELECT c.cartId, c.userId, p.productId, p.name, p.price, c.quantity, p.image,c.quantity FROM cart as c JOIN product as p ON c.productId = p.productId";

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

// API thêm mới một bản ghi

server.post("/api/v1/cart", checkExistProduct, (req, res) => {
  // Lấy dữ liệu từ body
  console.log("111", req.body);
  const cartId = uuidv4();
  const { productId, userId, quantity } = req.body;
  // Tạo một dữ liệu mới
  const newCart = [cartId, productId, userId, quantity];
  // Viết câu lệnh query string
  const queryString =
    "insert into cart( cartId ,productId, userId, quantity) values ( ?, ?, ?, ?)";
  connection.query(queryString, newCart, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        message: "Thêm mới thành công",
      });
    }
  });
});

// API sửa thông tin một bản ghi theo Id
server.put("/api/v1/cart/:id", (req, res) => {
  // Lấy id từ params
  const { id } = req.params;
  // Lấy dữ liệu từ body
  const { quantity } = req.body;
  // Tạo một dữ liệu mới
  const newCart = [quantity, id];

  // Viết câu lệnh query string
  const queryString = "update cart set quantity=?  WHERE cartId=?";

  connection.query(queryString, newCart, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

// API xóa một bản ghi theo Id
server.delete("/api/v1/cart/:id", (req, res) => {
  let { id } = req.params;
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = `delete from cart where cartId='${id}'`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Xóa thành công",
      });
    }
  });
});
server.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
