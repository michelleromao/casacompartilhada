import Item from './Item';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getDoes } from '../../store/ToDo/ToDo.reducer';

export class Done extends Component {

    componentDidMount() {
        this.props.getDoes(this.props.login.home_id)
    }

    render() {
        let lista = []

        if (this.props.does.length > 0) {
            this.props.does.map((response, index) => {
                return lista.push(<Item text={response.task} user={response.username} create={response.created_at} key={index} check={true}></Item>)
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
        does: state.todo.does,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoes: (home_id) => {
            dispatch(getDoes(home_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Done)
