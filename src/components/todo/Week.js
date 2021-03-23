import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getWeekly } from '../../store/ToDo/ToDo.reducer';

export class Week extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tarefa: "",
            frequencia: "",
        }
    }

    componentDidMount() {
        this.props.getWeekly(this.props.login.home_id)
    }

    render() {
        let lista = []

        if (this.props.weekly !== undefined) {
            this.props.weekly.map((busca,index) => {
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
        weekly: state.todo.weekly.weekly
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeekly: (home_id) => {
            dispatch(getWeekly(home_id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Week)
