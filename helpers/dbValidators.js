const Role = require("../models/role");
const Usuario = require("../models/usuario");

const validRole = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BDD`);
  }
};

const validEmail = async (correo = "") => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo ${correo} ya esta registrado en la BDD`);
  }
};

const validIdUSer = async (id = "") => {
  const existId = await Usuario.findById(id);
  if (!existId) {
    throw new Error(`El id no existe ${id} `);
  }
};

module.exports = {
  validRole,
  validEmail,
  validIdUSer,
};
