const IncomeExpense = require("../models/incomeExpense");

const accountsArithmetics = async (req, res) => {
   try {
      const analysis = await IncomeExpense.aggregate([
         {
            $group: {
               _id: {
                  user: "$user",
                  type: "$type",
                  category: "$category",
                  accountId: "$accountId",
                  accountName: "$accountName",
                  color: "$color",
               },
               total: {
                  $sum: "$amount",
               },
            },
         },
      ]);

      res.status(200).send(analysis);
   } catch (err) {
      console.log("Error while fetching accounts: ", err);
   }
};

module.exports = accountsArithmetics;
