const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/rudrani-veggies", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Order schema
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  paymentMethod: String,
  cart: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// Razorpay instance (replace with your keys)
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY",
  key_secret: "YOUR_RAZORPAY_SECRET"
});

// API — Create Order
app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // in paisa
    currency: "INR",
    receipt: "receipt_order_" + Date.now()
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API — Save Order
app.post("/save-order", async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();

  // send email confirmation
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "hr@prconnects.world", pass: "YOUR_EMAIL_PASSWORD" }
  });

  await transporter.sendMail({
    from: "hr@prconnects.world",
    to: req.body.email,
    subject: "Rudrani Veggies - Order Confirmation",
    text: `Thank you ${req.body.name}, your order has been placed successfully!`
  });

  res.json({ message: "✅ Order saved and email sent!" });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
