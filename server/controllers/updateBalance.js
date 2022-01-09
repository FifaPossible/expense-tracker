const Account = require("../models/account.model");

const updateBalance = async (req, res) => {
   const { amount, accountName, accountId, category, type, user, color } =
      req.body;
   const amountToNumber = parseInt(amount);
   try {
      const account = await Account.findOne({ _id: accountId });
      await Account.findOneAndUpdate(
         { _id: accountId },
         type === "Income"
            ? { balance: account.balance + amountToNumber }
            : { balance: account.balance - amountToNumber }
      ).then(() => res.status(200));
   } catch (err) {
      console.log("Error updating balance :", err);
   }
};

module.exports = updateBalance;
