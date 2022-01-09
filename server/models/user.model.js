const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "The username field is need"],
         unique: [true, "Username taken"],
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: "Two users cannot have the same email ({VALUE})",
      },
      profilePicture: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

UserSchema.pre("save", function (next) {
   const user = this;
   bcrypt.hash(user.password, 10, (err, hashedPassword) => {
      if (err) {
         next(err);
      }
      user.password = hashedPassword;
      next();
   });
});

const User = mongoose.model("User", UserSchema);
User.on("index", (err) => {
   if (err) {
      return err;
   }
});

module.exports = User;
