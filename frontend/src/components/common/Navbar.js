import React, { Component } from 'react'

//import files
import Logo from '../../img/Logo.png'

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <img src={Logo} alt="Logo com o icone de uma casa e escrito casa compartilhada" className="logo"></img>
            </div>

        )
    }
}

export default Navbar
