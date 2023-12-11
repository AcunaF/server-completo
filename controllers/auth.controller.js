const { response } = require("express");

const login = async (req, res = response) => {
  res.json({
    msg: "login ok",
  });
};

module.exports = {
  login,
};
