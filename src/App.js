import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Todo from './components/todo/Todo';
import './style.css'

function App() {
  return (
    <BrowserRouter>

      <Navbar></Navbar>

      <div className="SideAndBody">

        <Sidebar></Sidebar>

        <div className="body">

          <Route path="/regras" exact>
            <Home></Home>
          </Route>

          <Route path="/todo">
            <Todo></Todo>
          </Route>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;
