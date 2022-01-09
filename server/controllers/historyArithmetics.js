const IncomeExpense = require("../models/incomeExpense");

const historyArithmetics = async (req, res) => {
   try {
      const history = await IncomeExpense.find({});

      res.status(200).send(history);
   } catch (err) {
      console.log("Error while fetching accounts: ", err);
   }
};

module.exports = historyArithmetics;
