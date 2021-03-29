import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

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
            axios.post(bdurl+"/rule/",action.payload).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        removeRule: (state, action) => {
            axios.delete(bdurl+"/rule/"+action.payload.rule_id, {data: {creator_id: action.payload.user_id}}).then(
                function(response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },

        updateRule: (state, action) => {
            console.log(action.payload)
            axios.put(bdurl+"/rule/"+action.payload.rule_id, {description: action.payload.description, creator_id: action.payload.creator_id}).then(
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
        await axios.get(bdurl+'/rule/?home_id=' + id_home).then(
            res => {
                dispatch(setRule(res.data))
            }
        )
    }
}