import React, { Component } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import Day from './Day'
import Done from './Done'
import May from './May'
import Week from './Week'
import $ from 'jquery'
import Modal from '../Modal'
import { connect } from 'react-redux'
import { addToDo } from '../../store/ToDo/ToDo.reducer'

export class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: <Day></Day>,
            tarefa: "",
            frequencia: "",
            dayOfWeek:null,
            dayOfMonth :null,
        }
    }

    componentDidMount(){
        
    }

    changeTodo = (event) => {
        if (event.target.id === "todoDiario") {
            $("#todoDiario").addClass(" btn-active")
            $("#todoSemanal").removeClass(" btn-active")
            $("#todoMensal").removeClass(" btn-active")
            $("#todoFeito").removeClass(" btn-active")
            this.setState({
                show: <Day></Day>
            })
        }
        if (event.target.id === "todoSemanal") {
            $("#todoDiario").removeClass(" btn-active")
            $("#todoSemanal").addClass(" btn-active")
            $("#todoMensal").removeClass(" btn-active")
            $("#todoFeito").removeClass(" btn-active")
            this.setState({
                show: <Week></Week>
            })
        }
        if (event.target.id === "todoMensal") {
            $("#todoDiario").removeClass(" btn-active")
            $("#todoSemanal").removeClass(" btn-active")
            $("#todoMensal").addClass(" btn-active")
            $("#todoFeito").removeClass(" btn-active")
            this.setState({
                show: <May></May>
            })
        }
        if (event.target.id === "todoFeito") {
            $("#todoDiario").removeClass(" btn-active")
            $("#todoSemanal").removeClass(" btn-active")
            $("#todoMensal").removeClass(" btn-active")
            $("#todoFeito").addClass(" btn-active")
            this.setState({
                show: <Done></Done>
            })
        }
    }

    addTask = (event) =>{
        event.preventDefault()
        let task = {
            task: this.state.tarefa,
            frequency: this.state.frequencia,
            day_of_week: this.state.dayOfWeek,
            day_of_month: this.state.dayOfMonth,
            creator_id: this.props.login.user_id,
            home_id: this.props.login.home_id
        }
        this.props.addTodo(task)
        $("#addToDoDay").addClass("d-none")
    }

    render() {
        return (
            <div className="w-full padding">

                <div className="btn-bar w-full">
                    <button className="btn-clear add" onClick={() => { $("#addToDoDay").removeClass("d-none") }}>
                        <RiAddCircleFill></RiAddCircleFill>
                    </button>
                    <button className="btn-outline btn-flex btn-active" id="todoDiario" onClick={this.changeTodo}>Diário</button>
                    <button className="btn-outline btn-flex" id="todoSemanal" onClick={this.changeTodo}>Semanal</button>
                    <button className="btn-outline btn-flex" id="todoMensal" onClick={this.changeTodo}>Mensal</button>
                    <button className="btn-outline btn-flex" id="todoFeito" onClick={this.changeTodo}>Feitos</button>
                </div>

                <Modal id="addToDoDay">
                    <h2>
                        To-Do
                    </h2>
                    <form onSubmit={this.addTask}>
                        <div className="form-group">
                            <label>
                                Tarefa:
                            </label>
                            <input type="text" id="task" required onChange={(event)=>{this.setState({tarefa: event.target.value})}}></input>
                        </div>

                        <div className="form-group">
                            <label>
                                Frequência:
                            </label>
                            <select required id="frequencia" onChange={(event)=>{this.setState({frequencia: event.target.value}); $("#"+event.target.value).removeClass("d-none")}}>
                                <option defaultValue  value="" hidden>Selecione...</option>
                                <option value="daily">Diario</option>
                                <option value="weekly">Semanal</option>
                                <option value="monthly">Mensal</option>
                            </select>
                        </div>

                        <div className="form-group d-none" id="weekly">
                            <label>
                                Dia da semana:
                            </label>
                            <select id="dayOfWeek" onChange={(event)=>{this.setState({dayOfWeek: event.target.value})}}>
                                <option defaultValue value="" hidden>Selecione...</option>
                                domingo, segunda-feira, terca-feira, quarta-feira, quinta-feira, sexta-feira, sabado
                                <option value="domingo">Domingo</option>
                                <option value="segunda-feira">Segunda-feira</option>
                                <option value="terca-feira">Terça-feira</option>
                                <option value="quarta-feira">Quarta-feira</option>
                                <option value="quinta-feira">Quinta-feira</option>
                                <option value="sexta-feira">Sexta-feira</option>
                                <option value="sabado">Sábado</option>
                            </select>
                        </div>

                        <div className="form-group d-none" id="monthly">
                            <label>
                                Dia do mês:
                            </label>
                            <input type="number" min="1" max="31" onChange={(event)=>{this.setState({dayOfMonth: event.target.value})}}></input>
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

const mapStatusToProps = (state) => {
    return{
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTodo: (todo) => {
            dispatch(addToDo(todo))
        },
    }
}

export default connect(mapStatusToProps,mapDispatchToProps)(Todo)
