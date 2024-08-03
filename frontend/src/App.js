import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import ExpenseForm from './components/add';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/"  element={<Login  />} />
        <Route path="/dash" element={<ExpenseForm />} />
        <Route path="*" element={<Navigate to="/dash" />} />
      </Routes>
    </Router>
  );
}

export default App;
