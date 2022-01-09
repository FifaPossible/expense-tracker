const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const changePassword = (req, res) => {
   const { password, newPassword, user } = req.body;

   bcrypt.compare(password, user.password, (err, isMatched) => {
      if (err) {
         console.log(err);
      }
      if (!isMatched) {
         res.status(201).send("You inputed the wrong password");
      }
      if (isMatched) {
         bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
            if (err) {
               console.log(err);
            }
            if (hashedPassword) {
               try {
                  const update = await User.findOneAndUpdate(
                     { _id: user._id },
                     { password: hashedPassword },
                     { new: true }
                  );
                  res.status(200).send("Password updated successfully");
               } catch (e) {
                  console.log(e);
               }
            }
         });
      }
   });
};

module.exports = changePassword;
