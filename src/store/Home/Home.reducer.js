import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

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
        updateHome: (state, action) =>{
            axios.put(bdurl + "/home/"+action.payload.home_id, action.payload.home).then(
                function(response){
                    console.log(response)
                    // window.location.reload()
                }
            )
        },
        deleteHome: (state, action) => {
            axios.delete(bdurl+"/home/"+action.payload.home_id, {data:{creator_id:action.payload.creator_id}}).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        }
    }
})

export const {setHome, removeHome, updateHome, deleteHome} = homeSlice.actions;

export default homeSlice.reducer;

export function getHome(home_id) {
    return async function (dispatch) {
        axios.get(bdurl+"/home/"+home_id).then(
            res => {
                dispatch(setHome(res.data))
            }
        )
    }
}