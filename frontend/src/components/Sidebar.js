import React from 'react'
import { NavLink } from "react-router-dom";


export default function Sidebar() {

    return (
        <div className="sidebar">
            <NavLink to="/" exact>
                <label>
                    Regras
                </label>
            </NavLink>

            <NavLink to="/todo">
                <label>
                    To-Do
                </label>
            </NavLink>

            <NavLink to="/tobuy">
                <label>
                    Lista de Compras
                </label>
            </NavLink>

            <NavLink to="/bill">
                <label>
                    Contas
                </label>
            </NavLink>
        </div>
    )
}
