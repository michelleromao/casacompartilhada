import React, { Component } from 'react'
import $, { event } from 'jquery';
import { connect } from 'react-redux';
import { addHomeInUser, getAllUser } from '../../store/User/User.reducer';
import { addHome, setHome } from '../../store/Login/Login.reducer';

export class House extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            codigo: "",
        }
    }

    componentDidMount(){
        this.props.getAllUser()
    }

    logar = (event) => {
        let user = {
            username: "",
            email: "",
            home_id:this.state.codigo,
        }
        event.preventDefault()
        if(this.props.allUser !== []){
            this.props.allUser.map((busca) => {
                if(busca.id === this.props.login.user_id){
                    user.username = busca.username;
                    user.email = busca.email;
                }
            })
        }
        this.props.addHomeInUser({user_id: this.props.login.user_id, user: user})
        this.props.setHome(this.state.codigo)
    }

    cadastro = () => {
        $("#criar").addClass("d-none")
        $("#entrar").removeClass("d-none")
    }

    cadastrar = (event) => {
        event.preventDefault()
        let home = {
            name: this.state.nome,
            creator_id: this.props.login.user_id,
        }
        this.props.addHome(home)
    }

    render() {

        return (
            <div className="login body">
                <div className="form padding" id="criar">
                    <h2>
                        Criar uma casa
                    </h2>

                    <form onSubmit={this.cadastrar}>
                        <div className="form-group">
                            <label>
                                Nome*:
                        </label>
                            <input type="text" required onChange={(event) => {
                                this.setState({
                                    nome: event.target.value
                                })
                            }}>
                            </input>
                        </div>
                        <input type="submit" className="btn w-full form-group" value="Cadastrar"></input>
                    </form>
                    <hr className="form-group"></hr>
                    <input type="submit" className="btn-outline w-full form-group" value="Entrar em uma casa" onClick={() => { this.cadastro() }}></input>
                </div>

                <div className="form padding d-none" id="entrar">
                    <h2>
                        Entrar em uma casa
                    </h2>

                    <form onSubmit={this.logar}>
                        <div className="form-group">
                            <label>
                                Código*:
                        </label>
                            <input type="text" required onChange={(event) => {
                                this.setState({
                                    codigo: event.target.value
                                })
                            }}>
                            </input>
                        </div>

                        <input type="submit" className="btn w-full form-group" value="Entrar"></input>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        login: state.login,
        allUser: state.user.allUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addHome: (home) =>{
            dispatch(addHome(home))
        },
        getAllUser: () => {
            dispatch(getAllUser())
        },
        setHome: (home_id) => {
            dispatch(setHome(home_id))
        },
        addHomeInUser: (user) => {
            dispatch(addHomeInUser(user))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(House)