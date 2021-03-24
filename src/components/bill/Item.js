import React, {Component} from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { utcToZonedTime, format } from 'date-fns-tz'

export class Item extends Component {

    render() {
        return (
            <div className="todo padding">
            {!this.props.check ? <input type="checkbox" onChange={this.props.checked}></input> : ""}
            <label htmlFor={this.props.value}>
                {this.props.values.name} - R$ {this.props.values.value} - vencimento: {format(utcToZonedTime(new Date(this.props.values.due)), 'dd/MM/yyyy')}
                <br></br>
                Responsável: @{this.props.user}
                <br></br>
                Quem já pagou: {this.props.payments.length>0? this.props.payments.join(", ") : "ninguém"}
            </label>
            <div className="actions">
                {this.props.edit ? <button className="btn-clear" onClick={this.props.edited}><RiEditCircleFill></RiEditCircleFill></button> : ""}
                {this.props.del ? <button className="btn-clear" onClick={this.props.remove}><RiDeleteBin2Fill></RiDeleteBin2Fill></button> : ""}
            </div>
        </div>
        )
    }
}

export default Item;