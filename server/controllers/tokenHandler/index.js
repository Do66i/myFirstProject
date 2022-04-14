require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return undefined;
    }

    const token = authorization.split(" ")[1];
    try {
      const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);
      return userInfo;
    } catch (err) {
      return undefined;
    }
  },
};
