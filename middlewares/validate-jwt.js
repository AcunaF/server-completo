const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        msg: "Token inválido",
      });
    }
    res.status(500).json({
      msg: "Error del servidor, hable con el administrador",
    });
  }
};
module.exports = {
  jwtValidator,
};
