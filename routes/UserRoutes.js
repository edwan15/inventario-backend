const express = require("express")
const {
  registerUser,
  loginUser,
  logout,
  loginStatus,
  getUser,
  updateUser
} = require("../controllers/UserController");
const protect = require("../middleware/authMiddle");

const router = express.Router();


router.post("/register" , registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.get("/loggedin", loginStatus);
router.get("/getuser", protect, getUser);
router.patch("/updateuser", protect, updateUser);




module.exports = router;





