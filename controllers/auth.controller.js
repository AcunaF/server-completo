const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo: correo.toLowerCase() });

    if (!usuario) {
      return res.status(400).json({
        msg: "Email / Password no son correctos - correo",
      });
    }

    // Verificar si el usuario está activo

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Email / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Email / Password no son correctos - password",
      });
    }

    // Generar el JWT

    res.json({
      msg: "login ok",
      correo,
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
