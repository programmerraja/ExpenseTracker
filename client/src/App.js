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

import ProtectedRoute from "./utils/Route"

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/signin"} element={<Signin/>}/>
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path={"/transaction/:monthId"} element={<ExpenseDetail/>}/>
          <Route exact  path={"/"} element={<Dashboard/>}/>
       </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
