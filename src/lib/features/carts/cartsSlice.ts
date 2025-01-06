import { compareArrays } from '@/lib/utils';
import { Discount } from '@/types/common.type';
import { IProductAttribute } from '@/types/Product.type';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type RemoveCartItem = {
  id: number;
  attributes: IProductAttribute[];
};

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  sale_price: number;
  attributes: IProductAttribute[];
  discount: Discount;
  quantity: number;
  slug: string;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  totalSalesPrice: number;
  action: 'update' | 'add' | 'delete' | null;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  totalSalesPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    reset_cart: () => initialState,
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // if cart is empty then add
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.quantity;

        state.totalSalesPrice =
          state.totalSalesPrice +
          action.payload.sale_price * action.payload.quantity;

        return;
      }

      // check item in cart
      const isItemInCart = state.cart.items.find((item) => {
        return (
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
        );
      });

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items.map((eachCartItem) => {
            if (
              eachCartItem.id === action.payload.id
                ? !compareArrays(
                    eachCartItem.attributes,
                    isItemInCart.attributes
                  )
                : eachCartItem.id !== action.payload.id
            )
              return eachCartItem;

            return {
              ...isItemInCart,
              quantity: action.payload.quantity + isItemInCart.quantity,
            };
          }),
          totalQuantities: state.cart.totalQuantities + action.payload.quantity,
        };
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.quantity;

        state.totalSalesPrice =
          state.totalSalesPrice +
          action.payload.sale_price * action.payload.quantity;

        return;
      }

      state.cart = {
        ...state.cart,
        items: [...state.cart.items, action.payload],
        totalQuantities: state.cart.totalQuantities + action.payload.quantity,
      };
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;

      state.totalSalesPrice =
        state.totalSalesPrice +
        action.payload.sale_price * action.payload.quantity;
    },
    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (state.cart === null) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items
            .map((eachCartItem) => {
              if (
                eachCartItem.id === action.payload.id
                  ? !compareArrays(
                      eachCartItem.attributes,
                      isItemInCart.attributes
                    )
                  : eachCartItem.id !== action.payload.id
              )
                return eachCartItem;

              return {
                ...isItemInCart,
                quantity: eachCartItem.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
          totalQuantities: state.cart.totalQuantities - 1,
        };

        state.totalPrice = state.totalPrice - isItemInCart.price * 1;

        state.totalSalesPrice =
          state.totalSalesPrice - isItemInCart.sale_price * 1;
      }
    },
    remove: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart = {
        ...state.cart,
        items: state.cart.items.filter((pItem) => {
          return pItem.id === action.payload.id
            ? !compareArrays(pItem.attributes, isItemInCart.attributes)
            : pItem.id !== action.payload.id;
        }),
        totalQuantities: state.cart.totalQuantities - isItemInCart.quantity,
      };
      state.totalPrice =
        state.totalPrice - isItemInCart.price * isItemInCart.quantity;

      state.totalSalesPrice =
        state.totalSalesPrice - isItemInCart.sale_price * isItemInCart.quantity;
    },
  },
});

export const { addToCart, removeCartItem, remove, reset_cart } =
  cartsSlice.actions;

export default cartsSlice.reducer;
