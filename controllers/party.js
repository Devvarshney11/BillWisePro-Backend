const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const getParty = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      res.status(400).json({ message: "User Id is required" });
      return;
    }
    const parties = await db.query("SELECT * FROM party where user_id = ?", [
      user_id,
    ]);

    res.json({ parties: parties[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
const postParty = async (req, res) => {
  console.log("addUser");
  try {
    const {
      name,
      GSTIN,
      phone_number,
      email_id,
      address,
      notice_period,
      limit_amount,
      to_get,
      to_pay,
      user_id,
    } = req.body;
    if (!name || !phone_number || !address || !user_id) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const user = await db.query(
      "INSERT INTO party (name,GSTIN,phone_number,email_id,address,notice_period,limit_amount,to_get,to_pay,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        GSTIN,
        phone_number,
        email_id,
        address,
        notice_period,
        limit_amount,
        to_get,
        to_pay,
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
const getSingleParty = async (req, res) => {
  try {
    const params = req.params;
    if (!params.id) {
      res.status(400).json({ message: "Party Id is required" });
      return;
    }
    const parties = await db.query("SELECT * FROM party where party_id = ?", [
      params.id,
    ]);

    res.json({ parties: parties[0] });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
module.exports = {
  getParty,
  postParty,
  getSingleParty,
};
