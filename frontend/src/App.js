import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ExpenseForm from './components/add';
import Login from './components/login';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={<Login  />} />
        <Route path="/dash" component={<ExpenseForm />} />
      </Switch>
    </Router>
  );
}

export default App;
