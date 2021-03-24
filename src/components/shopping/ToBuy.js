import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buyItem, deleteShop, editItem, getShop } from '../../store/Shopping/Shopping.reducer'
import Modal from '../Modal'
import Item from './Item'
import $ from 'jquery'

export class ToBuy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: "",
            idUpdate: "",
            status: "",
        }
    }
    componentDidMount() {
        this.props.getShop(this.props.login.home_id)
    }

    apagar = (id) => {
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.deleteShop({ item_id: id, user_id: this.props.login.user_id })
        }
    }

    comprar = (id) => {
        if (window.confirm("Podemos passar para os itens comprados?")) {
            this.props.buyItem({ item_id: id, user_id: this.props.login.user_id })
        }
    }

    atualizar = (event) => {
        event.preventDefault()
        let item = {
            item_id: this.state.idUpdate,
            item: this.state.item,
            status: this.state.status,
            creator_id: this.props.login.user_id
        }
        this.props.editItem(item)
        $("#"+this.state.idUpdate).addClass('d-none')
        this.setState({
            item_id: "",
            item: "",
            status: "",
        })
    }

    render() {
        let compra = []
        let modais = []

        if (this.props.toBuy !== []) {
            this.props.toBuy.map((busca, index) => {
                modais.push(
                    <Modal id={busca.id} key={index}>
                        <h2>
                            Comprar
                    </h2>
                        <form onSubmit={this.atualizar}>
                            <div className="form-group">
                                <label>
                                    Item:
                            </label>
                                <input type="text" defaultValue={busca.item} onChange={(event) => { this.setState({ item: event.target.value, idUpdate: busca.id, status: busca.status }) }}></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn" value="Salvar"></input>
                            </div>
                        </form>
                    </Modal>
                )
                return compra.push(
                    <Item text={busca.item} modal={busca.id} value={index} key={index} edit={busca.creator_id===this.props.login.user_id} select={() => { this.comprar(busca.id) }} selecionar={true} remo={busca.creator_id===this.props.login.user_id} remove={() => { this.apagar(busca.id) }}></Item>
                )
            })
        }
        return (
            <div>
                {modais}
                {compra}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        toBuy: state.shopping.toBuy,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteShop: (item) => {
            dispatch(deleteShop(item))
        },
        getShop: (home_id) => {
            dispatch(getShop(home_id))
        },
        buyItem: (item) => {
            dispatch(buyItem(item))
        },
        editItem: (item) => {
            dispatch(editItem(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToBuy)
