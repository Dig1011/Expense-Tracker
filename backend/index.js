const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../backend/db'); // Ensure this path is correct

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

// Route to add a new expense
app.post('/expense', async (req, res) => {
  try {
    const { text, amount } = req.body;
    const newExpense = new Expense({ text, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to mark an expense as completed
app.put('/completed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete an expense
app.delete('/expense/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(deletedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
