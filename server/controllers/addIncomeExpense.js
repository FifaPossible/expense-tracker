const IncomeExpense = require("../models/incomeExpense");
const Account = require("../models/account.model");

const addIncomeExpense = async (req, res) => {
   const { amount, accountName, accountId, category, type, user, color } =
      req.body;

   try {
      await IncomeExpense.create({
         user: user._id,
         amount,
         accountName,
         accountId,
         category,
         type,
         color,
      }).then((incomeExpense) => {
         const status = "success";
         res.send({ status, incomeExpense });
      });
   } catch (err) {
      console.log("Error while saving:    ", err);
      const status = "failed";
      res.send({ status, err });
   }
};

module.exports = addIncomeExpense;
