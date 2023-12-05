const { Router } = require("express");
const { validateFields } = require("../middlewares/validateFields");
const { check } = require("express-validator");
const { validRole } = require("../helpers/dbValidators");

const router = Router();
const {
  getUser,
  editUser,
  addUser,
  deleteUser,
} = require("../controllers/user.controllers");

router.get("/", getUser);
router.put("/:id", editUser);
router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  [
    check(
      "password",
      "El password es obligatorio de mas de 6 letras, debe contener al menos una mayuscula y un numero"
    )
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/),
  ],
  [check("correo", "El correo no es valido").isEmail()],
  [check("rol").custom(validRole)],

  // [check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"])],
  validateFields,
  addUser
);
router.delete("/:id", deleteUser);

module.exports = router;
