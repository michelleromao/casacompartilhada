import React, { Component } from 'react'
import $ from 'jquery';
import House from './House';
import Personal from './Personal';
import Payed from './Payed';
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../Modal';

export class Bills extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: <House></House>,
            para: "",
            titulo: "",
            valor: "",
            vencimento: "",
            responsavel: "",
        }
    }

    changeBill = (event) => {
        if (event.target.id === "home") {
            $("#home").addClass("btn-active")
            $("#personal").removeClass("btn-active")
            $("#payed").removeClass("btn-active")
            this.setState({
                show: <House></House>,
            })
        }
        if (event.target.id === "personal") {
            $("#home").removeClass("btn-active")
            $("#personal").addClass("btn-active")
            $("#payed").removeClass("btn-active")
            this.setState({
                show: <Personal></Personal>,
            })
        }
        if (event.target.id === "payed") {
            $("#home").removeClass("btn-active")
            $("#personal").removeClass("btn-active")
            $("#payed").addClass("btn-active")
            this.setState({
                show: <Payed></Payed>,
            })
        }
    }

    salvar = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        let users = [{ username: "@micheleromao" }, { username: "@georgemoreno" }]


        return (
            <div className="w-full padding">

                <div className="btn-bar w-full">
                    <button className="btn-clear add" onClick={() => { $("#addShopping").removeClass("d-none") }}>
                        <RiAddCircleFill></RiAddCircleFill>
                    </button>
                    <button className="btn-outline btn-flex btn-active" id="home" onClick={this.changeBill}>Casa</button>
                    <button className="btn-outline btn-flex" id="personal" onClick={this.changeBill}>Pessoal</button>
                    <button className="btn-outline btn-flex" id="payed" onClick={this.changeBill}>Pagas</button>
                </div>

                <Modal id="addShopping">
                    <h2>
                        Conta
                    </h2>
                    <form onSubmit={this.salvar}>
                        <div className="form-group">

                            <div className="form-radio">
                                <input type="radio" name="para" id="casa" value="casa" required onChange={(event) => { this.setState({ para: event.target.value }) }}></input>
                                <label htmlFor="casa">Casa</label>
                            </div>

                            <div className="form-radio">
                                <input type="radio" name="para" id="pessoal" value="pessoal" onChange={(event) => { this.setState({ para: event.target.value }) }}></input>
                                <label htmlFor="pessoal">Pessoal</label>
                            </div>

                        </div>
                        <div className="form-group">
                            <label>
                                Título:
                            </label>
                            <input type="text" id="titulo" required onChange={(event) => { this.setState({ titulo: event.target.value }) }}></input>
                        </div>
                        <div className="form-group">
                            <label>
                                Valor total:
                            </label>
                            <input type="text" id="valor" required onChange={(event) => { this.setState({ valor: event.target.value }) }}></input>
                        </div>
                        <div className="form-group">
                            <label>
                                Vencimento:
                            </label>
                            <input type="date" id="vencimento" required onChange={(event) => { this.setState({ vencimento: event.target.value }) }}></input>
                        </div>
                        <div className="form-group">
                            <label>
                                Responsável:
                            </label>
                            <select required onChange={(event)=>{this.setState({responsavel: event.target.value})}}>
                                <option defaultValue hidden value="">Selecione...</option>
                                {users.map((busca, index) => { return <option key={index} value={busca.username}>{busca.username}</option> })}
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn" value="Salvar"></input>
                        </div>
                    </form>
                </Modal>

                {this.state.show}

            </div>
        )
    }
}

export default Bills
