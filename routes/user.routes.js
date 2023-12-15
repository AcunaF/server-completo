const { Router } = require("express");
const { check } = require("express-validator");
const {
  validRole,
  validEmail,
  validIdUSer,
} = require("../helpers/dbValidators");

const { validateFields } = require("../middlewares/validateFields");
const { jwtValidator } = require("../middlewares/validate-jwt");

const {
  getUser,
  editUser,
  addUser,
  deleteUser,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getUser);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(validIdUSer),
    check("rol").custom(validRole),
    validateFields,
  ],
  editUser
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio de más de 6 letras, debe contener al menos una mayúscula y un número"
    )
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(validEmail),
    check("rol").custom(validRole),
    validateFields,
  ],
  addUser
);

router.delete(
  "/:id",
  [
    jwtValidator,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(validIdUSer),
  ],
  deleteUser
);

module.exports = router;
