import React, { Component } from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../Modal'
import $ from 'jquery';
import { connect } from 'react-redux'
import { addRule } from '../../store/Rules/Rules.actions'


export class Rules extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regra: "",
        }
    }

    salvar = (event) => {
        event.preventDefault()
        let rule = {
            username: 'georgemoreno',
            msg: this.state.regra,
        }
        this.props.addRule(rule)
        $("#addRule").addClass("d-none")
        this.forceUpdate()
    }

    render() {

        return (
            <div className="w-full btn-bar evenly padding">
                <div className="postit-none">
                    <button className="btn-clear add" onClick={() => { $("#addRule").removeClass("d-none") }}>
                        <RiAddCircleFill></RiAddCircleFill>
                    </button>
                </div>

                {this.props.rules.map((response, key) => {
                    return <div className="postit" key={key}>
                            <label className="username">
                                @{response.username}
                            </label>

                            <div>
                                <label className="text">
                                    {response.msg}
                                </label>
                            </div>

                            <button className="btn-clear">
                                <RiEditCircleFill></RiEditCircleFill>
                            </button>
                            <button className="btn-clear">
                                <RiDeleteBin2Fill></RiDeleteBin2Fill>
                            </button>
                        </div>
                })}

                {this.state.list}

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

function mapStateToProps(state) {
    return {
        rules: state.rules
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRule: (rule) => dispatch(addRule(rule))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rules)
