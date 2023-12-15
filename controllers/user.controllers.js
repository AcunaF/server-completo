const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");

const getUser = async (req, res) => {
  //const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  try {
    const [totalUsuarios, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query),

      //  Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
      totalUsuarios,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
    });
  }
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
  try {
    const { id } = req.params;
    //  const usuario = await Usuario.findByIdAndDelete(id); elimina el usuario de la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); // cambia el estado del usuario a false
    const usuarioAutenticado = req.usuario;

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({
      msg: "Usuario eliminado con éxito",
      usuario,
      usuarioAutenticado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  getUser,
  editUser,
  addUser,
  deleteUser,
};
