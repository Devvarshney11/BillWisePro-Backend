const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const getPartySingleSale = async (req, res) => {
  try {
    const sale_id = req.params;
    if (!sale_id) {
      res.status(400).json({ message: "Sale ID is required" });
      return;
    }
    console.log(sale_id);
    const saleInvoice = await db.query(
      "SELECT sp.id as invoice_no,sp.date,sp.type,py.total_amount,py.discount_amount,py.amount_received,py.Transaction_type,p.name as p_name,p.GSTIN as p_gst,p.address as p_add,p.phone_number as p_phno,us.Company_Name,us.Phone_Number FROM billwisepro.sale_and_purchase sp JOIN billwisepro.payment py ON sp.Transaction_id = py.Transaction_Id JOIN billwisepro.party p ON sp.party_id = p.party_id JOIN billwisepro.user us ON sp.admin_id = us.user_id WHERE sp.id = ?",
      [sale_id.id]
    );
    const query = `
    SELECT
      i.Item_id AS item_id,
      i.Name AS item_name,
      i.Sale_price,
      i.Tax,
      b.item_qty
    FROM
      billwisepro.bill b
    JOIN
      billwisepro.item i ON i.Item_id = b.item_id
    WHERE
      b.sale_id = ?
  `;
    const result = await db.query(query, [sale_id.id]);
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
