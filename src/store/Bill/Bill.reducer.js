import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { bdurl } from "../bdconfig";

export const billSlice = createSlice({
    name: 'bill',
    initialState: {
        home: [],
        personal: [],
        payed: [],
        payment: [],
    },
    reducers: {
        setHome: (state, action) => {
            state.home = action.payload
        },
        setPersonal: (state, action) => {
            state.personal = action.payload
        },
        setPayed: (state, action) => {
            state.payed = action.payload
        },
        setPayment: (state, action) => {
            state.payment = action.payload
        },

        addBill: (state, action) => {
            axios.post(bdurl+"/bill/", action.payload).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        removeBill: (state, action) => {
            axios.delete(bdurl+"/bill/" + action.payload.bill_id, { data: { creator_id: action.payload.creator_id } }).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        updateBill: (state, action) => {
            axios.put(bdurl+"/bill/" + action.payload.bill_id, action.payload.bill).then(
                function (response) {
                    console.log(response.status)
                    window.location.reload()
                }
            )
        },
        payBill: (state, action) => {
            axios.post(bdurl+"/pay/", action.payload).then(
                function (response) {
                    console.log(response)
                    window.location.reload()
                }
            )
        }
    }
})

export default billSlice.reducer

export const { setHome, setPayed, setPersonal, addBill, removeBill, updateBill, payBill, setPayment } = billSlice.actions

export function getHome(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/bill/?type=true&home_id=' + id_home).then(
            res => {
                dispatch(setHome(res.data))
            }
        )
    }
}

export function getPersonal(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/bill/?type=false&home_id=' + id_home).then(
            res => {
                dispatch(setPersonal(res.data))
            }
        )
    }
}

export function getPayments(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/pay/?home_id=' + id_home).then(
            res => {
                dispatch(setPayment(res.data))
            }
        )
    }
}

export function getPayed(id_home) {
    return async function (dispatch) {
        await axios.get(bdurl+'/bill/?type=false&status=true&home_id=' + id_home).then(
            res => {
                dispatch(setPayed(res.data))
            }
        )
    }
}