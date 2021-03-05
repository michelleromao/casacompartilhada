import React from 'react'
import Semana from './Semana'

export default function Todo() {
    return (
        <div className="w-full">
            
            <div className="btn-bar w-full">
                <button className="btn-outline btn-flex">Todos</button>
                <button className="btn-outline btn-flex">Diário</button>
                <button className="btn-outline btn-flex">Semanal</button>
                <button className="btn-outline btn-flex">Mensal</button>
                <button className="btn-outline btn-flex">Feitos</button>
            </div>

            <Semana></Semana>

        </div>
    )
}
