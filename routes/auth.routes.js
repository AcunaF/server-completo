const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],

  login
);

module.exports = router;
