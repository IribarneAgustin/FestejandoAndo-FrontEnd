import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './Types';

const initialState = {
  cartItems: [],
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const itemExists = state.cartItems.some((item) => item.id === newItem.id);

      if (itemExists) {
        return state; // if there is repeated it returns the current state without changes
      }

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };

    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [], // Clear the cart
      };

    default:
      return state;
  }
};

export default shoppingReducer;
