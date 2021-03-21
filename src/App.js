import { BrowserRouter, Route } from "react-router-dom";
import Bills from './components/bill/Bills';
import Navbar from './components/Navbar';
import Rules from './components/rules/Rules';
import Shopping from './components/shopping/Shopping';
import Sidebar from './components/Sidebar';
import Todo from './components/todo/Todo';
import './style.css'
import React, { Component } from 'react'
import Login from "./components/login/Login";

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
      casa: false,
    }
  }

  routes = () => {
    return (
      <BrowserRouter>

        <Navbar></Navbar>

        <div className="SideAndBody">
          <Sidebar></Sidebar>

          <div className="body">

            <Route path="/rules">
              <Rules></Rules>
            </Route>

            <Route path="/todo">
              <Todo></Todo>
            </Route>

            <Route path="/tobuy">
              <Shopping></Shopping>
            </Route>

            <Route path="/bill">
              <Bills></Bills>
            </Route>
          </div>
        </div>

      </BrowserRouter>
    )
  }

  login = () => {
    return (
      <div>
        <Navbar></Navbar>

        <Login></Login>
      </div>
    )
  }

  render() {
    return (
      this.state.login ? this.routes() : this.login()
    )
  }
}

export default App
