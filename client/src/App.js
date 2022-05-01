import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';


import Home from "./pages/Home";
import Signin from "./pages/Signin";

import API from "./utils/API";



import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact  path={"/"} element={<Signin/>}/>
        <Route exact path={"/home"} element={<Home/>}/>
        <Route exact  path={"/signin"} element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
