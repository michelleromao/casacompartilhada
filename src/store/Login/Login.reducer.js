import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user_id:"6db65734-58c1-4f57-bfa4-bf016f901484",
        // user_id:"7de07a1a-b0b8-4541-a091-aba1571e6ffa",
        home_id:"ac525be6-ba3b-4fe1-b17a-7e30fc5fb8ed",
    },
    reducers:{
        setUser: (state, action) => {
            state.user_id = action.payload
        },
        setHome: (state, action) => {
            state.home_id = action.payload
        }
    }
})

export const {setUser, setHome} = loginSlice.actions;

export default loginSlice.reducer;