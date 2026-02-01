"use client";
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Counter({productId}) {
      const dispatch = useDispatch();
      const { cartItems } = useSelector(state => state.cart);

      const addToCartHandler = () => {
            dispatch(addToCart({ productId }))
      };
      const removeFromCartHandler = () => {
            dispatch(removeFromCart({ productId }))
      };

      return (
            <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
                  <button onClick={removeFromCartHandler} className="p-1 select-none">-</button>
                  <p className="p-1">{cartItems[productId]}</p>
                  <button onClick={addToCartHandler} className="p-1 select-none">+</button>
            </div>
      )
}
