import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from './Types';

export const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });

export const deleteFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });

export const clearCart = () => ({ type: CLEAR_CART });
