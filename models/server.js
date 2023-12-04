const express = require("express");

const cors = require("cors");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/users";

    // Middlewares
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
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

    this.app.use(this.usuariosPath, require('../routes/user.routes'));
  
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
