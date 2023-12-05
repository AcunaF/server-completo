const express = require("express");
const { dbConnection } = require("../database/config.db");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/users";

    //conectar a base de datos
    this.dbConnect();

    // Middlewares
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //directorio publico
    this.app.use(express.static("public"));

    //lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
