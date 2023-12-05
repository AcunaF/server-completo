const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUser = async (req, res) => {
  const query = req.query;
  const { nombre, apellido, edad } = req.body;

  res.json({
    msg: "get API controlador",

    nombre,
    apellido,
    edad,
  });
  console.log(query);
};

const editUser = async (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API controlador",
    id,
  });
};

const addUser = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  try {
    // Crear instancia del modelo Usuario y asignar valores
    const usuario = new Usuario({
      nombre,
      correo,
      password: bcryptjs.hashSync(password, salt),
      rol,
    });

    // Guardar en la base de datos
    await usuario.save();

    res.json({
      msg: "Usuario creado exitosamente",
      usuario,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Manejar errores de validación de Mongoose
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res
        .status(400)
        .json({ mensaje: "Error de validación", errores: validationErrors });
    } else {
      console.error(error);
      res.status(500).json({ mensaje: "Error al crear el usuario" });
    }
  }
};

module.exports = {
  addUser,
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "delete API controlador",
    id,
  });
};

module.exports = {
  getUser,
  editUser,
  addUser,
  deleteUser,
};
