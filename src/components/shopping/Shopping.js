import React, { Component } from 'react';
import ToBuy from './ToBuy';
import $ from 'jquery';
import Buyed from './Buyed';
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../Modal';
import { connect } from 'react-redux';
import { addShop } from '../../store/Shopping/Shopping.reducer';

export class Shopping extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: <ToBuy></ToBuy>,
            item: ""
        }
    }

    changeBuy = (event) => {
        // console.log(event.target.id)
        if (event.target.id === "toBuy") {
            $("#toBuy").addClass("btn-active")
            $("#buyed").removeClass("btn-active")
            this.setState({
                show: <ToBuy></ToBuy>,
            })
        }
        if (event.target.id === "buyed") {
            $("#buyed").addClass("btn-active")
            $("#toBuy").removeClass("btn-active")
            this.setState({
                show: <Buyed></Buyed>,
            })
        }
    }

    salvar = (event) =>{
        let item = {
            item: this.state.item,
            creator_id: this.props.login.user_id,
            home_id: this.props.login.home_id,
        }
        event.preventDefault()
        this.props.addShop(item)
        $("#addShopping").addClass("d-none")
    }

    render() {
        return (
            <div className="w-full padding">

                <div className="btn-bar w-full">
                    <button className="btn-clear add" onClick={() => { $("#addShopping").removeClass("d-none") }}>
                        <RiAddCircleFill></RiAddCircleFill>
                    </button>
                    <button className="btn-outline btn-flex btn-active" id="toBuy" onClick={this.changeBuy}>Para comprar</button>
                    <button className="btn-outline btn-flex" id="buyed" onClick={this.changeBuy}>Comprados</button>
                </div>

                <Modal id="addShopping">
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

                {this.state.show}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        addShop: (item) =>{
            dispatch(addShop(item))
        }
    }
}

export default connect(mapStateToProps,mapDispachToProps)(Shopping)