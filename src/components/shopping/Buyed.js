import React from 'react'
import Item from './Item'

export default function Buyed() {
    let comprado = [
        {item: "Arroz"}
    ]

    return (
        <div>
            {comprado.map((busca, index)=>{
                return <Item value={index} text={busca.item} key={index}></Item>
            })}
        </div>
    )
}
