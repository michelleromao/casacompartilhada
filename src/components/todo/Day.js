import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editToDo, getDaily, removeToDo } from '../../store/ToDo/ToDo.reducer';
import Modal from '../Modal';
import $ from 'jquery'

export class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo_id: "",
            task: "",
            frequency: "",
            day_of_week: "",
            day_of_month: "",
        }
    }

    componentDidMount() {
        this.props.getDaily(this.props.login.home_id)
    }

    delete(id) {
        if (window.confirm("Deseja realmente apagar?")) {
            this.props.removeToDo({ user_id: this.props.login.user_id, todo_id: id })
        }
    }

    atualizar(event) {
        event.preventDefault()
        let todo = {
            todo_id: this.state.todo_id,
            task: this.state.task,
            frequency: this.state.frequency,
            day_of_week: this.state.day_of_week,
            day_of_month: this.state.day_of_month,
            creator_id: this.props.login.user_id,
        }
        this.props.editToDo(todo)
        $("#" + this.state.todo_id).addClass("d-none")
        this.setState({
            todo_id: "",
            task: "",
            frequency: "",
            day_of_week: "",
            day_of_month: "",
        })
    }

    render() {
        let lista = []
        let modais = []

        if (this.props.daily !== undefined) {
            this.props.daily.map((busca, index) => {
                return busca.map((response) => {
                    lista.push(<Item text={response.task} value={index} edited={() => { $("#" + response.id).removeClass("d-none") }} edit={response.creator_id === this.props.login.user_id} delete={() => this.delete(response.id)} key={index}></Item>)
                    modais.push(
                        <Modal key={index} id={response.id}>
                            <h2>
                                To-Do
                            </h2>
                            <form onSubmit={(event) => this.atualizar(event)}>
                                <div className="form-group">
                                    <label>
                                        Tarefa:
                                    </label>
                                    <input type="text" defaultValue={response.task} onChange={(event) => { this.setState({ task: event.target.value, todo_id: response.id, frequency: response.frequency, day_of_week: response.day_of_week, day_of_month: response.day_of_month }) }}></input>
                                </div>

                                <div className="form-group">
                                    <input type="submit" className="btn" value="Salvar"></input>
                                </div>
                            </form>
                        </Modal>
                    )
                })
            })
        }

        return (
            <div className="w-full">
                {modais}
                {lista}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        daily: state.todo.daily.daily
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDaily: (home_id) => {
            dispatch(getDaily(home_id))
        },
        removeToDo: (remove) => {
            dispatch(removeToDo(remove))
        },
        editToDo: (item) => {
            dispatch(editToDo(item))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Day)
