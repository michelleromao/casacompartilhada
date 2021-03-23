import React, {Component} from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import $ from 'jquery';

export class Item extends Component {
    render() {
        return (
            <div className="todo padding">
            {this.props.selecionar ? <input type="checkbox" id={this.props.value} onChange={this.props.select}></input>: ""}
            <label htmlFor={this.props.value}>
                {this.props.text}
            </label>
            <div className="actions">
                {this.props.edit ? <button className="btn-clear" onClick={() => { $("#"+this.props.modal).removeClass("d-none") }}><RiEditCircleFill></RiEditCircleFill></button> : ""}
                {this.props.remo ? <button className="btn-clear" onClick={this.props.remove}><RiDeleteBin2Fill></RiDeleteBin2Fill></button> : ""}
            </div>
        </div>
        )
    }
}

export default Item;