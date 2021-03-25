import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: [],
        allUser: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAllUser: (state, action) => {
            state.allUser = action.payload
        },
        addUser: (state, action) => {
            axios.post("http://localhost:3333/user/", action.payload).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        },
        addHomeInUser: (state, action) => {
            axios.put("http://localhost:3333/user/"+action.payload.user_id, action.payload.user).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        }
    }
})

export const {setUser, setAllUser, addUser, addHomeInUser} = userSlice.actions

export default userSlice.reducer

export function getUser(home_id){
    return async function (dispatch){
        await axios.get('http://localhost:3333/user/?home_id='+home_id).then(
            res=>{
                dispatch(setUser(res.data))
            }
        )
    }
}

export function getAllUser(){
    return async function (dispatch){
        await axios.get('http://localhost:3333/user/').then(
            res=>{
                dispatch(setAllUser(res.data))
            }
        )
    }
}