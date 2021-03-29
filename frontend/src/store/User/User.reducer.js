import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

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
            axios.post(bdurl+"/user/", action.payload).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        },
        addHomeInUser: (state, action) => {
            axios.put(bdurl+"/user/"+action.payload.user_id, action.payload.user).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        },
        deleteUser: (state, action) => {
            axios.delete(bdurl+"/user/"+action.payload).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        }
    }
})

export const {setUser, setAllUser, addUser, addHomeInUser, deleteUser} = userSlice.actions

export default userSlice.reducer

export function getUser(home_id){
    return async function (dispatch){
        await axios.get(bdurl+'/user/?home_id='+home_id).then(
            res=>{
                dispatch(setUser(res.data))
            }
        )
    }
}

export function getAllUser(){
    return async function (dispatch){
        await axios.get(bdurl+'/user/').then(
            res=>{
                dispatch(setAllUser(res.data))
            }
        )
    }
}