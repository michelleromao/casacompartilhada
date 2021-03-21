import Item from './Item';
import React, { Component } from 'react'

export class Day extends Component {
    constructor(props){
        super(props)
        this.state = {
            tarefa: "",
            frequencia: "",
        }
    }
    render() {
        let semana = [
            { text: "Lavar a louça" },
            { text: "Lavar a louça" },
            { text: "Lavar a louça" }
        ]
        return (
            <div className="w-full">

                {semana.map((busca, index) => {
                    return <Item text={busca.text} value={index} key={index}></Item>
                })}

            </div>
        )
    }
}

export default Day
