const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("http://localhost:3000/", {
    useNewUrlParser: true
  });
}

const Expense = mongoose.model("Expense", {
  user: String,
  description: String,
  amount: Number
});

const expenseReport = [];

/* Create - Read - Update - Delete */

/* 1- Create an expense report */
app.post("/", async (req, res) => {
  try {
    const newExpense = new Expense({
      user: req.body.user,
      description: req.body.description,
      amount: req.body.amount
    });
    await newExpense.save();
    return res.json({
      user: newExpense.user,
      description: newExpense.description,
      amount: newExpense.amount
    });
    // expenseReport.push(newExpense);
    // await newExpense.save();
    // res.json({ message: "Expense created!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* 2- Read : expense report list */

app.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    return res.json(expenses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/* 3- Update : total per user */

/* Ideas : find by ... Front-end ?*/
// app.get("/total", async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server started");
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
