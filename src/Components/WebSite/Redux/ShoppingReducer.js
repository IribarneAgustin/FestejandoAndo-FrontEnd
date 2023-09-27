import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './Types';

const initialState = {
  cartItems: !!localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).cartItems
    : [],
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const itemExists = state.cartItems.some((item) => item.id === newItem.id);

      if (itemExists) {
        localStorage.setItem('cart', JSON.stringify(state));
        return state; // if there is repeated it returns the current state without changes
      }
      const newAddState = {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
      localStorage.setItem('cart', JSON.stringify(newAddState));
      return newAddState;

    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const newRemoveState = {
        ...state,
        cartItems: updatedCartItems,
      };
      localStorage.setItem('cart', JSON.stringify(newRemoveState));
      return newRemoveState;

    case CLEAR_CART:
      localStorage.setItem('cart', []);
      return {
        ...state,
        cartItems: [], // Clear the cart
      };

    default:
      return state;
  }
};

export default shoppingReducer;
