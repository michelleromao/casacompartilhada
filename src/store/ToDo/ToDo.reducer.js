import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

export const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        daily: [],
        weekly: [],
        monthly: [],
        does: []
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
        setDoes: (state, action) =>{
            state.does = action.payload
        },

        addToDo: (state, action) => {
            // console.log(action.payload)
            axios.post(bdurl+"/todo/",action.payload).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        removeToDo: (state, action) => {
            axios.delete(bdurl+"/todo/"+action.payload.todo_id, {data: {creator_id: action.payload.user_id}}).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        editToDo: (state, action) =>{
            axios.put(bdurl+"/todo/"+action.payload.todo_id , {task: action.payload.task, frequency: action.payload.frequency, day_of_week: action.payload.day_of_week, day_of_month: action.payload.day_of_month, creator_id: action.payload.creator_id}).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        }
    }
})

export default todoSlice.reducer

export const { setDaily, setWeekly, setMonthly, addToDo, removeToDo, editToDo, setDoes} = todoSlice.actions

export function getDaily(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/todo/'+ id_home+"?frequency=daily").then(
            res => {
                dispatch(setDaily(res.data))
            }
        )
    }
}

export function getWeekly(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/todo/'+ id_home+"?frequency=weekly").then(
            res => {
                dispatch(setWeekly(res.data))
            }
        )
    }
}

export function getMonthly(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/todo/' + id_home +"?frequency=monthly").then(
            res => {
                dispatch(setMonthly(res.data))
            }
        )
    }
}

export function getDoes(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/todo/' + id_home +"?does=true").then(
            res => {
                dispatch(setDoes(res.data))
            }
        )
    }
}