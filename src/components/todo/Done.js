import React from 'react'
import Item from './Item';

export default function Done() {
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
