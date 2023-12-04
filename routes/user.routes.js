const { Router } = require("express");
const { getUser,editUser,addUser,deleteUser  } = require("../controllers/user.controllers");
const router = Router();

router.get('/',getUser)
router.put('/:id',editUser)
router.post("/",addUser);
router.delete('/:id',deleteUser)



module.exports = router;
