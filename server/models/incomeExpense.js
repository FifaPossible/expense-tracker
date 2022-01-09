const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./user.model");
const Account = require("./account.model");

const Schema = mongoose.Schema;

const IncomeExpenseSchema = new Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: User,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      accountName: {
         type: String,
         required: true,
      },
      accountId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: Account,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      color: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

const IncomeExpense = mongoose.model("IncomeExpense", IncomeExpenseSchema);

module.exports = IncomeExpense;
