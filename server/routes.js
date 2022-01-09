const express = require("express");
const multer = require("multer");

const signup = require("./controllers/signup.controller");
const login = require("./controllers/login.controller");
const addAccount = require("./controllers/addAccount");
const findAllAccount = require("./controllers/findAllAccount");
const addIncomeExpense = require("./controllers/addIncomeExpense");
const updateBalance = require("./controllers/updateBalance");
const accountsArithmetics = require("./controllers/accountsArithmetics");
const historyArithmetics = require("./controllers/historyArithmetics");
const changePassword = require("./controllers/changePassword");
const uploadProfilePicture = require("./controllers/uploadProfilePicture");
const deleteAccount = require("./controllers/deleteAccount")

const upload = require("./config/multer");

const router = express.Router();

router.get("/", (req, res) => {
   res.send(`
      <h1 style="font-size:80">EXPENSE TRACKER SERVER</h1>
   `);
});

router.post("/signup", signup);

router.post("/login", login);
router.post("/addAccount", addAccount);
router.post("/findAllAccount", findAllAccount);
router.post("/addIncomeExpense", addIncomeExpense);
router.post("/updateBalance", updateBalance);
router.get("/accountsArithmetics", accountsArithmetics);
router.get("/historyArithmetics", historyArithmetics);
router.post("/changePassword", changePassword);
router.post("/deleteAccount", deleteAccount)

router.post(
   "/uploadProfilePicture",
   upload.single("profileImage"),
   uploadProfilePicture
);

module.exports = router;
