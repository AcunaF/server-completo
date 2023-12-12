const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const { generateJwt } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe y obtener el usuario
    const usuario = await Usuario.findOne({ correo: correo.toLowerCase() });

    if (!usuario) {
      return res.status(400).json({
        msg: "Email o contraseña incorrectos",
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "La cuenta no está activa",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (validPassword) {
      console.log("validPassword", validPassword);
      console.log("pass bdd", password);
      return res.status(400).json({
        msg: "Email o contraseña incorrectos",
      });
    }
    const token = await generateJwt(usuario.id);

    res.json({
      msg: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error del servidor, hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
