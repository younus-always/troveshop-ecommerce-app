"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";


export default function StoreAddProduct() {
      const [loading, setLoading] = useState(false);
      const [images, setImages] = useState({
            1: null,
            2: null,
            3: null,
            4: null,
      });
      const [productInfo, setProductInfo] = useState({
            name: "",
            description: "",
            mrp: 0,
            price: 0,
            category: "",
      });

      const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others'];

      const onChangeHandler = (e) => {
            setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
      };

      const onSubmitHandler = async (e) => {
            e.preventDefault()
            // Logic to add a product
      };


      return (
            <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })}
                  className="text-slate-500 mb-28"
            >
                  <h1 className="text-2xl">Add New <span className="text-slate-800 font-medium">Products</span></h1>
                  <p className="mt-7">Product Images</p>

                  <div htmlFor="" className="flex gap-3 mt-4">
                        {Object.keys(images).map((key) => (
                              <label key={key} htmlFor={`images${key}`}>
                                    <Image
                                          width={300}
                                          height={300}
                                          src={images[key]
                                                ? URL.createObjectURL(images[key])
                                                : assets.upload_area
                                          }
                                          alt=""
                                          className='h-15 w-auto border border-slate-200 rounded cursor-pointer'
                                    />
                                    <input
                                          type="file"
                                          accept='image/*'
                                          id={`images${key}`}
                                          onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
                                          hidden
                                    />
                              </label>
                        ))}
                  </div>

                  <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                        Name
                        <input
                              type="text"
                              name="name"
                              value={productInfo.name}
                              onChange={onChangeHandler}
                              placeholder="Enter product name"
                              className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded"
                              required
                        />
                  </label>

                  <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                        Description
                        <textarea
                              name="description"
                              rows={5}
                              value={productInfo.description}
                              onChange={onChangeHandler}
                              placeholder="Enter product description"
                              className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none"
                              required
                        />
                  </label>

                  <div className="flex gap-5">
                        <label htmlFor="" className="flex flex-col gap-2 ">
                              Actual Price ($)
                              <input
                                    type="number"
                                    name="mrp"
                                    rows={5}
                                    value={productInfo.mrp}
                                    onChange={onChangeHandler}
                                    placeholder="0"
                                    className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none"
                                    required
                              />
                        </label>
                        <label htmlFor="" className="flex flex-col gap-2 ">
                              Offer Price ($)
                              <input
                                    type="number"
                                    name="price"
                                    rows={5}
                                    value={productInfo.price}
                                    onChange={onChangeHandler}
                                    placeholder="0"
                                    className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none" required
                              />
                        </label>
                  </div>

                  <select
                        value={productInfo.category}
                        onChange={e => setProductInfo({ ...productInfo, category: e.target.value })}
                        className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded"
                        required
                  >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                              <option key={category} value={category}>{category}</option>
                        ))}
                  </select>
                  <br />
                  <button disabled={loading} className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition">Add Product</button>
            </form>
      )
}
