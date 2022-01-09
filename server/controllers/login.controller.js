const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
   const { username, password } = req.body;

   try {
      await User.findOne({ username }).then((user) => {
         if (!user) {
            const status = "noUser";
            res.send({ status, message: "user not found" });
         }
         if (user) {
            bcrypt.compare(password, user.password, (err, isMatched) => {
               if (!isMatched) {
                  const status = "wrongPassword";
                  const message = "The password you input is incorrect";
                  res.send({ status, message });
               }
               if (isMatched) {
                  const status = "success";
                  res.send({ status, user });
               }
            });
         }
      });
   } catch (err) {
      const status = "failed";
      res.send({ status, err });
   }
};

module.exports = Login;
