import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMonthly } from '../../store/ToDo/ToDo.reducer';

export class May extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tarefa: "",
            frequencia: "",
        }
    }

    componentDidMount() {
        this.props.getMonthly(this.props.login.home_id)
    }

    render() {
        let lista = []

        if (this.props.monthly !== undefined) {
            this.props.monthly.map((busca,index) => {
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
        monthly: state.todo.monthly.monthly
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMonthly: (home_id) => {
            dispatch(getMonthly(home_id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(May)
