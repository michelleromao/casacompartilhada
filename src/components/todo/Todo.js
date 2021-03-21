import React, { Component } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import Day from './Day'
import Done from './Done'
import May from './May'
import Week from './Week'
import $ from 'jquery'
import Modal from '../Modal'

export class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: <Day></Day>,
            tarefa: "",
            frequencia: "",
        }
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
        console.log(this.state)
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
                            <select required id="frequencia" onChange={(event)=>{this.setState({frequencia: event.target.value})}}>
                                <option defaultValue hidden>Selecione...</option>
                                <option value="Diario">Diario</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Mensal">Mensal</option>
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

export default Todo
