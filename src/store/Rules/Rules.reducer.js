import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ruleSlice = createSlice({
    name: 'rule',
    initialState: {
        rule: []
    },
    reducers: {
        setRule: (state, action) => {
            state.rule = action.payload;
        },

        addRule: (state, action) => {
            axios.post("http://localhost:3333/rule/",action.payload).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        removeRule: (state, action) => {
            axios.delete("http://localhost:3333/rule/"+action.payload.rule_id, {data: {creator_id: action.payload.user_id}}).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        updateRule: (state, action) => {
            console.log(action.payload)
            axios.put("http://localhost:3333/rule/"+action.payload.rule_id, {description: action.payload.description, creator_id: action.payload.creator_id}).then(
                function(response) {
                    console.log(response.status)                    
                    window.location.reload()
                }
            )
        }

    }
})

export const { setRule, addRule, removeRule, updateRule } = ruleSlice.actions;

export default ruleSlice.reducer;

export function getRule(id_home) {
    return async function (dispatch) {
        await axios.get('http://localhost:3333/rule/?home_id=' + id_home).then(
            res => {
                dispatch(setRule(res.data))
            }
        )
    }
}