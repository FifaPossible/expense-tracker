const Account = require("../models/account.model");

const addAccount = async (req, res) => {
   const { name, balance, currency, color, user } = req.body;

   try {
      await Account.create({ user, name, balance, currency, color }).then(
         (account) => {
            if (account) {
               const status = "success";
               res.send({ status, account });
            }
         }
      );
   } catch (err) {
      const status = "failed";
      res.send({ status, err });
   }
};

module.exports = addAccount;
