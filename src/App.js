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
import { connect } from "react-redux";
import House from "./components/house/House";
import { Config } from "./components/config/Config";

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: this.props.login.user_id,
      casa: false,
    }
  }

  routes = () => {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      
        <Navbar></Navbar>

        <div className="SideAndBody">
          <Sidebar></Sidebar>

          <div className="body">

            <Route path="/" exact>
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

            {/* <Route path="/config">
              <Config></Config>
            </Route> */}
          </div>
        </div>

      </BrowserRouter>
    )
  }

  casa = () => {
    return (
      <div>
        <Navbar></Navbar>

        <House></House>
      </div>
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
    if(this.props.login.user_id !== "" && this.props.login.home_id !== "" && this.props.login.home_id !== null){
      return (this.routes())
    }
    else{
      if(this.props.login.user_id === "" && this.props.login.home_id === ""){
        return (this.login())
      }else{
        return(this.casa())
      }
    }
  }
}

const mapStateToProps = (state) =>{
  return{
    login: state.login,
  }
}

export default connect(mapStateToProps)(App)
