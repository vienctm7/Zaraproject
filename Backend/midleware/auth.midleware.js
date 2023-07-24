const database = require("../connection/connectionMySQL");

checkExist = async (req, res, next) => {
  let { email } = req.body;

  try {
    const query = "SELECT * FROM user WHERE email = ?";
    database.query(query, [email], (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Email đã tồn tại",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

checkExistProduct = async (req, res, next) => {
  let { productId } = req.body;

  try {
    const query = "SELECT * FROM cart WHERE productId = ?;";
    database.query(query, [productId], (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "productId đã tồn tại",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports={ checkExist, checkExistProduct }