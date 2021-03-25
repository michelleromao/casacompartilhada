import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        home:[]
    },
    reducers:{
        setHome: (state, action) => {
            state.home = action.payload
        },
        removeHome: (state, action) => {
            state.home = ""
        },
    }
})

export const {setHome, removeHome} = homeSlice.actions;

export default homeSlice.reducer;

export function getHome(home_id) {
    return async function (dispatch) {
        axios.get("http://localhost:3333/home/"+home_id).then(
            res => {
                dispatch(setHome(res.data))
            }
        )
    }
}