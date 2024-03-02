const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const getPartyTransactions = async (req, res) => {
  try {
    const { party_id } = req.body;
    console.log(req.body);
    if (!party_id) {
      res.status(400).json({ message: "Party ID is required" });
      return;
    }
    const transactions = await db.query(
      "SELECT py.Transaction_id, sp.date, py.Transaction_type,py.total_amount,py.amount_received,py.discount_amount,sp.id as sale_id FROM billwisepro.sale_and_purchase sp JOIN billwisepro.payment py ON sp.Transaction_id = py.Transaction_Id WHERE sp.party_id = ?",
      [party_id]
    );
    res.json({ transactions: transactions[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

module.exports = { getPartyTransactions };
