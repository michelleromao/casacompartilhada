import React from 'react'
import Item from './Item'

export default function House() {
    let casa = [
        {item: "Aluguel", valor: 150.00, vencimento: "05/03", responsavel: "@micheleromao", pagou: ["@georgemoreno", "@micheleromao"]},
    ]

    return (
        <div>
            {casa.map((busca, index)=>{
                return <Item value={index} key={index} values={busca}></Item>
            })}
        </div>
    )
}
