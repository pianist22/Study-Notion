import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart:localStorage.getItem("cart")
    ?
    JSON.parse(localStorage.getItem("cart")):
    [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        // ADD TO CART
        addToCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=> item._id === course.id)

            if(index >= 0){
                // This means the selected course is already present in cart do not need to modify the cart
                toast.error("Course is already in cart");
                return ;
            }
            // if the course is not present in the cart then add it to the cart
            state.cart.push(course)
            // Update the total quantity and price
            state.totalItems ++;
            state.total += course.price;
            // update to local storage so it would stored for the next time
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            // show toast
            toast.success("Course added to cart");
        },
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the cart, remove it
              state.totalItems--
              state.total -= state.cart[index].price
              state.cart.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
              // show toast
              toast.success("Course removed from cart")
            }
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },        

    }
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer;