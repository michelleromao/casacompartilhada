import React, { Component } from 'react'
import { Form } from '@unform/web'
import Input from './Input'

export class Login extends Component {
    render() {
        function handleSubmit(data) {
            console.log(data)
          }

        return (
            <Form onSubmit={handleSubmit} className="form">
                <Input name="nome" type="text"></Input>
                <input type="submit" value="enviar"></input>

            </Form>
        )
    }
}

export default Login
