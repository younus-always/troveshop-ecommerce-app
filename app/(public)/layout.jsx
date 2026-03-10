"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";

export default function PublicLayout({ children }) {
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchProducts({}));
      }, []);

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
