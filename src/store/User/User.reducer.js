import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

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