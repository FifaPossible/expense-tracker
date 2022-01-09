const User = require("../models/user.model");

const Signup = async (req, res) => {
   const { username, password, email } = req.body;
   try {
      await User.create({ username, password, email }).then((user) => {
         const status = "success";
         res.send({ status, user });
      });
   } catch (e) {
      if (e.code === 11000 && e.keyValue.username === username) {
         return res.status(201).send("username is already taken");
      } else if (e.code === 11000 && e.keyValue.email === email) {
         return res.status(201).send("Email is already taken");
      }
   }
};

module.exports = Signup;
