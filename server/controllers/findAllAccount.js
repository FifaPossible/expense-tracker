const Account = require("../models/account.model");

const findAllAccount = async (req, res) => {
   const { user } = req.body;
   try {
      await Account.find({ user: user._id }).then((accounts) => {
         if (accounts) {
            const status = "success";
            res.send({ status, accounts });
         }
      });
   } catch (err) {
      console.log("Error while fetching accounts: ", err);
   }
};

module.exports = findAllAccount;
