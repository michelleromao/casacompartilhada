import Item from './Item'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHome, getPayments, payBill, removeBill, updateBill } from '../../store/Bill/Bill.reducer'
import { getUser } from '../../store/User/User.reducer'
import $ from 'jquery'
import Modal from '../Modal'
import { utcToZonedTime, format } from 'date-fns-tz'
import axios from 'axios'


export class House extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            para: "",
            titulo: "",
            valor: "",
            vencimento: "",
            responsavel: "",
        }
    }
    componentDidMount() {
        this.props.getHome(this.props.login.home_id)
        this.props.getUser(this.props.login.home_id)
        this.props.getPayment(this.props.login.home_id)
    }

    apagar = (id) => {
        let bill = {
            bill_id: id,
            creator_id: this.props.login.user_id
        }
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.removeBill(bill)
        }
    }

    atualizar = (event) => {
        event.preventDefault()
        let bill = {
            name: this.state.titulo,
            responsible_id: this.state.responsavel,
            due: this.state.vencimento,
            value: this.state.valor,
            home: this.state.para,
            creator_id: this.props.login.user_id,
            home_id: this.props.login.home_id,
        }
        this.props.updateBill({ bill_id: this.state.id, bill: bill })
        $("#" + this.state.id).addClass("d-none")
        this.setState({
            id: "",
            para: "",
            titulo: "",
            valor: "",
            vencimento: "",
            responsavel: "",
        })
    }

    pagarConta = (id) => {
        let bill = {
            bill_id: id,
            payer_id: this.props.login.user_id
        }
        this.props.payBill(bill)
    }

    render() {
        let lista = []
        let modais = []
        let users = []
        
        if (this.props.user) {
            this.props.user.map((response, index) => {
                return users.push(<option key={index} value={response.id}>@{response.username}</option>)
            })
        }
        
        if (this.props.home !== [] && this.props.user !== [] && this.props.payment !== []) {
            this.props.home.map((response, index) => {
                this.props.user.map((busca) => {
                    let payments = []
                    this.props.payment.map((payment)=>{
                        if(payment.bill_id === response.id){
                            payments.push("@"+payment.username)
                        }
                    })
                    if (busca.id === response.responsible_id) {
                        lista.push(<Item value={index} payments={payments} checked={() => { this.pagarConta(response.id) }} remove={() => { this.apagar(response.id) }} edited={() => { $("#" + response.id).removeClass("d-none") }} edit={this.props.login.user_id === response.creator_id} del={this.props.login.user_id === response.creator_id} key={index} user={busca.username} values={response}></Item>)
                        modais.push(
                            <Modal id={response.id} key={index}>
                                <h2>
                                    Conta
                                </h2>
                                <form onSubmit={this.atualizar}>
                                    <div className="form-group">
                                        <label>
                                            Título:
                                        </label>
                                        <input type="text" defaultValue={response.name} onChange={(event) => { this.setState({ titulo: event.target.value, valor: response.value, para: response.home, vencimento: format(utcToZonedTime(new Date(response.due)), 'yyyy-MM-dd'), responsavel: response.responsible_id, id: response.id }) }}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Valor total:
                                        </label>
                                        <input type="number" defaultValue={response.value} onChange={(event) => { this.setState({ valor: event.target.value }) }}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Vencimento:
                                        </label>
                                        <input type="date" defaultValue={format(utcToZonedTime(new Date(response.due)), 'yyyy-MM-dd')} onChange={(event) => { this.setState({ vencimento: event.target.value }) }}></input>
                                    </div>
                                    <div className="form-group" id="responsavel">
                                        <label>
                                            Responsável:
                                        </label>
                                        <select onChange={(event) => { this.setState({ responsavel: event.target.value }) }}>
                                            <option defaultValue hidden value="">@{busca.username}</option>
                                            {users}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn" value="Salvar"></input>
                                    </div>
                                </form>
                            </Modal>
                        )
                    }
                })
            })
        }

        return (
            <div>
                {modais}
                {lista}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        home: state.bill.home,
        user: state.user.user,
        payment: state.bill.payment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHome: (home_id) => {
            dispatch(getHome(home_id))
        },
        getUser: (id_home) => {
            dispatch(getUser(id_home))
        },
        getPayment: (home_id) =>{
            dispatch(getPayments(home_id))
        },
        removeBill: (bill) => {
            dispatch(removeBill(bill))
        },
        updateBill: (bill) => {
            dispatch(updateBill(bill))
        },
        payBill: (bill) => {
            dispatch(payBill(bill))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)
