import React, { useState, useEffect } from 'react';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: ''
  });
  const [expenses, setExpenses] = useState([]); // State to store expenses

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('Expense added successfully');
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: ''
      });
      fetchExpenses(); // Fetch updated list of expenses after adding
    } else {
      console.error('Failed to add expense');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      console.log('Expense deleted successfully');
      fetchExpenses(); // Fetch updated list of expenses after deletion
    } else {
      console.error('Failed to delete expense');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4"><b>Expense Tracker</b></h2>
      <div className="w-96 container mx-auto bg-white p-4 rounded-lg shadow-md w-80">
        <h4 className="text-gray-500 uppercase">Your Balance</h4>
        <h1 id="balance" className="text-3xl font-semibold">
          ${expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}
        </h1>
        <div className="inc-exp-container flex justify-between mt-4">
          <div>
            <h4 className="text-gray-500 uppercase">Income</h4>
            <p id="money-plus" className="text-green-500 font-semibold">
              +${expenses.filter(expense => expense.amount > 0).reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}
            </p>
          </div>
          <div>
            <h4 className="text-gray-500 uppercase">Expense</h4>
            <p id="money-minus" className="text-red-500 font-semibold">
              -${Math.abs(expenses.filter(expense => expense.amount < 0).reduce((acc, expense) => acc + expense.amount, 0)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Add Expense
        </button>
      </form>
      <div className="mt-6 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="flex text-xl font-bold mb-4 text-center text-gray-700 border-b-2 pb-2">History</h2>
        <ul>
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center mb-3 p-2 border border-gray-200 rounded-lg"
            >
              <span
                className={`text-lg ${
                  expense.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {expense.name}: ${expense.amount.toFixed(2)}
              </span>
              <button
                className="text-red-600 font-semibold ml-4 hover:text-red-800"
                onClick={() => handleDelete(expense._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ExpenseForm;
