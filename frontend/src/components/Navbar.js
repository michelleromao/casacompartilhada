import React, { Component } from 'react'
import Logo from '../img/Logo.png'
import { AiOutlineLogin } from 'react-icons/ai'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsGear } from 'react-icons/bs'
import { connect } from 'react-redux'
import { removeHome, removeUser } from '../store/Login/Login.reducer'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                {this.props.login.home_id !== "" && this.props.login.home_id !== null?
                <label className="casa-btn">
                    <strong>
                        Código da casa:
                    </strong>
                    <br></br>
                    {this.props.login.home_id}
                </label>
                :""}

                <img src={Logo} alt="Logo marca com uma casa e o texto casa compartilhada" className="logo"></img>

                <div className="btn-bar navbar-btn">
                    {this.props.login.home_id !== "" && this.props.login.home_id !== null ? <Link to="/config" className="btn-clear"><BsGear></BsGear></Link> :""}
                    <button className="btn-clear" onClick={() => { this.props.removeUser(); this.props.removeHome(); }}>
                        <AiOutlineLogout></AiOutlineLogout>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: () => {
            dispatch(removeUser())
        },
        removeHome: () => {
            dispatch(removeHome())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
