import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteHome, getHome, updateHome } from '../../store/Home/Home.reducer'
import { removeHome, removeUser } from '../../store/Login/Login.reducer'
import { addHomeInUser, deleteUser, getAllUser, getUser } from '../../store/User/User.reducer'

export class Configurar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            oldUser: "",
            email: "",
            password: "",
            name: "",
        }
    }

    componentDidMount() {
        this.props.getAllUsers();
        this.props.getHome(this.props.login.home_id)
        this.props.getUser(this.props.login.home_id)
    }

    cadastrar = (event) => {
        event.preventDefault();
        let home = {
            name: this.state.name,
            creator_id: this.props.login.user_id
        }
        this.props.updateHome({ home_id: this.props.login.home_id, home: home })
        this.props.removeHome()
        this.props.removeUser()
    }

    excluirCasa = () => {
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.deleteHome({ home_id: this.props.login.home_id, creator_id: this.props.login.user_id })
        }
        this.props.removeHome()
        this.props.removeUser()
    }

    excluirConta = () => {
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.deleteUser(this.props.login.user_id)
        }
        this.props.removeHome()
        this.props.removeUser()
    }

    atualizar = (event) =>{
        event.preventDefault();
        let user = {
            username: this.state.oldUser,
            email: this.state.email,
            new_password: this.state.password,
            home_id: this.props.login.home_id
        }
        this.props.addHomeInUser({user_id: this.props.login.user_id, user: user})
    }

    sair = (email, username) => {
        let user = {
            username: username,
            email: email,
            home_id: null
        }
        this.props.addHomeInUser({user_id: this.props.login.user_id, user: user})
        this.props.removeHome()
        this.props.removeUser()
    }

    render() {
        let user = {}
        let home = {}
        let moradores = []
        if (this.props.users !== []) {
            this.props.users.map((busca) => {
                if (busca.id === this.props.login.user_id) {
                    user = busca
                }
            })
        }

        if (this.props.home !== []) {
            home = this.props.home
        }

        if (this.props.homeUser) {
            this.props.homeUser.map((busca, index) => {
                return moradores.push(<div key={index} className="todo padding"><label>@{busca.username}</label></div>)
            })
        }


        return (
            <div className="w-full padding d-flex">
                <div className="form padding config" id="criar">
                    <h2>
                        Casa
                    </h2>
                    <div className="form-group label-center">
                        <label>Código da Casa: <br></br> {home.id}</label>
                    </div>

                    <div className="form-group">
                        <label>Moradores:</label>
                        {moradores}
                    </div>

                    <hr></hr>

                    <form onSubmit={this.cadastrar}>
                        <div className="form-group">
                            <label>
                                Nome:
                        </label>
                            <input type="text" defaultValue={home.name} onChange={(event) => {
                                this.setState({
                                    name: event.target.value
                                })
                            }}>
                            </input>
                        </div>
                        {home.creator_id === user.id ? <input type="submit" className="btn w-full form-group" value="Atualizar casa"></input> : ""}
                    </form>
                    <hr className="form-group"></hr>
                    {home.creator_id === this.props.login.user_id ?
                        <input type="submit" className="btn-outline w-full form-group" value="Excluir casa" onClick={() => { this.excluirCasa() }}></input> :
                        <input type="submit" className="btn-outline w-full form-group" value="Sair da casa" onClick={() => { this.sair(user.email, user.username) }}></input>
                    }
                </div>

                <div className="form padding config" id="cadastro">
                    <h2>
                        Você
                    </h2>
                    <form onSubmit={this.atualizar}>
                        <div className="form-group">
                            <label>
                                Usuário:
                        </label>
                            <input type="text" defaultValue={user.username} onChange={(event) => {
                                this.setState({
                                    oldUser: event.target.value,
                                    email: user.email,
                                })
                            }}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label>
                                Email:
                        </label>
                            <input type="email" disabled defaultValue={user.email} onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            }}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label>
                                Nova senha:
                            </label>
                            <input type="password" required onChange={(event) => {
                                this.setState({
                                    password: event.target.value,
                                })
                            }}>
                            </input>
                        </div>
                        <input type="submit" className="btn w-full form-group" value="Atualizar"></input>
                    </form>
                    <hr className="form-group"></hr>
                    <input type="submit" className="btn-outline w-full form-group" value="Excluir conta" onClick={() => { this.excluirConta() }}></input>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        users: state.user.allUser,
        home: state.home.home,
        homeUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => {
            dispatch(getAllUser())
        },
        getHome: (home_id) => {
            dispatch(getHome(home_id))
        },
        getUser: (home_id) => {
            dispatch(getUser(home_id))
        },
        addHomeInUser: (user) => {
            dispatch(addHomeInUser(user))
        },
        updateHome: (home) => {
            dispatch(updateHome(home))
        },
        deleteUser: (user) =>{
            dispatch(deleteUser(user))
        },
        deleteHome: (home) =>{
            dispatch(deleteHome(home))
        },
        removeUser: () => {
            dispatch(removeUser())
        },
        removeHome: () => {
            dispatch(removeHome())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configurar)
