const db = require("../config/db");
const { QueryTypes } = require("sequelize");
const JwtService = require("../services/JwtService");

const UserController = async (req, res) => {
  console.log("UserController");
  try {
    const { Phone_Number } = req.body;
    console.log(Phone_Number, req.body);
    if (!Phone_Number) {
      res.status(400).json({ message: "Phone Number is required" });
      return;
    }

    const user = await db.query("SELECT * FROM user WHERE Phone_Number = ?", [
      Phone_Number,
    ]);

    if (user.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const accessToken = JwtService.sign({
      Phone_Number: user[0][0].Phone_Number,
      Name: user[0][0].Name,
      user_id: user[0][0].user_id,
    });
    res.json({ users: user[0][0], accessToken });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const addUser = async (req, res, next) => {
  console.log("addUser");
  try {
    const { Name, GSTIN, Phone_Number, Company_Name, Email_id, Address } =
      req.body;

    if (!Name || !Phone_Number || !Company_Name || !Email_id || !Address) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await db.query(
      "INSERT INTO user (Name, GSTIN , Phone_Number,Company_Name,Email_id,Address) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, GSTIN, Phone_Number, Company_Name, Email_id, Address]
    );

    res.json({ user: user[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
const userData = async (req, res) => {
  console.log("userData");
  try {
    const { user_id } = req.body;
    if (!user_id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const user = await db.query(
      "SELECT us.*,COUNT(DISTINCT p.party_id) AS party_count,COUNT(DISTINCT i.item_id) AS item_count FROM billwisepro.user us LEFT JOIN billwisepro.party p ON p.user_id = us.user_id LEFT JOIN billwisepro.item i ON i.user_id = us.user_id WHERE us.user_id = ?",
      [user_id]
    );
    res.json({ user: user[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

const generate = async (req, res) => {
  try {
    const { Transaction_type, total_amount, discount_amount, amount_received } =
      req.body.transactions;
    const results = await db.query(
      "INSERT INTO payment (Transaction_type, total_amount, discount_amount, amount_received) VALUES (?, ?, ?, ?)",
      [Transaction_type, total_amount, discount_amount, amount_received]
    );
    let insertId;
    if (
      results.length > 0 &&
      results[0] &&
      typeof results[0] === "object" &&
      "insertId" in results[0]
    ) {
      insertId = results[0].insertId;
      console.log(insertId);
    } else {
      console.error("InsertId not found in the database response.");
    }
    const { Shipping_address, date, party_id, user_id, type } = req.body.sale;
    const saleResult = await db.query(
      "INSERT INTO sale_and_purchase (Shipping_address, Transaction_id, date, party_id, admin_id, type) VALUES (?, ?, ?, ?, ?, ?)",
      [Shipping_address, insertId, date, party_id, user_id, type]
    );
    let saleId;
    if (
      saleResult.length > 0 &&
      saleResult[0] &&
      typeof saleResult[0] === "object" &&
      "insertId" in saleResult[0]
    ) {
      saleId = saleResult[0].insertId;
      console.log(saleId);
    } else {
      console.error("InsertId not found in the database response.");
    }
    const Items = req.body.items;
    console.log(Items);
    Items.forEach(async (item) => {
      const { item_id, item_qty } = item;
      const sql =
        "INSERT INTO bill (sale_id, item_id, item_qty) VALUES (?, ?, ?)";
      const values = [saleId, item_id, item_qty];
      const response = await db.query(sql, values);
      console.log(response);
    });
    res
      .status(200)
      .json({ message: "Data inserted successfully", invoice_no: saleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  UserController,
  addUser,
  userData,
  generate,
};
