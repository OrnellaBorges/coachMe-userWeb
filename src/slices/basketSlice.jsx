import { createSlice } from "@reduxjs/toolkit";

function calculateTotalAmount(basket) {
    let totalPrice = 0
    for (let i = 0; i < basket.length; i++){
        totalPrice += parseFloat(basket[i].price)
    }
    return totalPrice
}


let lsBasket = JSON.parse(window.localStorage.getItem("coachme-basket"))

if(lsBasket === null){
    lsBasket = []
}

let totalPrice = calculateTotalAmount(lsBasket)

const initialState = {
    basket: lsBasket,
    totalPrice: totalPrice
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        modifyBasket: (state, action) => {
            let totalPrice = calculateTotalAmount(action.payload)
            state.basket = action.payload
            state.totalPrice = totalPrice
        },
        cleanBasket: (state) => {
            state.basket = []
            state.totalPrice = 0
        }
    }
})

export const {modifyBasket, cleanBasket} = basketSlice.actions
export const selectBasket = state => state.basket
export default basketSlice.reducer