import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buyItem, deleteShop, getShop } from '../../store/Shopping/Shopping.reducer'
import Modal from '../Modal'
import Item from './Item'

export class ToBuy extends Component {
    componentDidMount() {
        this.props.getShop(this.props.login.home_id)
    }

    apagar = (id) => {
        this.props.deleteShop({ item_id: id, user_id: this.props.login.user_id })
    }

    comprar = (id) => {
        this.props.buyItem({ item_id: id, user_id: this.props.login.user_id })
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
                        <form onSubmit={this.salvar}>
                            <div className="form-group">
                                <label>
                                    Item:
                            </label>
                                <input type="text" id="task" required onChange={(event) => { this.setState({ item: event.target.value }) }}></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn" value="Salvar"></input>
                            </div>
                        </form>
                    </Modal>
                )
                return compra.push(<Item text={busca.item} modal={busca.id} value={index} key={index} edit={true} select={() => { this.comprar(busca.id) }} selecionar={true} remove={() => { this.apagar(busca.id) }}></Item>)
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToBuy)
