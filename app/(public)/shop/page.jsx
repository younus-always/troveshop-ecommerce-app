"use client";

import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";


export default function ShopPage() {
      const router = useRouter();
      const products = useSelector(state => state.product.list);

      // Get query params ?search=abc
      const searchParams = useSearchParams();
      const search = searchParams.get("search");

      const filteredProducts = search
            ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            : products;

      return (
            <div className="min-h-[70vh] mx-6">
                  <div className=" max-w-7xl mx-auto">
                        <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"> {search && <MoveLeftIcon size={20} />}  All <span className="text-slate-700 font-medium">Products</span></h1>
                        {filteredProducts.length === 0
                              ? <div className="text-xl font-medium text-center text-gray-400">No product available</div>
                              : <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                                    {filteredProducts.map(product =>
                                          <ProductCard key={product.id} product={product} />)
                                    }
                              </div>}
                  </div>
            </div >
      )
}
