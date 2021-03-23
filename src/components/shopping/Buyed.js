import Item from './Item'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteShop, getBuyed } from '../../store/Shopping/Shopping.reducer'

export class Buyed extends Component {

    componentDidMount(){
        this.props.getBuyed(this.props.login.home_id)
    }

    apagar = (id) => {
        this.props.deleteShop({user_id: this.props.login.user_id, item_id: id})
    }

    render() {
        let compra = []

        if (this.props.buyed !== []) {
            this.props.buyed.map((busca, index) => {
                return compra.push(<Item text={busca.item} value={index} key={index}></Item>)
            })
        }

        return (
            <div>
                {compra}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        buyed: state.shopping.buyed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteShop: (item) => {
            dispatch(deleteShop(item))
        },
        getBuyed: (home_id) => {
            dispatch(getBuyed(home_id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buyed)
