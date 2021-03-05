import React from 'react'
import Logo from '../img/Logo.png'
import { AiOutlineLogin } from 'react-icons/ai'
import { AiOutlineLogout } from 'react-icons/ai'
import {BsGear} from 'react-icons/bs'


export default function Navbar() {
    return (
        <div className="navbar">
            <img src={Logo} alt="Logo marca com uma casa e o texto casa compartilhada" className="logo"></img>

            <div className="btn-bar navbar-btn">
                <button className="btn-clear">
                    <BsGear></BsGear>
                </button>
                <button className="btn-clear">
                    <AiOutlineLogin></AiOutlineLogin>
                </button>
                <button className="btn-clear">
                    <AiOutlineLogout></AiOutlineLogout>
                </button>
            </div>
        </div>
    )
}
