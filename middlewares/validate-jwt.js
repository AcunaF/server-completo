const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const jwtValidator = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer usuario que corresponde al uid
const usuario = await Usuario.findById(uid);

if(!usuario.estado) {
  return res.status(401).json({
    msg:"Token no valido - usuario false"
  })
}

    console.log(Usuario)

    req.usuario = usuario;

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
