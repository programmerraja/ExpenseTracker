import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';


import Dashboard from "./pages/Dashboard";
import ExpenseDetail from "./pages/ExpenseDetail";

import Signin from "./pages/Signin";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Dashboard/>}/>
        <Route exact path={"/transaction/:monthId"} element={<ExpenseDetail/>}/>
        <Route exact  path={"/signin"} element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
