import React, { Component } from 'react'
import $ from 'jquery'; 
import { connect } from 'react-redux';
import { addUser, getAllUser } from '../../store/User/User.reducer';
import { setUser, loginUser } from '../../store/Login/Login.reducer';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: "",
            senha: "",
            show: "",
            usuarioCadastro: "",
            senhaCadastro: "",
            emailCadastro: "",
        }
    }

    componentDidMount(){
        this.props.getAllUser()
    }

    logar = (event) => {
        event.preventDefault()
        let user = {
            email: this.state.usuario,
            password: this.state.senha,
        }
        this.props.loginUser(user)
    }

    cadastro = () => {
        $("#login").addClass("d-none")
        $("#cadastro").removeClass("d-none")
    }

    cadastrar = (event) => {
        event.preventDefault()
        let user = {
            username: this.state.usuarioCadastro,
            email: this.state.emailCadastro,
            password: this.state.senhaCadastro,
        }
        this.props.addUser(user);
    }

    render() {
        return (
            <div className="login body">
                <div className="form padding" id="login">
                    <h2>
                        Login
                </h2>

                    <form onSubmit={this.logar}>
                        <div className="form-group">
                            <label>
                                E-mail:
                        </label>
                            <input type="text" required onChange={(event) => {
                                this.setState({
                                    usuario: event.target.value
                                })
                            }}>
                            </input>
                        </div>
                        <div className="form-group">
                            <label>
                                Senha:
                        </label>
                            <input type="password" required onChange={(event) => {
                                this.setState({
                                    senha: event.target.value
                                })
                            }}>
                            </input>
                        </div>
                        <input type="submit" className="btn w-full form-group" value="Entrar"></input>
                    </form>
                    <hr className="form-group"></hr>
                    <input type="submit" className="btn-outline w-full form-group" value="Criar conta" onClick={()=>{this.cadastro()}}></input>
                </div>

                <div className="form padding d-none" id="cadastro">
                    <h2>
                        Criar conta
                    </h2>

                    <form onSubmit={this.cadastrar}>
                        <div className="form-group">
                            <label>
                                Usuário*:
                        </label>
                            <input type="text" required onChange={(event) => {
                                this.setState({
                                    usuarioCadastro: event.target.value
                                })
                            }}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label>
                                Email*:
                        </label>
                            <input type="email" required onChange={(event) => {
                                this.setState({
                                    emailCadastro: event.target.value
                                })
                            }}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label>
                                Senha*:
                    </label>
                            <input type="password" required onChange={(event) => {
                                this.setState({
                                    senhaCadastro: event.target.value
                                })
                            }}>
                            </input>
                        </div>
                        <input type="submit" className="btn w-full form-group" value="Cadastrar"></input>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        allUser: state.user.allUser
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => {
            dispatch(getAllUser())
        },
        addUser: (user) =>{
            dispatch(addUser(user))
        },
        setUser: (user) => {
            dispatch(setUser(user))
        },
        loginUser: (user) => {
            dispatch(loginUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)