import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user_id:"",
        // user_id:"6db65734-58c1-4f57-bfa4-bf016f901484",
        // user_id:"7de07a1a-b0b8-4541-a091-aba1571e6ffa",
        home_id:"",
    },
    reducers:{
        setUser: (state, action) => {
            state.user_id = action.payload
        },
        setHome: (state, action) => {
            state.home_id = action.payload
        },
        removeUser: (state, action) =>{
            state.user_id = ""
        },
        removeHome: (state, action) => {
            state.home_id = ""
        },
    }
})

export const {setUser, setHome, removeHome, removeUser} = loginSlice.actions;

export default loginSlice.reducer;

export function loginUser(user) {
    return async function (dispatch) {
        axios.post("http://localhost:3333/login/",user).then(
            res => {
                console.log(res)
                dispatch(setUser(res.data.id));
                dispatch(setHome(res.data.home_id))
                window.location.reload();
            }
        )
    }
}

export function addHome (user) {
    return async function (dispatch) {
        axios.post("http://localhost:3333/home/", user).then(
            res => {
                dispatch(setHome(res.data[0].id))
                window.location.reload();
            }
        )
    }
}