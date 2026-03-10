"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchCart, uploadCart } from "@/lib/features/cart/cartSlice";

export default function PublicLayout({ children }) {
      const dispatch = useDispatch();
      const { user } = useUser();
      const { getToken } = useAuth();
      const { cartItems } = useSelector(state => state.cart);

      useEffect(() => {
            dispatch(fetchProducts({}));
      }, []);

      useEffect(() => {
            if (user) {
                  dispatch(fetchCart({ getToken }))
            }
      }, [user]);

      useEffect(() => {
            if (user) {
                  dispatch(uploadCart({ getToken }))
            }
      }, [cartItems]);

      return (
            <div className="min-h-screen flex flex-col">
                  <Header />
                  <Navbar />
                  <main className="grow">
                        {children}
                  </main>
                  <Footer />
            </div>
      )
}
