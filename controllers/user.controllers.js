const getUser = async (req, res) => {
    const query = req.query;
    const { nombre, apellido, edad } = req.body;

     res.json({
    msg: "get API controlador",
    
    nombre,
    apellido,
    edad,
   

  });
  console.log(query)
};

const editUser = async (req, res) => {

    const  id  = req.params.id;

  res.json({
    msg: "put API controlador",
    id
  });
};

const addUser = async (req, res) => {

  const { id,nombre, apellido, edad } = req.body;

  res.json({
    msg: "post  API controlador",
    id,
    nombre,
    apellido,
    edad,
  });
};

const deleteUser = async (req, res) => {

    const  id  = req.params.id;


  res.json({
    msg: "delete API controlador",
    id
  });
};

module.exports = {
  getUser,
  editUser,
  addUser,
  deleteUser,
};
