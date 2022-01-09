const Account = require("../models/account.model");

const deleteAccount = async (req, res) => {
   const { accountId } = req.body;

   try {
      await Account.findByIdAndRemove(accountId);
      res.status(200).send("Account deleted successfully");
   } catch (e) {
      console.log(e);
   }
};

module.exports = deleteAccount;
