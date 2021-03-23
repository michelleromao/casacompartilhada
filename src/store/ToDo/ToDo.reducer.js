import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        daily: [],
        weekly: [],
        monthly: []
    },
    reducers: {
        setDaily: (state, action) =>{
            state.daily = action.payload
        },
        setWeekly: (state, action) =>{
            state.weekly = action.payload
        },
        setMonthly: (state, action) =>{
            state.monthly = action.payload
        },

        addToDo: (state, action) => {
            // console.log(action.payload)
            axios.post("http://localhost:3333/todo/",action.payload).then(
                function(response) {
                    console.log(response.status)
                }
            ).catch(
                function(error) { 
                    console.log(error)
                }
            )
        },

        removeToDo: (state, action) => {
            axios.delete("http://localhost:3333/todo/"+action.payload.todo_id, {data: {creator_id: action.payload.user_id}}).then(
                function(response) {
                    console.log(response.status)
                }
            ).catch(
                function(error) {
                    console.log(error)                    
                }
            )
        },
    }
})

export default todoSlice.reducer

export const { setDaily, setWeekly, setMonthly, addToDo, removeToDo} = todoSlice.actions

export function getDaily(id_home) {
    return async function (dispatch) {
        await axios.get('http://localhost:3333/todo/'+ id_home+"?frequency=daily").then(
            res => {
                dispatch(setDaily(res.data))
            }
        )
    }
}

export function getWeekly(id_home) {
    return async function (dispatch) {
        await axios.get('http://localhost:3333/todo/'+ id_home+"?frequency=weekly").then(
            res => {
                dispatch(setWeekly(res.data))
            }
        )
    }
}

export function getMonthly(id_home) {
    console.log(id_home)
    return async function (dispatch) {
        await axios.get('http://localhost:3333/todo/' + id_home +"?frequency=monthly").then(
            res => {
                console.log(res.data)
                dispatch(setMonthly(res.data))
            }
        )
    }
}