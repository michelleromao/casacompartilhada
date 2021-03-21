import React, {Component} from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'

export class Item extends Component {
    render() {
        return (
            <div className="todo padding">
            <input type="checkbox" id={this.props.value}></input>
            <label htmlFor={this.props.value}>
                {this.props.text}
            </label>
            <div className="actions">
                <button className="btn-clear">
                    <RiEditCircleFill></RiEditCircleFill>
                </button>
                <button className="btn-clear">
                    <RiDeleteBin2Fill></RiDeleteBin2Fill>
                </button>
            </div>
        </div>
        )
    }
}

export default Item;