import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editToDo, getWeekly } from '../../store/ToDo/ToDo.reducer';
import $ from 'jquery'
import Modal from '../Modal';

export class Week extends Component {
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
        this.props.getWeekly(this.props.login.home_id)
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
        if (this.props.weekly !== undefined) {
            this.props.weekly.map((busca, index) => {
                return busca.map((response) => {
                    lista.push(<Item text={response.task} value={index} edit={response.creator_id === this.props.login.user_id} edited={() => { $("#" + response.id).removeClass("d-none") }} delete={() => this.delete(response.id)} key={index}></Item>)
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

                                <div className="form-group" id="weekly">
                                    <label>
                                        Dia da semana:
                                    </label>
                                    <select id="dayOfWeek" onChange={(event) => { this.setState({ day_of_week: event.target.value }) }}>
                                        <option defaultValue value="" hidden>{response.day_of_week}</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="segunda-feira">Segunda-feira</option>
                                        <option value="terca-feira">Terça-feira</option>
                                        <option value="quarta-feira">Quarta-feira</option>
                                        <option value="quinta-feira">Quinta-feira</option>
                                        <option value="sexta-feira">Sexta-feira</option>
                                        <option value="sabado">Sábado</option>
                                    </select>
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
        weekly: state.todo.weekly.weekly
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeekly: (home_id) => {
            dispatch(getWeekly(home_id))
        },
        editToDo: (item) => {
            dispatch(editToDo(item))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Week)
