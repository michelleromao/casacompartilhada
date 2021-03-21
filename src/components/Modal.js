import React, { Component } from 'react'
import $ from 'jquery'

export class Modal extends Component {
    render() {
        return (
            <div className="modal d-none" id={this.props.id}>
                <div className="form padding modal-content">
                    <div className="modal-close">
                        <button className="btn-clear" onClick={()=>{$("#"+this.props.id).addClass("d-none")}}>
                            x
                        </button>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal
