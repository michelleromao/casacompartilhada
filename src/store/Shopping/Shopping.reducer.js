import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: {
        toBuy: [],
        buyed: []
    },
    reducers: {
        setShop: (state, action) => {
            state.toBuy = action.payload
        },
        setBuyed: (state, action) => {
            state.buyed = action.payload
        },
        addShop: (state, action) => {
            axios.post(bdurl+'/purchaseitem/', action.payload).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        deleteShop: (state, action) => {
            axios.delete(bdurl+'/purchaseitem/' + action.payload.item_id, { data: { creator_id: action.payload.user_id } }).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        buyItem: (state, action) => {
            axios.put(bdurl+'/purchaseitem/' + action.payload.item_id + "?buyer_id=" + action.payload.user_id).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        editItem: (state, action) => {
            // console.log(action.payload)
            axios.put(bdurl+'/purchaseitem/' + action.payload.item_id, { item: action.payload.item, status: action.payload.status, creator_id: action.payload.creator_id }).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        }

    }

})

export default shoppingSlice.reducer

export const { setShop, setBuyed, addShop, deleteShop, buyItem, editItem } = shoppingSlice.actions

export function getShop(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/purchaseitem/?status=false&home_id=' + id_home).then(
            res => {
                dispatch(setShop(res.data))
            }
        )
    }
}

export function getBuyed(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/purchaseitem/?status=true&home_id=' + id_home).then(
            res => {
                dispatch(setBuyed(res.data))
            }
        )
    }
}