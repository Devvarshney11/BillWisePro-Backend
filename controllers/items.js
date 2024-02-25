const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const getItems = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      res.status(400).json({ message: "User Id is required" });
      return;
    }
    const item = await db.query("SELECT * FROM item where user_id = ?", [
      user_id,
    ]);

    res.json({ items: item[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
const postItems = async (req, res) => {
  console.log("addUser");
  try {
    const {
      Item_HSN,
      Category,
      Sale_price,
      Cost_price,
      Tax,
      Min_Stock,
      Quantity,
      Name,
      user_id,
    } = req.body;
    console.log(req.body);
    console.log(Sale_price);
    if (
      !Item_HSN ||
      !Category ||
      !Sale_price ||
      !Cost_price ||
      !Tax ||
      !Min_Stock ||
      !Quantity ||
      !Name ||
      !user_id
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await db.query(
      "INSERT INTO item (Item_HSN,Category,Sale_price,Cost_price,Tax,Min_Stock,Quantity,Name,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        Item_HSN,
        Category,
        Sale_price,
        Cost_price,
        Tax,
        Min_Stock,
        Quantity,
        Name,
        user_id,
      ]
    );
    res.json({ user: user[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
module.exports = {
  getItems,
  postItems,
};
