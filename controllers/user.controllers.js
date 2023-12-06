const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");

const getUser = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const user = await Usuario.find().skip(Number(desde)).limit(Number(limite));

  res.json({
    user,
  });
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;

  try {
    // TODO validar contra base de datos
    if (password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync(10);
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuariodb = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuariodb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar el usuario" });
  }
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
