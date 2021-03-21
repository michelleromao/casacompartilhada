import React from 'react'
import Item from './Item'

export default function ToBuy() {
    let compra = [
        {item: "Detergente"}
    ]

    return (
        <div>
            {compra.map((busca, index)=>{
                return <Item text={busca.item} value={index} key={index}></Item>
            })}
        </div>
    )
}
