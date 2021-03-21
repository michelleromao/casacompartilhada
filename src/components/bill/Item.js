import React, {Component} from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { RiDeleteBin2Fill } from 'react-icons/ri'

export class Item extends Component {

    render() {
        let pagou = ""
        
        if(this.props.values.pagou.length > 0){
            pagou = this.props.values.pagou.join(", ")
        }else{
            pagou = "ninguém"
        }

        return (
            <div className="todo padding">
            <input type="checkbox" id={this.props.value}></input>
            <label htmlFor={this.props.value}>
                {this.props.values.item} - R$ {this.props.values.valor} - vencimento: {this.props.values.vencimento}
                <br></br>
                Responsável: {this.props.values.responsavel}
                <br></br>
                Quem já pagou: {pagou}
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