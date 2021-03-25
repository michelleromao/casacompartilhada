import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Config extends Component {
    render() {
        console.log(this.props.login)
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(Config)
