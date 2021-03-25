import React, { Component } from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../Modal'
import $ from 'jquery';
import { connect } from 'react-redux'
import { addRule, getRule, removeRule, updateRule } from '../../store/Rules/Rules.reducer';
import { getUser } from '../../store/User/User.reducer'

export class Rules extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regra: "",
            regraUpdate: "",
            idUpdate: "",
        }
    }

    componentDidMount() {
        this.props.getRule(this.props.login.home_id);
        this.props.getUser(this.props.login.home_id);
    }

    salvar = (event) => {
        event.preventDefault()
        let rule = {
            home_id: this.props.login.home_id,
            creator_id: this.props.login.user_id,
            description: this.state.regra
        }
        this.props.addRule(rule)
        $("#addRule").addClass("d-none")
    }

    update = (event) => {
        event.preventDefault()
        let rule = {
            creator_id: this.props.login.user_id,
            description: this.state.regraUpdate,
            rule_id: this.state.idUpdate,
        }
        this.props.updateRule(rule)
        $("#" + this.state.idUpdate).addClass("d-none")
        this.setState({
            idUpdate: "",
            regraUpdate: "",
        })
    }

    deleteRule = (id) => {
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.removeRule({ user_id: this.props.login.user_id, rule_id: id })
        }
    }


    render() {
        let lista = []
        let modais = []
        
        if (this.props.rule.length > 0 && this.props.user.length > 0) {
            this.props.rule.map((response, key) => {
                let user = ""
                return this.props.user.map((busca) => {
                    if (busca.id === response.creator_id) {
                        user = busca.username
                        lista.push(<div className="postit" key={key}>
                            <label className="username">
                                @{user}
                            </label>

                            <div>
                                <label className="text">
                                    {response.description}
                                </label>
                            </div>

                            {response.creator_id === this.props.login.user_id ? <button className="btn-clear" onClick={() => { $("#" + response.id).removeClass("d-none") }}><RiEditCircleFill></RiEditCircleFill></button>: ""}
                            {response.creator_id === this.props.login.user_id ? <button className="btn-clear" onClick={() => { this.deleteRule(response.id) }}><RiDeleteBin2Fill></RiDeleteBin2Fill></button> : ""}
                        </div>)

                        modais.push(<Modal id={response.id} key={key}>
                            <h2>
                                Regras
                            </h2>
                            <form onSubmit={this.update}>
                                <div className="form-group">
                                    <label>
                                        Descrição:
                                    </label>
                                    <textarea rows="5" defaultValue={response.description} onChange={(event) => { this.setState({ regraUpdate: event.target.value, idUpdate: response.id }); }}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Salvar" className="btn w-fill"></input>
                                </div>
                            </form>
                        </Modal>)
                    }
                })
            })
        }

        return (
            <div className="w-full btn-bar evenly padding">
                {modais}
                <div className="postit-none">
                    <button className="btn-clear add" onClick={() => { $("#addRule").removeClass("d-none") }}>
                        <RiAddCircleFill></RiAddCircleFill>
                    </button>
                </div>

                {lista}

                <Modal id="addRule">
                    <h2>
                        Regras
                </h2>
                    <form onSubmit={this.salvar}>
                        <div className="form-group">
                            <label>
                                Descrição:
                        </label>
                            <textarea placeholder="Adicione a regra" rows="5" required onChange={(event) => { this.setState({ regra: event.target.value }) }}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Salvar" className="btn w-fill"></input>
                        </div>
                    </form>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rule: state.rule.rule,
        user: state.user.user,
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRule: (rule) => {
            dispatch(addRule(rule))
        },
        getRule: (id_home) => {
            dispatch(getRule(id_home))
        },
        getUser: (id_home) => {
            dispatch(getUser(id_home))
        },
        removeRule: (remove) => {
            dispatch(removeRule(remove))
        },
        updateRule: (update) => {
            dispatch(updateRule(update))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rules)
