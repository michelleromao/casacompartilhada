import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getDaily, removeToDo } from '../../store/ToDo/ToDo.reducer';

export class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tarefa: "",
            frequencia: "",
        }
    }

    componentDidMount() {
        this.props.getDaily(this.props.login.home_id)
    }

    delete(id) {
        this.props.removeToDo({user_id: this.props.login.user_id, todo_id: id})
    }

    render() {
        let lista = []

        if (this.props.daily !== undefined) {
            this.props.daily.map((busca,index) => {
                return busca.map((response)=>{
                    return lista.push(<Item text={response.task} value={index} delete={() => this.delete(response.id)} key={index}></Item>)
                })
            })
        }

        return (
            <div className="w-full">

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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Day)
