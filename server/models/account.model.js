const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./user.model");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: User,
      },
      name: {
         type: String,
         required: true,
      },
      balance: {
         type: Number,
         required: true,
      },
      currency: {
         type: String,
         required: true,
      },
      color: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
