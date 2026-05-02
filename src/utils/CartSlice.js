import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items:[]
  },
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    // },
    addItem: (state, action) => {
      const {id, itemCount, items } = action.payload;
      
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex !== -1) {
        // If the item exists, update its count
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              itemCount: item.itemCount + itemCount // Increase count
            };
          }
          return item;
        });
        
        return { ...state, items: updatedItems };
      } else {
        // If the item does not exist, add it to the cart
        return { ...state, items: [...state.items, action.payload] };
      }
    },
    removeItem: (state, action) => {
      const {id, itemCount, items} = action.payload;
      // Find the item in cart based on id
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if(existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) => {
          if(index === existingItemIndex) {
            return {
              ...item, itemCount: item.itemCount - itemCount
            };
          }
          return item;
        });
        return {...state, items:updatedItems};
      }
    },
    clearItem: (state, action) => {
      // const {id} = action.payload;
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      return {...state, items: filteredItems};
    },
    clearCart: (state) => {
      state.items.length = 0;
    }
  }
});

export const {addItem, updateItem, removeItem, clearItem, clearCart} = CartSlice.actions;
export default CartSlice.reducer;