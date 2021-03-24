import React, { Component } from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { utcToZonedTime, format } from 'date-fns-tz'


export class Item extends Component {
    render() {
        return (
            <div className="todo padding">
                {!this.props.check ? <input type="checkbox" id={this.props.value}></input> : ""}
                <label htmlFor={this.props.value}>
                    {this.props.text}
                    {this.props.user ? <label><br></br>@{this.props.user} - {format(utcToZonedTime(new Date(this.props.create)), 'dd/MM/yyyy')}</label> : ""}
                </label>
                <div className="actions">
                    {this.props.edit ? <button className="btn-clear" onClick={this.props.edited}><RiEditCircleFill></RiEditCircleFill></button> : ""}
                    {this.props.edit ? <button className="btn-clear" onClick={this.props.delete}><RiDeleteBin2Fill></RiDeleteBin2Fill></button> : ""}
                </div>
            </div>
        )
    }
}

export default Item;