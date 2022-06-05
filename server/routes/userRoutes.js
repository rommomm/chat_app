const {
  signup,
  signin,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/sign-up", signup);

router.post("/sign-in", signin);

router.get("/allusers/:id", getAllUsers);

module.exports = router;
