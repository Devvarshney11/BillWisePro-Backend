const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const getPartySingleSale = async (req, res) => {
  try {
    const { sale_id } = req.body;
    if (!sale_id) {
      res.status(400).json({ message: "Sale ID is required" });
      return;
    }
    const saleInvoice = await db.query(
      "SELECT sp.*,py.* FROM billwisepro.sale_and_purchase sp JOIN billwisepro.payment py ON sp.Transaction_id = py.Transaction_Id WHERE sp.id = ?",
      [sale_id]
    );
    const items = await db.query(
      "SELECT item_id FROM billwisepro.bill WHERE sale_id = ?",
      [sale_id]
    );

    const itemIds = items[0].map((item) => item.item_id);
    const query = `SELECT * FROM billwisepro.item WHERE Item_id IN (${itemIds.join(
      ", "
    )})`;
    const result = await db.query(query);
    res.json({
      saleInvoice: saleInvoice[0],
      items: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

module.exports = { getPartySingleSale };
