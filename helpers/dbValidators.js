const Role = require("../models/role");

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

module.exports = {
  validRole,
};
