import React, { Component } from 'react'
import Logo from '../img/Logo.png'
import { AiOutlineLogin } from 'react-icons/ai'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsGear } from 'react-icons/bs'
import { connect } from 'react-redux'
import { removeHome, removeUser } from '../store/Login/Login.reducer'

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <img src={Logo} alt="Logo marca com uma casa e o texto casa compartilhada" className="logo"></img>
    
                <div className="btn-bar navbar-btn">
                    {/* <button className="btn-clear">
                        <BsGear></BsGear>
                    </button> */}
                    <button className="btn-clear" onClick={()=>{this.props.removeUser(this.props.login.user_id); this.props.removeHome(this.props.login.home_id); }}>
                        <AiOutlineLogout></AiOutlineLogout>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeUser: (user_id) =>{
            dispatch(removeUser(user_id))
        },
        removeHome: (home_id) =>{
            dispatch(removeHome(home_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
