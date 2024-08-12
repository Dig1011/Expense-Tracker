const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const JWT_SECRET=require("../config");
const app = express();
const port = process.env.PORT || 5000;

const dbURI = 'mongodb+srv://digvijaykesare1123:Vijay%401123@cluster0.jthgjzy.mongodb.net/expense';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow specific origin
}));

// Use body-parser middleware
app.use(bodyParser.json());

// Expense Schema and Model
const expenseSchema = new Schema({
  name: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }//changed
});

const Expense = mongoose.model('Expense', expenseSchema);

// User Schema and Model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Authentication Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already taken' });
  }

  const user = new User({ username, password });
  await user.save();
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ message: 'User created successfully', token });
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

// Expense Routes
app.get('/expenses', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });//changed
    res.json(expenses);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/expenses', authMiddleware, async (req, res) => {
  const { name, amount, category } = req.body;

  const newExpense = new Expense({
    name,
    amount,
    category,
    userId: req.userId
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/expenses/:id', authMiddleware, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).send();
    }
    res.status(200).json(deletedExpense);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
